const fs = require('fs');
var dictionnaire = [];

fs.readFile(__dirname+'/../Dictionnaires/fr-FR.txt','utf8',function(err,data){
    if(err) throw err;
    dictionnaire = data.toString().split("\r\n");
});

function tirerMots(){
    random=Math.floor(Math.random() * Math.floor(dictionnaire.length))
    return dictionnaire[random];
}
module.exports.tirerMots = tirerMots;