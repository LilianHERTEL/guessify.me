var fs = require('fs');
var dictionnaire;
var tabmot;

fs.readFile('src/server/Dictionnaires/ENdic.txt',function(err,data){
    if(err) throw err;
    var dictionnaire = data.toString().split("\n");
    for (i in tab){
        console.log(dictionnaire[i]);
    }
});

function tirerMots(dictionnaire){
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
console.log(tabmot);
