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