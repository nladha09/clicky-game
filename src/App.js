import React, { Component } from 'react';
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import pics from "./cards.json";
import './App.css';

class App extends Component {
    // Setting this.state.pics to the cards json array
    state = {
      pics,
      clickedPicIds: [],
      score: 0,
      goal: 12,
      status: ""
    };
  
    //shuffle the pic cards in the browser when clicked
    shuffleScoreCard = id => {
      let clickedPicIds = this.state.clickedPicIds;

      if(clickedPicIds.includes(id)){
        this.setState({ clickedPicIds: [], score: 0, status:  "Game Over! Click to play again!" });
        return;
      }else{
        clickedPicIds.push(id)

        if(clickedPicIds.length === 12){
          this.setState({score: 12, status: "You Win! Click to play again!", clickedPicIds: []});
          console.log('You Win');
          return;
        }

        this.setState({ pics, clickedPicIds, score: clickedPicIds.length, status: " " });

        for (let i = pics.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [pics[i], pics[j]] = [pics[j], pics[i]];
        }
      }
    }
  
    render() {
      return (
        <div className="App">
          <header className="App-header">
          <h1 className="App-title">Finding Nemo Memory Game</h1>
          <p className="App-intro">
            Try not to click the same image twice!
          </p>
          </header>
          <Score total={this.state.score}
              goal={12}
              status={this.state.status}
              />
        <Wrapper>
          {this.state.pics.map(picture => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={picture.id}
              key={picture.id}
              image={picture.image}
            />
          ))}
        </Wrapper>
        <footer>
          <br></br>
          <br></br>
          <p align = "center">GitHub Repo<a href="https://github.com/nladha09/clicky-game" target="_blank" rel="noopener noreferrer"> here</a>.</p>
        </footer>
        </div>
      );
    }
  }

export default App;
