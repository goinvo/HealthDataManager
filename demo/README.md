# HealthDataManager
This is an application that intakes elements of patient information through a voice user interface. These data elements are then configured into [Standard Health Record](http://standardhealthrecord.org) format. The data is displayed visually for predicting or managing health. The end product will be a tool for both patients and clinicians to easily record their health progress without the need for transcription. The visual representation will allow for a clear understanding of the patients health and progress so that clinicians can spend more time focusing on their patient and less time swamped with data. 

## hGraph React Demo
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This is an implementation of hGraph in React. Through React, hGraph does not need to refresh after recieving new information and updates automatically. This also enables us to use more animation for rendering the graph. 

## Current Work
Currently, this version of hGraph, intakes voice queries, parses the returned JSON, and then adds/updates health datapoints. This is done using [Dialogflow](https://dialogflow.com) to parse speech utterances.

A demo of the current application can be accessed [here](https://goinvo.github.io/HealthDataManager/). 

 <img src="images/hgraph_react.png" alt="IMAGE ALT TEXT HERE" width="340" height="280" border="10" />
 
## How to Use
Download or clone the demo folder. In your terminal, run ```npm install ``` or ```yarn add``` in the hgraph directory. Then run ```npm start``` or ```yarn start```. 

IMPORTANT: code must be run on a https server to allow microphone access. Localhost also works but just dragging the HTML file into a browser does not. This due to how security access to microphones are allowed.

IMPORTANT: This application uses the Web Speech API for speech recognition. This API only runs on Chrome and Firefox. Other browsers are not supported at this time. 

## Future Goals 
- produce SHR JSON
- 1 model/algorithm to help with predicting or managing my health.
- HIPAA compliant (using TrueVault)

## Core Contributors
[GoInvo](http://www.goinvo.com/), [hello@goinvo.com](mailto:hello@goinvo.com)

Healthcare is too important to be closed. And it needs to be intuitive and accessible. Contact us with your questions and comments.

## License
Health Data Manager is [Apache 2.0](https://github.com/goinvo/HealthDataManager/blob/master/LICENSE) licensed.


