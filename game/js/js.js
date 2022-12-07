var gameStatus = 0;
var level = 0;
var points;
var theTimer;
var time;
var counterDiv;
var letreiro;
var score;
var startTime
var scoreList = new Array();

window.onload = function(){
    TableHolder = document.getElementById('game-board');
    counterDiv = document.getElementById('stempo');
    letreiro = document.getElementById('title');
    score = document.getElementById('pval');
    nivel = document.getElementById('nval');
    popup_time = document.getElementById('time-end');
    popup_alvo = document.getElementById('target-end');
    tabela_score = document.getElementById('scoreList');
    btnIniciar = document.getElementById('iniciar');
    loadScore();
    TableHolder.appendChild(loadEmptyTableWrapper())
}


//inicializa 
function generateNewTable(){    
    TableHolder.innerHTML = "";
    TableHolder.appendChild(createTable(validate));
}

//Invocado por EventListener no gameItem
//Verifica se a cor clicada foi a certa
//Aumenta o placar, reinicia o timer e inicia um novo jogo caso sim 
//Chama a função endGame caso não
function validate(value){
    clearTimeout(theTimer);
    if(value == "true" || value == "begin"){
        value == "true" ? points++ : 
        points = 0
        gameStatus = 1;
        level = Math.floor(points / 10);
        generateNewTable();
        score.innerHTML = (points.toString())
        nivel.innerHTML = (level.toString());
        time = (3000-(level*500))
        if(level > 3){
            setTimeout(function(){
                for(i = 0; i <TableHolder.children[0].childElementCount; i++){
                    TableHolder.children[0].children[i].style.backgroundColor = "gray" 
                }
                
            },1500)
            time = 2000
        }
        startTime = Date.now()
        theTimer = startTimer(time);
        countDown();
    } else {
        endGame();
    }
}

//Invocado pelo Timer e pelo Validate()
//Exibe mensagem de fim de jogo
//Armazena o Score
//Reseta as variaveis para um novo jogo
function endGame(val){
    if(val == 1){ popup_time.style.display = 'flex';}else{ popup_alvo.style.display = 'flex';}
    letreiro.innerHTML = "Clique em iniciar"
    letreiro.style.color = "#000000";
    level = 0;
    gameStatus = 0
    TableHolder.innerHTML = "";
    TableHolder.appendChild(loadEmptyTableWrapper())
    btnIniciar.disabled = true;
}

//Invocado pelo Initialize() e pelo Validate()
//Inicializa o timer e chama a função endGame caso o jogador não clique a tempo
function startTimer(time){
    return setTimeout(endGameMiddle, time)
}

function endGameMiddle(){
    endGame(1)
}

function countDown(){
    
    currentTime = time - (Date.now() - startTime);
    if(currentTime.toString().length == 4){
        counterDiv.innerHTML = "00:0"+(currentTime.toString().substring(0,1)+":"+currentTime.toString().substring(1,4));
    } else {
        counterDiv.innerHTML = "00:00:"+(currentTime.toString());
    }

    if(time >= 0 && gameStatus == 1){
        setTimeout(countDown, 10);
    } else {
        counterDiv.innerHTML = "00:03:000";
    }
}