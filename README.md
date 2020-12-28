This application allows you to listen to the events of the camera and take a photo through the camera's API and send it via telegram to a user.

** IMPORTANT - docker**
Si utilizas raspbian y deseas usar docker debes agregar en Dockerfile al comienzo "#!/bin/bash" para que corra el docker en raspberry pi

# How to run app

complete env variables(.env)

<pre>
TOKEN = 'your_token_here'
MY_CHANNEL_NAME = '@channel-here'
NAME_OF_BOT = 'name_telegram_bot'
AMCREST_USER = 'user_here'
AMCREST_PASS = 'pass_here'
AMCREST_API = 'http://IP:PORT/cgi-bin/snapshot.cgi?[channel=<channelNo>]'
AMCREST_API_EVENTS = 'http://IP:PORT/cgi-bin/eventManager.cgi?action=attach&codes=[AlarmLocal%2CVideoMotion%2CVideoLoss%2CVideoBlind]'
</pre>

node src/app.js

# ACTIVATE MOTION DETECTED FROM API

API AMCREST NOT SUPPORT ACTIVATE EVENTS FROM API :( IF YOU KNOW HOW TO DO THAT TELL ME HOW TO DO FROM API AND WE ADD IT.
I AM USING ANDROID AMCREST APP TO ACTIVATE MOTION EVENTS.
ISSUE -> https://github.com/tchellomello/python-amcrest/issues/129#

# TODO

CHECK AND RECONNECT TO API-EVENTS IF DISCONNECT FOR ANY REASON
