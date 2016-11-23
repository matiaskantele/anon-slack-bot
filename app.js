const { RtmClient, CLIENT_EVENTS, RTM_EVENTS } = require('@slack/client')
const token = process.env.SLACK_API_TOKEN || '';
const channel = process.env.SLACK_CHANNEL || '';

var rtm = new RtmClient(token, { autoReconnect: true });

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
});

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  if ( message.channel.charAt(0) !== 'D' || message.subtype === 'bot_message' ) {
    return;
  }
  rtm.sendMessage("Someone said: " + message.text, channel);
});

rtm.start();
