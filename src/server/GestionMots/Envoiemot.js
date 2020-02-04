const fs = require('fs');
var dictionnaire = [];

fs.readFile(__dirname+'/../Dictionnaires/en-US.txt','utf8',function(err,data){
    if(err) throw err;
    dictionnaire = data.toString().split("\n");
    console.log(dictionnaire.length)
});


function tirerMots(){
    random=Math.floor(Math.random() * Math.floor(dictionnaire.length))
    return dictionnaire[random];
}

function underscoreWordToBeDrawn(word) {
    let underscored_word = "";
    for (let i = 0; i < word.length; i++) {
      underscored_word += "_ ";
    }
    return underscored_word;
}

module.exports.tirerMots = tirerMots;
module.exports.underscoreWordToBeDrawn = underscoreWordToBeDrawn;