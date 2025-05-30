export default class ResponseManager {
    constructor(database) {
        this.sessions = {};          // { token: playerId }
        this.response = {};          // { playerId: response }
        this.database = database;
    }

    // -- SESSION MANAGEMENT --
    addSession(playerId, token) {
        this.sessions[token] = playerId;

        this.database.userState.addUserState(playerId, "principal");
    }

    removeSession(token) {
        this.database.userState.removeUserState(this.getPlayerIdFromToken(token));
        
        const oldLenght = Object.keys(this.sessions).length;
        delete this.sessions[token];

        return oldLenght !== Object.keys(this.sessions).length;
    }
    
    getPlayerIdFromToken(token) {
        return this.sessions[token] || null;
    }
    
    getTokenFromPlayerId(playerId) {
        return Object.keys(this.sessions).find((token) => this.sessions[token] === playerId) || null;
    }

    isLoggedIn(token) {
        return token in this.sessions;
    }

    isPlayerConnected(playerId) {
        return Object.values(this.sessions).includes(playerId);
    }
    

    // -- RESPONSE MANAGEMENT --

    addResponse(playerId, response) {
        this.response[playerId] = response;
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
