'use strict';

/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
 * The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
 * testing instructions are located at http://amzn.to/1LzFrj6
 *
 * For additional samples, visit the Alexa Skills Kit Getting Started guide at
 * http://amzn.to/1LGWsLG
 */


// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: 'PlainText',
            text: output,
        },
        card: {
            type: 'Simple',
            title: `SessionSpeechlet - ${title}`,
            content: `SessionSpeechlet - ${output}`,
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
                text: repromptText,
            },
        },
        shouldEndSession,
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: '1.0',
        sessionAttributes,
        response: speechletResponse,
    };
}


// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    const sessionAttributes = {};
    const cardTitle = 'Welcome';
    const speechOutput = 'Welcome to hGraph! ' +
        'I transcribe health information. Start by telling me the data you would like to be transcribed';
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    const repromptText = 'Please tell me information you would like to be transcribed' +
        ' or say no to exit';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function handleSessionEndRequest(callback) {
    const cardTitle = 'Session Ended';
    const speechOutput = 'Thank you. I will be sure to email the patient their information';
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = true;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}

function handleHelp(callback) {
    const cardTitle = 'Help';
    const speechOutput = "Simply tell me the aspects of your health you would like me to track for you. For example, you can say I weigh a hundred fifty pounds. Currently, I track your weight, your hours of exercise, and your happiness.";
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = false;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}

function createSessionAttributes(dataType, value) {
    return {
        dataType,
        value,
    };
}

/**
 * Sets the color in the session and prepares the speech to reply to the user.
 */
function getHealthData(intent, session, callback) {
    const cardTitle = intent.name;
    const dataType = intent.slots.healthdata;
    const value = intent.slots.numberslot;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = '';

    if (dataType) {
        const favoriteColor = dataType.value;
        sessionAttributes = createSessionAttributes(dataType, value);
        speechOutput = `${dataType.resolutions.resolutionsPerAuthority[0].values[0].value.name} is ${value.value} ${dataType.value}.` +
            " Anything else?";
        repromptText = "Ok, anything else?";
    } else {
        speechOutput = "I didnt catch that. Could you say that again?";
        repromptText = "I didnt catch that. Could you say that again?";
    }

    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function handleUserUtterance(callback) {
    const cardTitle = 'Utterance';
    const speechOutput = "Hello World.";
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = false;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}
function getUserUtterance(intent, session, callback) {
    const cardTitle = intent.name;
    const Utterance = intent.slots.utterance;
    const value = intent.slots.utterance.value;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = '';

    if (Utterance) {
        const favoriteColor = Utterance.value;
        sessionAttributes = createSessionAttributes(Utterance, value);
        speechOutput = `You said ${value}.` +
            " Anything else?";
        repromptText = "Ok, anything else?";
    } else {
        speechOutput = "I didnt catch that. Could you say that again?";
        repromptText = "I didnt catch that. Could you say that again?";
    }

    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

// --------------- Events -----------------------

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);

    const intent = intentRequest.intent;
    const intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    if (intentName === 'getHealthData'|| intentName ==='AMAZON.YesIntent') {
        getHealthData(intent, session, callback);
    } else if (intentName === 'AMAZON.HelpIntent') {
        handleHelp(callback);
    } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.NoIntent' || intentName ==='AMAZON.CancelIntent') {
        handleSessionEndRequest(callback);
    } else if (intentName === 'getUtterance') {
        getUserUtterance(intent, session, callback);
    } else {
        throw new Error('Invalid intent');
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log(`onSessionEnded requestId=${sessionEndedRequest.requestId}, sessionId=${session.sessionId}`);
    // Add cleanup logic here
}


// --------------- Main handler -----------------------

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = (event, context, callback) => {
    try {
        console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        /*
        if (event.session.application.applicationId !== 'amzn1.echo-sdk-ams.app.[unique-value-here]') {
             callback('Invalid Application ID');
        }
        */

        if (event.session.new) {
            onSessionStarted({ requestId: event.request.requestId }, event.session);
        }

        if (event.request.type === 'LaunchRequest') {
            onLaunch(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'IntentRequest') {
            onIntent(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'SessionEndedRequest') {
            onSessionEnded(event.request, event.session);
            callback();
        }
    } catch (err) {
        callback(err);
    }
};
