```javascript
/* =========================================
   CONFIGURAÇÕES
========================================= */

const NUMEROS_VALIDOS = [

    "07",
    "13",
    "66"

];

const WHATSAPP = "5588996444527";

const VALOR_DESCONTO = "R$ 1,00";


/* =========================================
   ELEMENTOS
========================================= */

const campoNumero =
    document.getElementById("numero");

const erro =
    document.getElementById("erro");

const resultado =
    document.getElementById("resultado");

const naoGanhou =
    document.getElementById("naoGanhou");

const canvas =
    document.getElementById("cupomCanvas");


/* =========================================
   GERA CÓDIGO DO CUPOM
========================================= */

function gerarCodigoCupom(numero){

    const aleatorio =
        Math.floor(
            1000 +
            Math.random() * 9000
        );

    return "MP-" + numero + "-" + aleatorio;

}


/* =========================================
   VERIFICAR NÚMERO
========================================= */

function verificarNumero(){

    let numero =
        campoNumero.value.trim();

    /* Remove tudo que não for número */

    numero =
        numero.replace(/\D/g, "");

    campoNumero.value = numero;


    /* LIMPA ERRO */

    erro.textContent = "";

    campoNumero.classList.remove(
        "input-erro"
    );


    /* CAMPO VAZIO */

    if(numero === ""){

        erro.textContent =
            "Digite um número.";

        campoNumero.classList.add(
            "input-erro"
        );

        return;

    }


    /* VERIFICA TAMANHO */

    if(numero.length !== 2){

        erro.textContent =
            "Digite um número com 2 algarismos.";

        campoNumero.classList.add(
            "input-erro"
        );

        return;

    }


    /* VERIFICA SE É UM DOS PREMIADOS */

    if(
        NUMEROS_VALIDOS.includes(numero)
    ){

        ganhou(numero);

    }else{

        perdeu();

    }

}


/* =========================================
   GANHOU
========================================= */

function ganhou(numero){

    const codigo =
        gerarCodigoCupom(numero);


    /* Guarda o cupom atual */

    localStorage.setItem(
        "cupomMeuPratinho",
        codigo
    );


    /* Esconde jogo */

    document.querySelector(".jogo-card")
        .style.display = "none";


    naoGanhou.style.display = "none";

    resultado.style.display = "block";


    /* Gera imagem */

    gerarImagemCupom(
        numero,
        codigo
    );


    /* Rola até o resultado */

    setTimeout(function(){

        resultado.scrollIntoView({
            behavior:"smooth",
            block:"start"
        });

    },100);

}


/* =========================================
   PERDEU
========================================= */

function perdeu(){

    document.querySelector(".jogo-card")
        .style.display = "none";

    resultado.style.display = "none";

    naoGanhou.style.display = "block";


    setTimeout(function(){

        naoGanhou.scrollIntoView({
            behavior:"smooth",
            block:"start"
        });

    },100);

}


/* =========================================
   GERAR CUPOM COMO IMAGEM
========================================= */

function gerarImagemCupom(numero, codigo){

    const ctx =
        canvas.getContext("2d");


    const largura = 1000;

    const altura = 700;


    canvas.width = largura;

    canvas.height = altura;


    /* FUNDO */

    ctx.fillStyle = "#ffffff";

    ctx.fillRect(
        0,
        0,
        largura,
        altura
    );


    /* BORDA */

    ctx.strokeStyle = "#c40000";

    ctx.lineWidth = 12;

    ctx.strokeRect(
        10,
        10,
        largura - 20,
        altura - 20
    );


    /* FAIXA SUPERIOR */

    ctx.fillStyle = "#c40000";

    ctx.fillRect(
        0,
        0,
        largura,
        130
    );


    /* TÍTULO */

    ctx.fillStyle = "#ffffff";

    ctx.font =
        "bold 65px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "MEU PRATINHO",
        largura / 2,
        85
    );


    /* PARABÉNS */

    ctx.fillStyle = "#c40000";

    ctx.font =
        "bold 75px Arial";

    ctx.fillText(
        "PARABÉNS!",
        largura / 2,
        235
    );


    /* GANHOU */

    ctx.fillStyle = "#333333";

    ctx.font =
        "bold 36px Arial";

    ctx.fillText(
        "VOCÊ GANHOU",
        largura / 2,
        290
    );


    /* VALOR */

    ctx.fillStyle = "#c40000";

    ctx.font =
        "bold 95px Arial";

    ctx.fillText(
        "R$ 1,00",
        largura / 2,
        395
    );


    /* DESCONTO */

    ctx.fillStyle = "#333333";

    ctx.font =
        "bold 34px Arial";

    ctx.fillText(
        "DE DESCONTO EM QUALQUER COMPRA",
        largura / 2,
        450
    );


    /* LINHA */

    ctx.strokeStyle = "#ffcc00";

    ctx.lineWidth = 8;

    ctx.beginPath();

    ctx.moveTo(150, 490);

    ctx.lineTo(850, 490);

    ctx.stroke();


    /* CÓDIGO */

    ctx.fillStyle = "#333333";

    ctx.font =
        "bold 30px Arial";

    ctx.fillText(
        "CUPOM: " + codigo,
        largura / 2,
        550
    );


    /* NÚMERO PREMIADO */

    ctx.font =
        "24px Arial";

    ctx.fillStyle = "#666666";

    ctx.fillText(
        "Número premiado: " + numero,
        largura / 2,
        595
    );


    /* RODAPÉ */

    ctx.fillStyle = "#c40000";

    ctx.font =
        "bold 24px Arial";

    ctx.fillText(
        "Apresente este cupom no MEU PRATINHO",
        largura / 2,
        650
    );

}


/* =========================================
   BAIXAR CUPOM
========================================= */

function baixarCupom(){

    const link =
        document.createElement("a");

    link.download =
        "cupom-meu-pratinho.png";

    link.href =
        canvas.toDataURL("image/png");

    link.click();

}


/* =========================================
   ENVIAR PELO WHATSAPP
========================================= */

async function enviarWhatsApp(){

    const codigo =
        localStorage.getItem(
            "cupomMeuPratinho"
        );


    if(!codigo){

        alert(
            "Cupom não encontrado."
        );

        return;

    }


    const mensagem =
        "🎉 PARABÉNS! 🎉\n\n" +

        "Ganhei um cupom de " +
        "R$ 1,00 de desconto no " +
        "MEU PRATINHO! 🍱❤️\n\n" +

        "🎟️ Cupom: " +
        codigo +
        "\n\n" +

        "Vou utilizar esse cupom em uma compra. 😊";


    /*
       Tenta compartilhar a imagem
       diretamente pelo celular.
    */

    try{

        canvas.toBlob(async function(blob){

            if(!blob){

                abrirWhatsApp(mensagem);

                return;

            }


            const arquivo =
                new File(
                    [blob],
                    "cupom-meu-pratinho.png",
                    {
                        type:"image/png"
                    }
                );


            /*
               Se o aparelho/navegador
               permitir compartilhamento
               de arquivos.
            */

            if(
                navigator.share &&
                navigator.canShare &&
                navigator.canShare({
                    files:[arquivo]
                })
            ){

                try{

                    await navigator.share({

                        files:[arquivo],

                        title:
                            "Cupom Meu Pratinho",

                        text:
                            mensagem

                    });

                    return;

                }catch(error){

                    /*
                       Usuário cancelou ou
                       navegador não permitiu.
                    */

                }

            }


            /*
               Alternativa:
               abre WhatsApp com mensagem.
            */

            abrirWhatsApp(mensagem);

        },"image/png");


    }catch(error){

        abrirWhatsApp(mensagem);

    }

}


/* =========================================
   ABRIR WHATSAPP
========================================= */

function abrirWhatsApp(mensagem){

    const url =
        "https://wa.me/" +
        WHATSAPP +
        "?text=" +
        encodeURIComponent(mensagem);


    window.open(
        url,
        "_blank"
    );

}


/* =========================================
   NOVO JOGO
========================================= */

function novoJogo(){

    campoNumero.value = "";

    erro.textContent = "";

    campoNumero.classList.remove(
        "input-erro"
    );


    document.querySelector(".jogo-card")
        .style.display = "block";


    resultado.style.display = "none";

    naoGanhou.style.display = "none";


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}


/* =========================================
   PERMITIR ENTER
========================================= */

campoNumero.addEventListener(
    "keydown",
    function(event){

        if(event.key === "Enter"){

            verificarNumero();

        }

    }
);


/* =========================================
   ACEITAR SOMENTE NÚMEROS
========================================= */

campoNumero.addEventListener(
    "input",
    function(){

        this.value =
            this.value
            .replace(/\D/g,"")
            .slice(0,2);

    }
);
```
