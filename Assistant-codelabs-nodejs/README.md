# hGraph Action on the Google Assistant

## Setup Instructions
There are a lot of steps and it's easy to make errors. I built the app referencing the Google codelab which can be found [here](https://codelabs.developers.google.com/codelabs/actions-2/index.html?index=..%2F..%2Findex#0).
I recommend going through the codelab to get a sense of the Actions development environment. 

### Steps

1. Use the [Actions on Google Console](https://console.actions.google.com) to add a new project with a name of your choosing and click *Create Project*.
1. Click *Skip*, located on the top right to skip over category selection menu.
1. On the left navigation menu under *BUILD*, click on *Actions*. Click on *Add Your First Action* and choose your app's language(s).
1. Select *Custom intent*, click *BUILD*. This will open a Dialogflow console. Click *CREATE*.
1. Click on the gear icon to see the project settings.
1. Select *Export and Import*.
1. Select *Restore from zip*. Follow the directions to restore from the `codelab-level-<one/two>.zip` file in this repo.
1. Deploy the fulfillment webhook provided in the `functions` folder using [Google Cloud Functions for Firebase](https://firebase.google.com/docs/functions/):
    1. Follow the instructions to [set up and initialize Firebase SDK for Cloud Functions](https://firebase.google.com/docs/functions/get-started#set_up_and_initialize_functions_sdk). Make sure to select the project that you have previously generated in the Actions on Google Console and to reply `N` when asked to overwrite existing files by the Firebase CLI.
    1. Run `firebase deploy --only functions` and take note of the endpoint where the fulfillment webhook has been published. It should look like `Function URL : https://${REGION}-${PROJECT}.cloudfunctions.net/dialogflowFirebaseFulfillment`.  If the Function URL doesn't show, you can always check at the [Firebase console](https://console.firebase.google.com/).
1. Go back to the Dialogflow console and select *Fulfillment* from the left navigation menu. Enable *Webhook*, set the value of *URL* to the `Function URL` from the previous step, then click *Save*.
1. Select *Integrations* from the left navigation menu and open the *Integration Settings* menu for Actions on Google.
1. Enable *Auto-preview changes* and Click *Test*. This will open the Actions on Google simulator.
1. Type `Talk to my test app` in the simulator, or say `OK Google, talk to my test app` to any Actions on Google enabled device signed into your developer account.

For more detailed information on deployment, see the [documentation](https://developers.google.com/actions/dialogflow/deploy-fulfillment).

## Next Steps
Currently, the app doesn't do anything with the inserted health data. I would like the data to be passed to hGraph via JSON so that an automatic hGraph can be produced with the user's data. 
The basicCard that makes up the Actions images must have a static image from a URL. Ideally, I'd like the image to be an actual screen shot of the resulting hGraph for the user to see. 
There should also be patient profiles so that the user can see a history of their health and see multiple hGraphs from past uses.

## License
See [LICENSE](LICENSE).

## Terms
Your use of this sample is subject to, and by using or downloading the sample files you agree to comply with, the [Google APIs Terms of Service](https://developers.google.com/terms/).
