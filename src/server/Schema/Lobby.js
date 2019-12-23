
var uniqid = require('uniqid')

class Lobby {
  constructor() {
    this.id = uniqid();
    this.maxPlayer = 10;
    this.inGame = false;
    this.listPlayer = new Map();
  }

  join(socketID, username) {
    this.listPlayer.set(socketID,{
      username,
      pointsTotal: 0
    })
  }

    leave(socketID) {
      this.listPlayer.delete(socketID);
    }
    addPoint(socketID,point){
      var original = this.listPlayer.get(socketID).pointsTotal
      this.listPlayer.get(socketID).pointsTotal = original + points
    }
  }



module.exports = Lobby