# 1. The Big Questions
* What is the landscape of open source voice engines/agents?
* Who are the big players in the field?
  * Google, Siri, Amazon (not even Siri at this point)
* What are the variables between their products (shown in a table matrix)?
* Do audio demo in presentation with an example app.
* We want to construct an “optimized voice encounter”
* Our goal is to prototype voice encounters and optimize for sound and then build it into an app to collect health data. 

# 2. Industry and Problems
Most widely used voice assistants (as of May 2017):
* Apple Siri - 34%
* Google Assistant - 19%
* Amazon Alexa - 6%
* Microsoft Cortana - 4%

Stats on Alexa and Google:
https://www.voicebot.ai/google-home-google-assistant-stats/

**Open source voice assistants:**

Mycroft 
* Incredibly small user base (15 people on Github)
* Problem: since voice assistants function based of ML and AI algorithms, it is important to have a large dataset for good functionality
* Less data = less capabilities
* Python 

“It’s always been sort of appalling to me that you now have a supercomputer in your pocket, yet you have to learn how to use it. It seems actually like a failure on the part of out industry that software is hard to use.” - Alan Packer, head of language technology at Facebook
* It is difficult to design an intuitive voice interface
* Ie: Amazon Echo come with an example phrase list to help users use the device
* It is difficult to know the full limitations/capabilities of the device

Voice has been under scrutiny for security and how tech giants utilize your data. Thus,
Voice and health must put a lot of focus onto privacy.
Voice should focus more on doing and showing than saying 
“Ok, now showing patient data…”
Alexa and Google must be in a constant listening state to hear for their keyword
Audio is then transcribed for company data and used for advertising etc.
Keyword must be said for each statement by the user, this can become annoying over time

# 3. Development references 

Possible development tools:
* Amazon Alexa SDK
* Google Assistant SDK 
* Mycroft

# 4. Healthcare and Voice

Specifically healthcare and voice:
Complaints of voice: 
http://www.mobihealthnews.com/content/developers-talk-promise-pitfalls-voice-assistants-healthcare
* Using voice for diagnosis can lead to long surveys. 
* Voice has difficulty with complicated terms such as drug names or the names of certain conditions.

https://www.delltechnologies.com/en-us/perspectives/how-voice-activated-assistants-are-redefining-traditional-health-care/

An assistant, for example, might ask, “Did you take your morning medicine?” and record it for the patient once they confirm. If entry for the previous day is missing, it might ask, “Did you take your medicine yesterday?”—record their reply—and encourage the patient to adhere to their medication schedule.
* Voice good for clinical trials and surveys
* Voice provides comfort to patients
* Voice increases patient engagement. Often they feel as if they are talking to a person

https://www.healthtap.com/what_we_make/story

Healthtap uses voice to ask patient questions to provide advice and diagnosis. The voice functionality is only available in an Alexa skill as Healthtap gave up on a voice-based mobile app in 2013. The Alexa skill asks a series of questions and results in a diagnosis for the user. This is not really personalized as the Amazon Echo is only ever connected to a person’s Amazon account, thus this would not be collected for medical data by the Healthtap app. They do not have any voice functionality in their current IOS app.

A lot of hospitals and companies have a similar app.
WebMD has a Alexa skill for users to ask about symptoms, treatments, side effects, and drugs.
50% of its reviews are 1 star. Most complaints were about the voice recognition and inability to understand drug names.

#  5. VUI Design

Voice is an efficient input modality: it allows users to give commands to the system quickly, on their own terms. Hands-free control lets users multitask, and effective natural language processing bypasses the need for complex navigation menus, at least for familiar tasks and known commands.

A screen is an efficient output modality: it allows systems to display a large amount of information at the same time and thus reduce the burden on users’ memory. Visual scanning is faster than the sequential information access enforced by voice output. It can also efficiently convey system status and bridge the Gulf of Execution by providing visual signifiers to suggest possible commands.

**Missing Functionality**

Too often, the voice agent can initiate only the first step of a task, and any subsequent steps require the user to shift to a touch interaction style. For example, Siri will execute a web-search query or open the Apple News application in response to a voice command, but the user must then tap the screen to select a search result or access a news story. Google Assistant also requires screen input to move beyond the first step of many searches.
* We want voice to produce the action throughout
* We do not want to make voice just replace something that can be easily typed into a search engine
* There are certain situations where a user may want to use voice and situations where they would not (ie: revealing private info)

