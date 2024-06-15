//REFERÊNCIA DOS ELEMENTOS USADOS - HTML (MODIFICADO) E BOTÕES (CONTROLADORES)
const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const descansoCurtoBtn = document.querySelector('.app__card-button--curto');
const descansoLongoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const buttons = document.querySelectorAll('.app__card-button');
const startPauseBtn = document.querySelector('#start-pause');
const tempoNaTela = document.querySelector('#timer');

let tempoDecorridoSegundos = 1500; //se não iniciá-la aqui, dá erro no 1° temporizador
let intervalo = null;

//BOTÃO CHECK DE LIGAR E DESLIGAR A MÚSICA
const musicCheckbox = document.querySelector('#alternar-musica');
//REFÊNCIA DA MÚSICA
const music = new Audio('./sons/WayMakerInstrumentalPiano.mp3');
//MÚSICA TOCA SEM PARAR - entra em loop
music.loop = true;

//REFERÊNCIA DOS SONS
const beep = new Audio('./sons/beep.mp3');
//const pause = new Audio('./sons/pause.mp3');
//const play = new Audio('./sons/play.wav');

//CONTROLE DA MUÍCA - SE PAUSADA, AO CLICAR NO BOTÃO DESPAUSA E VICE-VERSA
//change É O EVENTO DE CLIQUE QUANDO SE TRABALHA COM  
musicCheckbox.addEventListener('change', () => {
    if(music.paused){
        music.play();
    }
    else{
        music.pause();
    }
});

//AJUSTAR PARA O MODO FOCO COM BASE NO CLICK DO BOTÃO
focoBtn.addEventListener('click', () => {
    tempoDecorridoSegundos = 1500;
    //ALTERAR O VALOR DO HTML (aplicando o estilos de [data-contexto="foco"] do CSS) ATRAVÉS DO ATRIBUTO setAttribute(), QUE RECEBE DOIS VALORES, O PRIMEIRO É O ELEMENTO QUE SE QUER ALTERAR E O SEGUNDO É O VALOR A SER APLICADO
    //html.setAttribute('data-contexto', 'foco'); - 1° VERSÃO
    //banner.setAttribute('src', './imagens/foco.png'); - 1° VERSÃO

    //AQUI A FUNÇÃO alterarContexto SERÁ CHAMADA E RECEBRÁ UM PARÂMETRO, QUE SERÁ O VALOR DO ATRIBUTO data-contexto="" DO HTML E NOME DA IMAGEM (ajustada com template string), QUE SÃO IGUAIS PARA PERMITIR ESSE COMPORTAMENTO
    alterarContexto('foco');
    //ADICIONAR A CLASE .active DANDO FOCO AO BOTÃO QUANDO FOR CLICADO
    focoBtn.classList.add('active');
});

//AJUSTAR PARA O MODO INTERVALO CURTO COM BASE NO CLICK DO BOTÃO
descansoCurtoBtn.addEventListener('click', () => {
    tempoDecorridoSegundos = 300;
    alterarContexto('descanso-longo');
    //ADICIONAR A CLASE .active DANDO FOCO AO BOTÃO QUANDO FOR CLICADO
    descansoCurtoBtn.classList.add('active');
});

//AJUSTAR PARA O MODO DE INTERVALO LONGO COM BASE NO CLICK DO BOTÃO
descansoLongoBtn.addEventListener('click', () => {
    tempoDecorridoSegundos = 600;
    alterarContexto('descanso-curto');
    //ADICIONAR A CLASE .active DANDO FOCO AO BOTÃO QUANDO FOR CLICADO
    descansoLongoBtn.classList.add('active');
});

//FUNÇÃO QUE REALIZA A TROCA DE COR DE FUNDO E IMAGEM DE ACORDO COM O CONTEXTO - SERÁ CHAMADA EM CADA EVENTO DE CLICK
function alterarContexto(contexto){
    //EXIBIR TEMPORIZADOR DE ACORDO COM O CONTEXTO
    mostrarTempo();

    //REMOÇÃO DA CLASSE ACTIVE DOS BUTTONS
    buttons.forEach(function(contexto){
        contexto.classList.remove('active');
    });

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);

    //ALTERAÇÃO DE TEXTOS
    switch(contexto){
        case "foco":
            title.innerHTML = `
            Otimize sua produtividade,
            <br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case "descanso-curto":
            title.innerHTML = `
            Que tal dar uma respirada?
            <br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case "descanso-longo":
            title.innerHTML = `
            Hora de voltar à superfície.
            <br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break;
        default:
            break;
    }
}


//FUNÇÕES DO TEMPORIZADOR
//REALIZA O DECREMENTO DO TEMPO (CONTAGEM REGRESSIVA) E QUANDO CHEGA A ZERO A VARIÁVEL DE CONTROLE É ZERADA PELA FUNÇÃO zerar() USANDO O clearInterval TOCA UMA MUÚSICA
const contagemRegressiva = () => {
    if(tempoDecorridoSegundos <= 0){
        beep.play();
        alert('Tempo finalizado!');
        zerar();
        return;
    }
    tempoDecorridoSegundos -= 1;
    
    //CHAMADA DA FUNÇÃO QUE EXIBE O TEMPO, QUE DEVE SER EXIBIDA ENQUANTO A CONTAGEM REGRESSIVA OCORRE
    mostrarTempo();
}

//INICIA E PAUSA A CONTAGEM
function iniciarPausar(){
    //EVENTOS DE PLAY
    if(intervalo){
        //pause.play();
        zerar();
        
        startPauseBtn.innerHTML = 
        `
            <img class="app__card-primary-butto-icon" src="./imagens/play.png" alt="">
            <span>Começar</span>
        `;

        return;
    }

    //EVENTOS DE PAUSE
    intervalo = setInterval(contagemRegressiva, 1000);
    //play.play();

    startPauseBtn.innerHTML = 
    `
        <img class="app__card-primary-butto-icon" src="./imagens/pause.png" alt="">
        <span>Pausar</span>
    `;
}

// Interrompe a contagem do setInterval e limpa o valor da varivável de controle
function zerar(){
    clearInterval(intervalo);
    intervalo = null;
}

//INÍCIO E PAUSE COM CLIQUE DO BOTÃO
startPauseBtn.addEventListener('click', iniciarPausar);

//CONTAGEM DOS TEMPORIZADORES
//EXIBE TEMPO NA TELA
function mostrarTempo(){
    const tempo = new Date(tempoDecorridoSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

//FUNÇÃO CHAMADA NO ESCOPO GLOBAL PARA O TEMPO APARECER  TODO INSTANTE NA TELA
mostrarTempo();
