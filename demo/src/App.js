import React, { Component } from 'react';
import VoiceRecognition from './VoiceRecognition';
import './App.css';
import Hgraph, { hGraphConvert, calculateHealthScore } from 'hgraph-react';

const accessToken ="745b2a6d68e24e1a93a92cf26643b07b";
const baseUrl = "https://api.dialogflow.com/v1/";


class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      start: false,
      stop: false,
      utterances: [],
      patientData: []

    }
  }

  addPatientDataElement = (element) => {
    const newData = this.state.patientData.map(d => d);
    const convertedElement = hGraphConvert("male", element.metric, element);
    newData.push(convertedElement);
    this.setState({patientData: newData});
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
  		body: JSON.stringify({ query: utterance, lang: "en", sessionId: "somerandomstring" }),
    })
    .then((response) => response.json())
    .then((responseJson) => this.dialogflowToHgraph(responseJson))
    .catch((error) => console.error(error));
  }

  dialogflowToHgraph = (responseJson) => {

    const parameters = responseJson.result.parameters;

    const keys = Object.keys(parameters);
    const values = Object.values(parameters);
    let newArray = [];

    for (var i = 0; i < keys.length; i++) {
      if (values[i] !== "") {
        newArray.push({
          metric: keys[i].toString(),
          value: parseInt(values[i])
        });
      };
    }
    newArray = newArray.map(metric => {
      const convertedObj = hGraphConvert("female", metric.metric, metric);
      convertedObj.id = metric.metric;
      return convertedObj;
    });
    var finalArray = this.state.patientData.concat(newArray);
    const copiedArrayFromState = this.state.patientData.map(d => d);
    // for each item in the response
    newArray.map(item => {
      // check if the item exists already in the existing state array
      var found = copiedArrayFromState.findIndex(d => d.id === item.id);
      console.log(found);
      if (found !== -1) {
        // if it does, just override the value
        copiedArrayFromState[found].value = item.value;
        console.log(copiedArrayFromState);
        this.setState({patientData: copiedArrayFromState});
      } else {
        // if not, add it as before
        this.setState({patientData: finalArray});
      }
    });
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
         <Hgraph data={this.state.patientData}/>
      </div>
    )
  }
}
export default App;
