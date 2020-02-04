const fs = require('fs');
var dictionnaire = [];

fs.readFile(__dirname + '/../Dictionnaires/fr-FR.txt', 'utf8', function (err, data) {
    if (err) throw err;
    dictionnaire = data.toString().split("\r\n");
});

function tirerMots() {
    random = Math.floor(Math.random() * Math.floor(dictionnaire.length))
    return dictionnaire[random];
}

function underscoreWordToBeDrawn(word) {
    if ((typeof word) !== 'string') return "";
    let underscored_word = "";
    let currLetter = "";
    for (let i = 0; i < word.length; i++) {
        currLetter = word.charAt(i);
        currLetter === "-" || currLetter === " " ? underscored_word += currLetter + "\xa0" : underscored_word += "_\xa0"; // \xa0 stands for a no-break space
    }
    return underscored_word;
}

module.exports.tirerMots = tirerMots;
module.exports.underscoreWordToBeDrawn = underscoreWordToBeDrawn;