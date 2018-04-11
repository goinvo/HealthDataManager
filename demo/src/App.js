import React, { Component } from 'react';
import VoiceRecognition from './VoiceRecognition';
import './App.css';
import Hgraph, { hGraphConvert, calculateHealthScore } from 'hgraph-react';
import SkyLight from 'react-skylight';
import Button from 'muicss/lib/react/button';
const accessToken ="745b2a6d68e24e1a93a92cf26643b07b";
const baseUrl = "https://api.dialogflow.com/v1/";

class App extends Component {

  constructor (props) {
    super(props);


    this.state = {
      start: false,
      stop: false,
      utterances: [],
      patientData: [],
      botSpeech: true,
      isToggleOn: true,
      isToggleOnStart: true,
      botVoice: "",
      chartWidth: this.getChartWidth()


    }
    this.handleClick = this.handleClick.bind(this);
    this.handleClickStart = this.handleClickStart.bind(this);
  }



  componentDidMount = () => {
    window.addEventListener("resize", this.setChartWidth);
  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.setChartWidth);
  }

  getChartWidth = () => {
    const sizeBasedOnWindow = window.innerWidth*.75;
    return sizeBasedOnWindow < 600 ? sizeBasedOnWindow : 600;
  }

  setChartWidth = () => {
    this.setState({chartWidth: this.getChartWidth()});
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  handleClickStart() {
    this.setState(prevStateStart => ({
      isToggleOnStart: !prevStateStart.isToggleOnStart
    }));
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
    this.setState({
      start: false,
      stop: true,
      utterances: newUtterances

    });
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
    const input = responseJson.result.resolvedQuery;
    const map = new Map();

    map.set("alcoholUse","How many alcoholic beverages have you had this week?");
    map.set("nicotineUse","How many cigarettes have you had this week?");
    map.set("exercise","How many hours do you exercise per week?");
    map.set("weight", "How much do you weigh?");
    map.set("sleep","How many hours of sleep do you get per night?");
    map.set("waistCircumference", "What's the circumference of your waist?");
    map.set("happiness", "Rate your happiness on a scale of 1 to 10");
    map.set("glucose", "What's your glucose?");
    map.set("ldl", "What is your LDL?");
    map.set("hdl", "What is your HDL?");
    map.set("bloodPressureDialstolic", "What's your diastolic blood pressure?");
    map.set("bloodPressureSystolic", "What's your systolic blood pressure?");
    map.set("painLevel", "Rate your pain on a scale of 1 to 10");

    const keys = Object.keys(parameters);
    const values = Object.values(parameters);
    var newArray = [];
    var speech = "";
    var msg;
    for (var i = 0; i < keys.length; i++) {
      console.log(keys[i]);
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
    // DOES ACCOUNT FOR REPEATS BUT IT GETS ERRORS FOR UNDERSTANDING VALUES - DIALOGFLOW SIDE - TRAIN IT MORE??
    // NEED TO ADD CASE FOR WHEN ITS GIVEN INFO IT DOESNT KNOW - IF IT DOESNT KNOW IT CURRENTLY REPEATS
   var result = finalArray.map(a => a.id);
    var shouldGetNew = true;

    if (finalArray.length < keys.length) {
      for(var j = 0; j < keys.length; j++) {
        if ( shouldGetNew && !result.includes(keys[j]) && this.state.isToggleOn ===true) {
          shouldGetNew = false;
          this.setState({
            start: true,
            stop: false
          }, () => {
            speech = map.get(keys[j]);
            msg = new SpeechSynthesisUtterance(speech);
            console.log(speech);
            console.log(this.isToggleOn);
            window.speechSynthesis.speak(msg);
          });
        } else {
          this.state.botSpeech = false;
        }
      }
    }

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
    var myBigGreenDialog = {
          backgroundColor: '#00897B',
          color: '#ffffff',
          width: '70%',
          height: '600px',
          marginTop: '-300px',
          marginLeft: '-35%',
        };
    if (this.state.botSpeech === true) {
      this.state.botSpeech = undefined;
      this.state.botVoice = new SpeechSynthesisUtterance("Welcome to hGraph! I am an application to visualize your personal health data. I'll be asking you a few questions about your health. First, how much do you weigh?");
      console.log(this.state.botVoice);
    } else if (this.state.botSpeech === false){
      this.state.botVoice = new SpeechSynthesisUtterance("That's it for now. I'll talk to you again soon.");
    } else {
      this.state.botVoice = new SpeechSynthesisUtterance("");
    }
    window.speechSynthesis.speak(this.state.botVoice);
    const pointRadius = this.state.chartWidth > 300 ? 10 : 5;
    const fontSize = this.state.chartWidth > 300 ? 16 : 10;

    return (

      <div>

      <button onClick={() => this.setState({ start: true })}>start</button>
      <button onClick={() => this.setState({ stop: true })}>stop</button>
      <button  onClick={this.handleClickStart} name="speakButton"> {this.state.isToggleOnStart ? 'Start' : 'Stop'} </button>
        <section>
          <button onClick={() => this.customDialog.show()}>Help</button>
        </section>
        <SkyLight dialogStyles={myBigGreenDialog} hideOnOverlayClicked ref={ref => this.customDialog = ref} title="What is this app?">
           hGraph is voice interactive app used to record patient health data. It currently takes 13
           health data points:

               <ul>Your waist circumference</ul>
               <ul>the number of alcoholic drinks consumed per week</ul>
               <ul>the average number of hours of sleep you get</ul>
               <ul>your weight</ul>
               <ul>the number of cigarettes you smoke</ul>
               <ul>your happiness on a scale of 1-10</ul>
               <ul>your glucose levels</ul>
               <ul>your LDL</ul>
               <ul>your HDL</ul>
               <ul>your diastolic blood pressure</ul>
               <ul>you systolic blood pressure</ul>
               <ul>your pain on a scale of 1-10</ul>
               <ul>the average number of hours you exercise per week </ul>

        </SkyLight>

      <p></p>
        Current Mode: <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'Patient' : 'Clinician'}
        </button>
        {this.state.start && (
           <VoiceRecognition
             onEnd={this.onEnd}v
             onResult={this.onResult}
             continuous={true}
             lang="en-US"
             stop={this.state.stop}
           />
         )}

         <Hgraph
           data={this.state.patientData}
           width={this.state.chartWidth}
           height={this.state.chartWidth}
           pointRadius={pointRadius}
           fontSize = {fontSize}
         />

       <p>{this.state.botVoice.text}</p>
      </div>
    )
  }
}
export default App;
