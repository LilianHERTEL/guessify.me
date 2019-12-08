var fs = require('fs');
var dictionnaire;
var tabmot;

fs.readFile('../Dictionnaires/ENdic.txt',function(err,data){
    if(err) throw err;
    var dictionnaire = data.toString().split("\n");
    for (i in tab){
        console.log(dictionnaire[i]);
    }
});

var tabmot=[];

for (let i=0; i<3;i++){
    let random;
    random=Math.floor(Math.random() * Math.floor(dictionnaire.length));
    tabmot.push(dictionnaire[random]);
}
console.log(tabmot);



