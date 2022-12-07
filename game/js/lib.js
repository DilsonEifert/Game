function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function createTable(callBackFunction){
    var lista = ["#FF0000","#00FF00","#0000FF","#FFFF00","#FF00FF","#00FFFF","#CCCCCC","#000000","#FFFFFF"];
    var lista2 = ["Branco","Preto","Azul","Vermelho","Verde","Cinza","Rosa","Lilas","Amarelo"];
    var certo = null;
    var gameitems=new Array();
    var gameitem;
    var gameTable = document.createElement("div")
    var j = null
    gameTable.classList.add("table-wrapper")
    j = getRndInteger(0, 9)
    do{
        gameitem = null;
        i = getRndInteger(0, lista.length)
        gameitem = document.createElement("div")
        gameitem.classList.add("game_item_style")
        gameitem.classList.remove("flicker")
        gameitem.style.backgroundColor=lista[i]
        gameitem.setAttribute("id", lista[i])
        if(certo == null) {certo = true; gameitem.setAttribute("resposta","true")} else {gameitem.setAttribute("resposta","false")}
        gameitems.push(gameitem)
        lista.splice(i, 1);
    } while (lista.length > 0)
    do{
        i = getRndInteger(0, gameitems.length)
        gameitems[i].addEventListener('click', function(event){
            callBackFunction(event.currentTarget.getAttribute("resposta"))
        })
        if((gameitems[i]).getAttribute('resposta') == "true"){
            letreiro.innerHTML = "Seu alvo é <span>"+lista2[j]+"</span>"
            letreiro.children[0].style.color = (gameitems[i]).getAttribute('id')
        }
        gameTable.appendChild(gameitems[i])
        gameitems.splice(i, 1);
    } while (gameitems.length > 0)
    return gameTable
}

function loadEmptyTableWrapper(){
    var gameTable = document.createElement("div")
    gameTable.classList.add("table-wrapper")
    gameTable.classList.add("flicker")
    for(i = 0; i<9; i++){
        gameitem = document.createElement("div")
        gameitem.classList.add("game_item_style")
        gameTable.appendChild(gameitem);
    }
    return gameTable;
}

function loadScore(){ 
    tabela_score.innerHTML = '';
    temp = JSON.parse(window.localStorage.getItem('scoreItem'));
    if(temp != null) {scoreList = temp
        for(i = 0; i < scoreList.length; i++){
            newItem = null
            newItem = document.createElement("p")
            newItem.appendChild(document.createTextNode(scoreList[i].nome+": "+scoreList[i].score+" Pts"))
            tabela_score.appendChild(newItem)
        }
    }
}

function saveScoreToStorage(obj){
    window.localStorage.setItem('scoreItem', JSON.stringify(obj));
}

function addToScoreObj(obj, nome, score){
    obj.push({nome: nome, score: score});
    return obj;
}

function saveScore(nome){
    btnIniciar.disabled = false;
    addToScoreObj(scoreList, nome, points);
    saveScoreToStorage(scoreList)   
    loadScore()
}