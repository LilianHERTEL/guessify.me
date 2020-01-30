
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
      pointsTotal: 0,
      order : this.listPlayer.length
    })
  }

  /**
   * Permet de réinitialiser un lobby
   */
  resetGame() {
    this.started = false;
    this.currentDrawer = null;
    this.currentDrawerIndex = null;
  }

  /**
   * Permet de passer au dessinateur suivant.
   */
  getNextDrawer(){
    this.currentDrawerIndex = (this.currentDrawer == null? 0:(this.currentDrawerIndex+1)%(this.listPlayer.length));
    if(!!this.currentDrawer) this.currentDrawer.order = this.listPlayer.length;
    this.listPlayer.forEach(player => {
      if(player != this.currentDrawer){
        player.order -= 1;
      }
    });
    this.currentDrawer = this.listPlayer[this.currentDrawerIndex];

  }

  /**
   * Permet de faire quitter un joueur du lobby, on retire le joueur en l'identifiant par son socketID.
   * @param {} socketID 
   */
  leave(socketID) {
    for (const [index, player] of this.listPlayer.entries()) {
      if(player.socketID == socketID)
      {
        this.listPlayer.splice(index,1);
        break;
      }
    }
    
  }

  /**
   * Permet d'ajouter des points au joueur possèdant le socketID, fonction appelé exclusivement par le serveur, sous réserve de victoire.
   * @param {} socketID 
   * @param {int} point : le nombre de points à ajouter
   */
  addPoint(socketID,point){
    for (const player of this.listPlayer) {
      if(player.socketID == socketID)
      {
        player.pointsTotal++;
      }
    }
  }
  }



module.exports = Lobby