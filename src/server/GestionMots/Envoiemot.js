function tirerMots(dictionnaire){
    var dictionnaire = global.dictionnaire;
    var tabmot=[];
    var indexs=[];
    for (let i=0; i<3;i++){
        let random;
        random=Math.floor(Math.random() * Math.floor(dictionnaire.length));
        while(indexs.indexOf(random)!=-1){
            random=Math.floor(Math.random() * Math.floor(dictionnaire.length));
        }
        indexs.push(random);
        tabmot.push(dictionnaire[random]);
    }
    return tabmot;
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