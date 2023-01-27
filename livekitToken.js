const livekitApi = require('livekit-server-sdk');
const AccessToken = livekitApi.AccessToken;


async function betaToken(roomName, participantName) {
    console.log(roomName, participantName);
    const at = new AccessToken('APIivisjvnBSpea', 'NwF9luIhxy6NuEiBGpGC4RlReu30v1KFPnLKuayIOOa', {
        identity: participantName.toString(),
    });
    at.addGrant({ roomJoin: true, room: roomName });

    const token = at.toJwt();
    return token
}
module.exports = { betaToken };
