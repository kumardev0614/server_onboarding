const livekitApi = require('livekit-server-sdk');
const AccessToken = livekitApi.AccessToken;


async function betaToken(roomName, participantName) {
    const at = new AccessToken('APIVDYiAJUFZHPF', 'bV6h9UQHzpGbb8hqCHOseKYS9WaUCbNyeNGwefncxsNA', {
        identity: participantName.toString(),
    });
    at.addGrant({ roomJoin: true, room: roomName });

    const token = at.toJwt();
    return token
}
module.exports = { betaToken };
