/* =========================================
   CONFIGURAÇÕES
========================================= */

const NUMEROS_PREMIADOS = ["07", "13", "66"];

const NUMERO_WHATSAPP = "5588996444527";


/* =========================================
   VERIFICAR NÚMERO
========================================= */

function verificarNumero() {

    const campo = document.getElementById("numero");

    const erro = document.getElementById("erro");

    const jogo = document.getElementById("jogoCard");

    const resultado = document.getElementById("resultado");

    const naoGanhou = document.getElementById("naoGanhou");


    /* Pega o número digitado */

    let numero = campo.value.trim();


    /* Aceita somente números */

    numero = numero.replace(/\D/g, "");


    /* Atualiza o campo */

    campo.value = numero;


    /* Limpa erro */

    erro.textContent = "";

    campo.classList.remove("input-erro");


    /* =========================================
       CAMPO VAZIO
    ========================================= */

    if (numero === "") {

        erro.textContent =
            "Digite um número.";

        campo.classList.add("input-erro");

        campo.focus();

        return;
    }


    /* =========================================
       APENAS 1 ALGARISMO
    ========================================= */

    if (numero.length === 1) {

        numero = "0" + numero;

        campo.value = numero;

    }


    /* =========================================
       TAMANHO INCORRETO
    ========================================= */

    if (numero.length !== 2) {

        erro.textContent =
            "Digite um número com 2 algarismos.";

        campo.classList.add("input-erro");

        campo.focus();

        return;
    }


    /* =========================================
       NÚMERO PREMIADO
    ========================================= */

    if (
        NUMEROS_PREMIADOS.includes(numero)
    ) {

        mostrarPremio(numero);

        return;
    }


    /* =========================================
       NÚMERO NÃO PREMIADO
    ========================================= */

    jogo.style.display = "none";

    resultado.style.display = "none";

    naoGanhou.style.display = "block";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================
   MOSTRAR PRÊMIO
========================================= */

function mostrarPremio(numero) {

    const jogo =
        document.getElementById("jogoCard");

    const resultado =
        document.getElementById("resultado");

    const naoGanhou =
        document.getElementById("naoGanhou");


    /* Gera código do cupom */

    const codigo =
        gerarCodigoCupom(numero);


    /* Guarda o código */

    localStorage.setItem(
        "cupomMeuPratinho",
        codigo
    );


    /* Guarda também o número */

    localStorage.setItem(
        "numeroPremiadoMeuPratinho",
        numero
    );


    /* Esconde jogo */

    jogo.style.display = "none";

    naoGanhou.style.display = "none";


    /* Mostra resultado */

    resultado.style.display = "block";


    /* Gera imagem */

    gerarImagemCupom(
        numero,
        codigo
    );


    /* Vai até o cupom */

    setTimeout(function () {

        resultado.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }, 150);

}


/* =========================================
   GERAR CÓDIGO DO CUPOM
========================================= */

function gerarCodigoCupom(numero) {

    const aleatorio =
        Math.floor(
            1000 +
            Math.random() * 9000
        );


    return (
        "MP-" +
        numero +
        "-" +
        aleatorio
    );

}


/* =========================================
   GERAR IMAGEM DO CUPOM
========================================= */

function gerarImagemCupom(
    numero,
    codigo
) {

    const canvas =
        document.getElementById(
            "cupomCanvas"
        );


    if (!canvas) {

        console.error(
            "Erro: cupomCanvas não encontrado."
        );

        return;
    }


    const ctx =
        canvas.getContext("2d");


    const largura = 1000;

    const altura = 700;


    canvas.width = largura;

    canvas.height = altura;


    /* =========================================
       FUNDO
    ========================================= */

    ctx.fillStyle = "#ffffff";

    ctx.fillRect(
        0,
        0,
        largura,
        altura
    );


    /* =========================================
       BORDA
    ========================================= */

    ctx.strokeStyle = "#c40000";

    ctx.lineWidth = 12;

    ctx.strokeRect(
        10,
        10,
        largura - 20,
        altura - 20
    );


    /* =========================================
       FAIXA SUPERIOR
    ========================================= */

    ctx.fillStyle = "#c40000";

    ctx.fillRect(
        0,
        0,
        largura,
        135
    );


    /* =========================================
       NOME
    ========================================= */

    ctx.fillStyle = "#ffffff";

    ctx.font =
        "bold 65px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "MEU PRATINHO",
        largura / 2,
        88
    );


    /* =========================================
       PARABÉNS
    ========================================= */

    ctx.fillStyle = "#c40000";

    ctx.font =
        "bold 75px Arial";

    ctx.fillText(
        "PARABÉNS!",
        largura / 2,
        235
    );


    /* =========================================
       VOCÊ GANHOU
    ========================================= */

    ctx.fillStyle = "#333333";

    ctx.font =
        "bold 36px Arial";

    ctx.fillText(
        "VOCÊ GANHOU",
        largura / 2,
        290
    );


    /* =========================================
       VALOR
    ========================================= */

    ctx.fillStyle = "#c40000";

    ctx.font =
        "bold 95px Arial";

    ctx.fillText(
        "R$ 1,00",
        largura / 2,
        395
    );


    /* =========================================
       DESCONTO
    ========================================= */

    ctx.fillStyle = "#333333";

    ctx.font =
        "bold 34px Arial";

    ctx.fillText(
        "DE DESCONTO EM QUALQUER COMPRA",
        largura / 2,
        450
    );


    /* =========================================
       LINHA AMARELA
    ========================================= */

    ctx.strokeStyle = "#ffcc00";

    ctx.lineWidth = 8;

    ctx.beginPath();

    ctx.moveTo(150, 490);

    ctx.lineTo(850, 490);

    ctx.stroke();


    /* =========================================
       CÓDIGO DO CUPOM
    ========================================= */

    ctx.fillStyle = "#333333";

    ctx.font =
        "bold 30px Arial";

    ctx.fillText(
        "CUPOM: " + codigo,
        largura / 2,
        550
    );


    /* =========================================
       NÚMERO PREMIADO
    ========================================= */

    ctx.fillStyle = "#666666";

    ctx.font =
        "24px Arial";

    ctx.fillText(
        "Número premiado: " + numero,
        largura / 2,
        595
    );


    /* =========================================
       RODAPÉ
    ========================================= */

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

function baixarCupom() {

    const canvas =
        document.getElementById(
            "cupomCanvas"
        );


    if (!canvas) {

        alert(
            "Não foi possível encontrar o cupom."
        );

        return;
    }


    const link =
        document.createElement("a");


    link.download =
        "cupom-meu-pratinho.png";


    link.href =
        canvas.toDataURL(
            "image/png"
        );


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

}


/* =========================================
   ENVIAR PARA WHATSAPP
========================================= */

async function enviarWhatsApp() {

    const codigo =
        localStorage.getItem(
            "cupomMeuPratinho"
        );


    const numero =
        localStorage.getItem(
            "numeroPremiadoMeuPratinho"
        );


    if (!codigo) {

        alert(
            "Cupom não encontrado."
        );

        return;
    }


    const mensagem =
        "🎉 PARABÉNS! 🎉\n\n" +

        "Ganhei R$ 1,00 de desconto " +
        "no MEU PRATINHO! 🍱❤️\n\n" +

        "🎟️ Cupom: " +
        codigo +
        "\n\n" +

        "🔢 Número premiado: " +
        numero +
        "\n\n" +

        "Gostaria de utilizar meu cupom " +
        "em uma compra. 😊";


    const canvas =
        document.getElementById(
            "cupomCanvas"
        );


    /* =========================================
       TENTA COMPARTILHAR A IMAGEM
    ========================================= */

    if (
        navigator.share &&
        navigator.canShare &&
        canvas
    ) {

        try {

            const blob =
                await canvasToBlob(canvas);


            const arquivo =
                new File(
                    [
                        blob
                    ],
                    "cupom-meu-pratinho.png",
                    {
                        type:
                            "image/png"
                    }
                );


            const dados = {

                files: [
                    arquivo
                ],

                title:
                    "Cupom Meu Pratinho",

                text:
                    mensagem

            };


            if (
                navigator.canShare(dados)
            ) {

                await navigator.share(
                    dados
                );

                return;
            }

        }

        catch (erro) {

            console.log(
                "Compartilhamento de imagem não disponível.",
                erro
            );

        }

    }


    /* =========================================
       ALTERNATIVA: WHATSAPP
    ========================================= */

    abrirWhatsApp(
        mensagem
    );

}


/* =========================================
   CANVAS PARA BLOB
========================================= */

function canvasToBlob(canvas) {

    return new Promise(
        function(resolve, reject) {

            canvas.toBlob(
                function(blob) {

                    if (blob) {

                        resolve(blob);

                    } else {

                        reject(
                            new Error(
                                "Não foi possível gerar a imagem."
                            )
                        );

                    }

                },
                "image/png"
            );

        }
    );

}


/* =========================================
   ABRIR WHATSAPP
========================================= */

function abrirWhatsApp(
    mensagem
) {

    const url =
        "https://wa.me/" +
        NUMERO_WHATSAPP +
        "?text=" +
        encodeURIComponent(
            mensagem
        );


    window.open(
        url,
        "_blank"
    );

}


/* =========================================
   NOVO JOGO
========================================= */

function novoJogo() {

    const campo =
        document.getElementById(
            "numero"
        );

    const erro =
        document.getElementById(
            "erro"
        );

    const jogo =
        document.getElementById(
            "jogoCard"
        );

    const resultado =
        document.getElementById(
            "resultado"
        );

    const naoGanhou =
        document.getElementById(
            "naoGanhou"
        );


    /* Limpa campo */

    campo.value = "";


    /* Limpa erro */

    erro.textContent = "";


    campo.classList.remove(
        "input-erro"
    );


    /* Mostra jogo */

    jogo.style.display = "block";


    /* Esconde resultados */

    resultado.style.display = "none";

    naoGanhou.style.display = "none";


    /* Coloca cursor no campo */

    campo.focus();


    /* Volta ao topo */

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================
   QUANDO A PÁGINA CARREGAR
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        console.log(
            "Meu Pratinho - Sistema de Cupons carregado!"
        );


        const campo =
            document.getElementById(
                "numero"
            );


        /* =====================================
           TESTE DE SEGURANÇA
        ===================================== */

        if (!campo) {

            console.error(
                "ERRO: campo #numero não encontrado."
            );

            return;

        }


        /* =====================================
           DIGITAÇÃO
        ===================================== */

        campo.addEventListener(
            "input",
            function () {

                this.value =
                    this.value
                    .replace(/\D/g, "")
                    .slice(0, 2);

            }
        );


        /* =====================================
           ENTER
        ===================================== */

        campo.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    verificarNumero();

                }

            }
        );

    }
);
