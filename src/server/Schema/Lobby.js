
var uniqid = require('uniqid')

class Lobby {
  constructor() {
    this.id = uniqid();
    this.maxPlayer = 10;
    this.inGame = false;
    this.listPlayer = [];
    this.started = false;
    this.currentDrawerIndex = null;
    this.currentDrawer = null;
  }

  join(socketID, username) {
    this.listPlayer.push({
      socketID,
      username,
      pointsTotal: 0
    })
  }

  resetGame() {
    this.started = false;
    this.currentDrawer = null;
    this.currentDrawerIndex = null;
  }

  getNextDrawer(){
    var previousOne = false;
    if(this.currentDrawer == null)
    {
      this.currentDrawerIndex = 0;
    }
    else
    {
      this.currentDrawerIndex = (this.currentDrawerIndex+1)%(this.listPlayer.length);
    }
    
    this.currentDrawer = this.listPlayer[this.currentDrawerIndex];
  }

    leave(socketID) {
      for (const [index, player] of this.listPlayer.entries()) {
        if(player.socketID == socketID)
        {
          this.listPlayer.splice(index,1);
          break;
        }
      }
      
    }
    addPoint(socketID,point){
      var original = this.listPlayer.get(socketID).pointsTotal
      this.listPlayer.get(socketID).pointsTotal = original + points
    }
  }



module.exports = Lobby