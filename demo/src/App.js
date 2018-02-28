import React, { Component } from 'react';
import VoiceRecognition from './VoiceRecognition';
import './App.css';

const accessToken ="745b2a6d68e24e1a93a92cf26643b07b";
const baseUrl = "https://api.dialogflow.com/v1/";

class App extends Component {
/*  render() {
    return (
      <div className="App">
        <header className="App-header">

          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;*/
  constructor (props) {
    super(props);
    this.state = {
      start: false,
      stop: false,
      utterances: []

    }
  }

  onEnd = () => {
    this.setState({
      start: false,
      stop: false
    })
  }

  onResult = ({ finalTranscript }) => {
    this.getEntities(finalTranscript);
    const newUtterances = this.state.utterances.map(utterance => utterance);
    newUtterances.push(finalTranscript);
    this.setState({utterances: newUtterances});
  }

  getEntities = (utterance) => {
    fetch(baseUrl + "query?v=20150910", {
  		method: "POST",
  		headers: {
  				"Authorization": "Bearer " + accessToken,
          'Content-Type': "application/json; charset=utf-8",
          'Accept': "application/json"
  		},
  		body: JSON.stringify({ query: utterance, lang: "en", sessionId: "somerandomthing" }),
    })
    .then((response) => response.json())
    .then((responseJson) => console.log(responseJson))
    .catch((error) => console.error(error));
  }

  render () {
    return (
      <div>
        <button onClick={() => this.setState({ start: true })}>start</button>
        <button onClick={() => this.setState({ stop: true })}>stop</button>
        {this.state.start && (
           <VoiceRecognition
             onEnd={this.onEnd}
             onResult={this.onResult}
             continuous={true}
             lang="en-US"
             stop={this.state.stop}
           />
         )}
         <ul>
           {this.state.utterances.map(utterance => {
             return (<li>{utterance}</li>)
           })}
         </ul>
      </div>
    )
  }
}

export default App;
