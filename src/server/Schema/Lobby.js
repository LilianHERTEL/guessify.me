
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
    });
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
    if(this.currentDrawer == null){
      this.currentDrawer = this.listPlayer[0];
      this.currentDrawerIndex = 0;
      return;
    }else{

      this.listPlayer.forEach((e,index)=>{
        e.order -= 1;
      });
      this.currentDrawer.order = this.listPlayer.length-1;
      this.currentDrawer = this.listPlayer.find(e=>e.order === 0);
    }
  }

  /*
      var length = this.listPlayer.length;

    if(!!this.currentDrawer) this.currentDrawer.order = this.listPlayer.length;
    
    this.currentDrawerIndex = (this.currentDrawer == null? 0:(this.currentDrawerIndex+1)%(length));
    this.currentDrawer = this.listPlayer[this.currentDrawerIndex];

    this.currentDrawer.order = 0;
    
    this.listPlayer.forEach((player,index) => {
      if(player.order != 0 && player.order != this.listPlayer.length) player.order -= 1;
    });
    
    
    //calculate the futur index
  
  */


  /**
   * Permet de faire quitter un joueur du lobby, on retire le joueur en l'identifiant par son socketID.
   * @param {} socketID 
   */
  leave(socketID) {
    var order = null;
    for (const [index, player] of this.listPlayer.entries()) {
      if(player.socketID == socketID)
      {
        order = player.order;
        this.listPlayer.splice(index,1);
      }
    }
    //s'il y a pas de soucis, on décrémente l'ordre de jeux de tous les joueurs après celui uqi vient de quitter le lobby
    if(order == null) return;
    this.listPlayer.forEach((player) => {
      if(player.order > order){
        player.order -= 1;
      }
    });
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



module.exports = Lobby;