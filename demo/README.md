## hGraph React Demo
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This is an implementation of hGraph in React. Through React, hGraph does not need to refresh after recieving new information and updates automatically. This also enables us to use more animation for rendering the graph. 

## Current Work
Currently, this version of hGraph, intakes voice queries, parses the returned JSON, and then adds/updates health datapoints. This is done using [Dialogflow](https://dialogflow.com) to parse speech utterances.

A demo of the current application can be accessed [here] TBD. 

## How to Use
Download or clone the demo folder. In your terminal, run ```npm install ``` or ```yarn add``` in the hgraph directory. Then run ```npm start``` or ```yarn start```. 

IMPORTANT: code must be run on a https server to allow microphone access. Localhost also works but just dragging the HTML file into a browser does not. This due to how security access to microphones are allowed.

## Future Goals 
- produce SHR JSON
- 1 model/algorithm to help with predicting or managing my health.
- HIPAA compliant (using TrueVault)

## Core Contributors
[GoInvo](http://www.goinvo.com/), [hello@goinvo.com](mailto:hello@goinvo.com)

Healthcare is too important to be closed. And it needs to be intuitive and accessible. Contact us with your questions and comments.

## License
Health Data Manager is [Apache 2.0](https://github.com/goinvo/HealthDataManager/blob/master/LICENSE) licensed.


