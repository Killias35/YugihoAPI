export default class ResponseManager {
    constructor() {
        this.sessions = {};          // { token: playerId }
        this.response = {};          // { playerId: response }
    }

    // -- SESSION MANAGEMENT --
    addSession(playerId, token) {
        this.sessions[token] = playerId;
    }

    removeSession(token) {
        const oldLenght = Object.keys(this.sessions).length;
        delete this.sessions[token];
        return oldLenght !== Object.keys(this.sessions).length;
    }
    
    getPlayerIdFromToken(token) {
        return this.sessions[token] || null;
    }
    
    isLoggedIn(token) {
        return token in this.sessions;
    }

    isPlayerConnected(playerId) {
        return Object.values(this.sessions).includes(playerId);
    }
    

    // -- RESPONSE MANAGEMENT --

    addResponse(playerId, response) {
        if (this.isWaitingResponse(playerId)) {
            this.response[playerId] = response;
            this.cancelWait(playerId);
        }
    }

    hasResponse(playerId) {
        return playerId in this.response;
    }

    getResponse(playerId) {
        return this.response[playerId];
    }

    removeResponse(playerId) {
        delete this.response[playerId];
    }
}