**Integrating Voice and Screen Output From the Ground Up**

Some interesting examples of the innovation driven by the voice-first approach are already evident in Echo Show’s interface:
* **Sequential numbering of search results**, which was a convention common in the early days of web search, but long since abandoned as unnecessary in a visual list. On a voice-first device, the numbers serve the important function of providing unique and efficient verbal ‘handles’ which let users efficiently select items.
* **Randomly displayed suggested commands**, such as Try “Alexa, play Al Green” or Try “Alexa, what’s your favorite word?” This technique is similar to methods used by both Siri (Things you can ask me) and Google Assistant (Explore), but differs in that these tips are displayed not just in a dedicated educational area, but instead at the bottom of the home screen,  various search-results screens, and the music-player screen. (This ambient education mechanism can definitely entice new users to spontaneously engage with the device. But the random contents means the tips are often uninteresting, and annoying to experienced users because they cannot be turned off.)
* **Immersive displays of rich, interactive content**, which are normal on traditional web and mobile GUIs but not on previous screen-first voice interfaces. For example, recipe results on Echo Show include detailed screens showing ingredients, directions, and a demonstration video — all accessible via voice commands.

# 6. Designing for Accessibility

https://uxdesign.cc/tips-for-accessibility-in-conversational-interfaces-8e11c58b31f6

**Deaf or Hard of Hearing**

People who are deaf or hard of hearing are impacted the greatest by shifting to a mode of communication that relies on voice and they will likely need multimodal interfaces.
* **Allow volume control**. A user must be able to turn the volume of a device both up and down. Users who are hard of hearing may need to turn devices up to hear and those with hearing assistive technology may need to turn it down.
* **Provide alternatives to speech-only interactions (multimodal)**. Users who are deaf may not converse using speech directly. To include these users, provide a multimodal experience.
* **Consider conventions of transmitting to hearing devices**. Users who are hard of hearing may wear devices that can connect via Bluetooth, FM or other means. Connecting to their assistive technology may create desired experiences for everyone.

**Cognitive Disabilities**

Many cognitive disabilities affect areas of the brain that process voice interactions. This broad range of disabilities must be understood to create a great experience for everyone.
* **Create a linear, time-efficient architecture**. When architecting conversations, make it easy for the user to understand the navigation and not get lost or trapped. Architecture is perhaps more important in an invisible interface than in one that is graphical.
* **Provide context**. Build the lexicon for your conversation with the context in mind. Many terms can be ambiguous and confuse users, especially those with cognitive disabilities. Then, make sure to add context to conversation to make possible responses clear for the user.
* **Normalize language**. DO use literal language, short and simple sentences, and full-length words. DON’T use ambiguous language, sarcasm, technical terms, abbreviations and acronyms.
* **Put important information first or last**. Put the most often used choices at the beginning and allow a user to quickly answer, or put them at the end so the user doesn’t have to remember all the choices. Avoid long menu options and don’t combine multiple ideas into one question.
* **Note:** Conversational interfaces have been extremely helpful for people with dyslexia, allowing the users to interact without written text.

**Physical Disabilities**

Some physical disabilities may make it difficult for users to speak clearly.
* **Understand shaky and broken speech**. This may be out of your control, but realize that many users with physical disabilities have shaky and broken speech — especially those whose primary language is different than the system.
* **Provide alternatives to speech-only interactions**. Similar to users who are deaf, a user who is unable to speak needs an alternative way to interact.
* **Design appropriate pauses in listening**. Allow a user to pause and gather thoughts when speaking. Don’t be hasty to reply and tell the user that the system does not understand.

**Blind and Low Vision**

* **Create a time-efficient interaction**. Just as we try to limit the number of clicks a user must take to complete an action, limit the amount of voice interaction needed.
* **Keep messages short and allow interruptions**. Don’t force a user to listen to long messages or lists of choices without a way to continue forward.
* **Let users control the speech rate**. “Many blind users of screen readers can listen to text as exceedingly fast speeds.” (Pearl, 2016) Designers should recognize this super power and design accordingly.
Make it discoverable. Consider how the ability to speak with a device is conveyed. If it is expected that a user speaks to a device, make sure that user knows it exists and can open a dialog.

