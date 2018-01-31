# HealthDataManager
This is an application that intakes ~50 elements of patient information through a voice user interface. These data elements are then configured into [Standard Health Record](http://standardhealthrecord.org) format. The data is displayed visually for predicting or managing health. 

## Current Work
Currently, the project intakes 11 elements of patient information through voice and print three of those elements in SHR format. Voice data is transcribed and parsed using [DialogFlow](https://dialogflow.com) which returns a JSON. The JSON is then parsed for elements of interest and for the application's speech functions. 
Demo of Current Prototype")

[![IMAGE ALT TEXT](https://img.youtube.com/vi/KuPtWFArkU0/0.jpg)](https://www.youtube.com/watch?v=KuPtWFArkU0 "Video Title")

[![Everything Is AWESOME](https://imgur.com/tw0gNiH)](https://youtu.be/KuPtWFArkU0 "Everything Is AWESOME")


## Future Goals 
- currently the SHR format is hardcoded, would like to find a way to more easily generate SHR JSON
- 1 model/algorithm to help with predicting or managing my health.
- HIPAA compliant (using TrueVault)

## Core Contributors
Founders/Designers: [GoInvo](http://www.goinvo.com/), [hello@goinvo.com](mailto:hello@goinvo.com)

We believe that healthcare should be intuitive and accessible. Contact us with your questions and comments.

## License
Health Data Manager is [Apache 2.0](https://github.com/goinvo/HealthDataManager/blob/master/LICENSE) licensed.
