import React, { Component } from 'react';
import VoiceRecognition from './VoiceRecognition';
import './App.css';
import Hgraph, { hGraphConvert, calculateHealthScore } from 'hgraph-react';
import SkyLight from 'react-skylight';
import MetaTags from 'react-meta-tags';
import '../node_modules/font-awesome/css/font-awesome.min.css';
const accessToken ="745b2a6d68e24e1a93a92cf26643b07b";
const baseUrl = "https://api.dialogflow.com/v1/";

const Header = ({title}) => (<header>{title}</header>);
const Footer = ({title}) => (<footer>{title}</footer>);
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
      botVoice: null,
      chartWidth: this.getChartWidth(),
      botText: "",

    }
    this.handleClick = this.handleClick.bind(this);
    this.handleClickStart = this.handleClickStart.bind(this);

    console.log("WHAT THE FUCK");
  }



  componentDidMount = () => {
    window.addEventListener("resize", this.setChartWidth);

    if (this.state.botSpeech) {
      const botVoice = new SpeechSynthesisUtterance("Welcome to hGraph! I am an application to visualize your personal health data. I'll be asking you a few questions about your health. First, how much do you weigh?");
      this.setState({
        botSpeech: false,
        botVoice,
        botText: botVoice.text
      }, () => {
        window.speechSynthesis.speak(this.state.botVoice);
      });
    } else {
      this.setState({
        botVoice: null,
        botText: ""
      });
    }
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
    console.log("Clicked on speak button");
    this.setState(prevStateStart => ({
      isToggleOnStart: !prevStateStart.isToggleOnStart
    }));
    if(this.state.isToggleOnStart === true){
      this.setState({ start: true });
      this.setState({bgColor: "#cc4d4d"});
    } else {
      this.setState({ stop: true });
      this.setState({bgColor: "#97be8c"})
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
            // this.state.botVoice = new SpeechSynthesisUtterance(speech);
            const botVoice = new SpeechSynthesisUtterance(speech);
            this.setState({
              botVoice,
              botText: botVoice.text
            }, () => {
              window.speechSynthesis.speak(this.state.botVoice);
            });
          });
        } else {
          this.setState({
            botSpeech: false
          });
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
    const {header,footer} = this.props;

    var myBigGreenDialog = {
          backgroundColor: '#eeeeee',
          color: 'black',
          width: '70%',
          height: '600px',
          marginTop: '-300px',
          marginLeft: '-35%',
        };

    /* else if (this.state.botSpeech === false){
      this.state.botVoice = new SpeechSynthesisUtterance("That's it for now. I'll talk to you again soon.");
    } */

    const pointRadius = this.state.chartWidth > 300 ? 10 : 5;
    const fontSize = this.state.chartWidth > 300 ? 16 : 10;
    const margin =  {top: 40, right: this.state.chartWidth*0.2, bottom: this.state.chartWidth*0.5,left: this.state.chartWidth*0.2};
    return (

      <div>
          <MetaTags>
            <title>hGraph React</title>

            <meta id="font" property="og:font" content='http://fonts.googleapis.com/css?family=Vollkorn' />
          </MetaTags>
        <Header title={header} />
      <button className="fa fa-microphone" id="speakButton" onClick={this.handleClickStart} style={{backgroundColor:this.state.bgColor}}> {this.state.isToggleOnStart ? 'Start' : 'Stop'} </button>
        <section>
          <button id="help" onClick={() => this.customDialog.show()}>Help</button>
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
               <p></p>

        </SkyLight>

      <p></p>
  
        <button id="mode" onClick={this.handleClick}>
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
         <p className="solid">{this.state.botText}</p>
         <Hgraph
           data={this.state.patientData}
           width={this.state.chartWidth}
           height={this.state.chartWidth}
           pointRadius={pointRadius}
           fontSize = {fontSize}
           margin={margin}
         />


       <Footer title={footer}/>
      </div>
    )
  }
}
export default App;
