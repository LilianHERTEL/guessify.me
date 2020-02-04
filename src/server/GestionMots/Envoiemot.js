const fs = require('fs');
var dictionnaire = new Map();
fs.readdir(__dirname + '/../Dictionnaires/', function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
        fs.readFile(__dirname + '/../Dictionnaires/' + file, 'utf8', function (err, data) {
            if (err) throw err;
            const lang = file.replace(".txt", "");
            const dictLang = data.toString().split("\n").map((value)=>value.trim());
            dictionnaire.set(lang, dictLang)
            console.log(`${lang} loaded with ${dictLang.length} words!`)
        });
    });
});



const tirerMots = (lang) => {
    const dictLang = dictionnaire.get(lang)
    var random = Math.floor(Math.random() * dictLang.length)
    return dictLang[random];
}

const underscoreWordToBeDrawn = (word) => {
    let underscored_word = "";
    for (let i = 0; i < word.length; i++) {
        underscored_word += "_ ";
    }
    return underscored_word;
}

module.exports = {
    tirerMots,
    underscoreWordToBeDrawn
};