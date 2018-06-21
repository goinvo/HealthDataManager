// Copyright 2018, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {
  dialogflow,
  BasicCard,
  Permission,
} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});


app.intent('healthDataPoints', (conv, input) => {
// do data manipulation here

conv.ask(`<speak> Thank you. ` +

  `Would you like to see your results?</speak>`);
});


// Handle the Dialogflow intent named 'actions_intent_PERMISSION'. If user
// agreed to PERMISSION prompt, then boolean value 'permissionGranted' is true.
app.intent('actions_intent_PERMISSION', (conv, params, permissionGranted) => {
  if (!permissionGranted) {
    conv.ask(`Ok, no worries. I'm going to ask you a few questions about your health. First, how much do you weigh?`);
  } else {
    conv.data.userName = conv.user.name.display;
    conv.ask(`Thanks, ${conv.data.userName}. I'm going to ask you a few questions about your health. First, how much do you weigh?`);
  }
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

app.intent('Default Welcome Intent', (conv) => {
  conv.ask(new Permission({
    context: 'Hi there, to get to know you better',
    permissions: 'NAME'
  }));
});
// Define a mapping of basic card objects.

const colorMap = {
'this week': new BasicCard({
  title: "hGraph - this week",
  image: {
    url: 'https://s8.postimg.cc/43xyzj62t/hgraph-ring.jpg',
    accessibilityText: 'hGraph plot',
  },
  text: "hGraph is a visual representation of a patient's health status, designed to increase awareness of the individual's factors that can affect one's overall health.",
  display: 'WHITE',
  buttons: [
         {
           title:"Click for details",
           openUrlAction:{
             url:"http://hgraph.org/"
           }
         }
       ]


}),
'last week': new BasicCard({
  title: "hGraph - last week",
  image: {
    url: 'https://s8.postimg.cc/43xyzj62t/hgraph-ring.jpg',
    accessibilityText: 'hGraph plot',
  },
  text: "hGraph is a visual representation of a patient's health status, designed to increase awareness of the individual's factors that can affect one's overall health.",
  display: 'WHITE',
  buttons: [
         {
           title:"Click for details",
           openUrlAction:{
             url:"http://hgraph.org/"
           }
         }
       ]
}),
'last month': new BasicCard({
  title: "hGraph - last month",
  image: {
    url: "https://s8.postimg.cc/43xyzj62t/hgraph-ring.jpg",
    accessibilityText: 'hGraph plot',
  },
  text: "hGraph is a visual representation of a patient's health status, designed to increase awareness of the individual's factors that can affect one's overall health.",
  display: 'WHITE',
  buttons: [
         {
           title:"Click for details",
           openUrlAction:{
             url:"http://hgraph.org/"
           }
         }
       ]
}),
};



app.intent('favorite fake color', (conv, {fakeColor}) => {
  if (!conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
  conv.ask('Sorry, try this on a screen device or select the ' +
    'phone surface in the simulator.');
  return;
  }
  conv.close(`Here's your results plotted on hGraph`, colorMap[fakeColor]);
});
