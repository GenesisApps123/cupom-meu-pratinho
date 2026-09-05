```javascript
/* =========================================
   CONFIGURAÇÕES
========================================= */

const NUMEROS_VALIDOS = ["07", "13", "66"];

const WHATSAPP = "5588996444527";


/* =========================================
   VERIFICAR NÚMERO
========================================= */

function verificarNumero() {

    const campo = document.getElementById("numero");
    const erro = document.getElementById("erro");

    const resultado = document.getElementById("resultado");
    const naoGanhou = document.getElementById("naoGanhou");

    const jogo = document.querySelector(".jogo-card");

    let numero = campo.value.trim();

    /* Remove caracteres que não sejam números */
    numero = numero.replace(/\D/g, "");

    campo.value = numero;

    /* Limpa mensagens anteriores */
    erro.textContent = "";
    campo.classList.remove("input-erro");

    /* Campo vazio */
    if (numero === "") {

        erro.textContent = "Digite um número.";

        campo.classList.add("input-erro");

        return;
    }

    /* Corrige números com apenas 1 algarismo */
    if (numero.length === 1) {

        numero = "0" + numero;

        campo.value = numero;
    }

    /* Verifica tamanho */
    if (numero.length !== 2) {

        erro.textContent =
            "Digite um número com 2 algarismos.";

        campo.classList.add("input-erro");

        return;
    }


    /* =========================================
       NÚMERO PREMIADO
    ========================================= */

    if (NUMEROS_VALIDOS.includes(numero)) {

        gerarPremio(numero);

    }

    /* =========================================
       NÚMERO NÃO PREMIADO
    ========================================= */

    else {

        jogo.style.display = "none";

        resultado.style.display = "none";

        naoGanhou.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

}


/* =========================================
   GERAR PRÊMIO
========================================= */

function gerarPremio(numero) {

    const jogo = document.querySelector(".jogo-card");

    const resultado = document.getElementById("resultado");

    const naoGanhou = document.getElementById("naoGanhou");

    /* Código único */

    const aleatorio =
        Math.floor(1000 + Math.random() * 9000);

    const codigo =
        "MP-" + numero + "-" + aleatorio;


    /* Salva o cupom */

    localStorage.setItem(
        "cupomMeuPratinho",
        codigo
    );


    /* Esconde tela inicial */

    jogo.style.display = "none";

    naoGanhou.style.display = "none";

    /* Mostra prêmio */

    resultado.style.display = "block";


    /* Gera imagem */

    gerarImagemCupom(numero, codigo);


    /* Vai para o resultado */

    setTimeout(function () {

        resultado.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);

}


/* =========================================
   GERAR IMAGEM DO CUPOM
========================================= */

function gerarImagemCupom(numero, codigo) {

    const canvas =
        document.getElementById("cupomCanvas");

    if (!canvas) {

        console.error(
            "Canvas do cupom não encontrado."
        );

        return;
    }


    const ctx =
        canvas.getContext("2d");


    const largura = 1000;

    const altura = 700;


    canvas.width = largura;

    canvas.height = altura;


    /* Fundo */

    ctx.fillStyle = "#ffffff";

    ctx.fillRect(
        0,
        0,
        largura,
        altura
    );


    /* Borda */

    ctx.strokeStyle = "#c40000";

    ctx.lineWidth = 12;

    ctx.strokeRect(
        10,
        10,
        largura - 20,
        altura - 20
    );


    /* Cabeçalho */

    ctx.fillStyle = "#c40000";

    ctx.fillRect(
        0,
        0,
        largura,
        130
    );


    /* Logo textual */

    ctx.fillStyle = "#ffffff";

    ctx.font =
        "bold 65px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "MEU PRATINHO",
        largura / 2,
        85
    );


    /* Parabéns */

    ctx.fillStyle = "#c40000";

    ctx.font =
        "bold 75px Arial";

    ctx.fillText(
        "PARABÉNS!",
        largura / 2,
        235
    );


    /* Ganhou */

    ctx.fillStyle = "#333333";

    ctx.font =
        "bold 36px Arial";

    ctx.fillText(
        "VOCÊ GANHOU",
        largura / 2,
        290
    );


    /* Valor */

    ctx.fillStyle = "#c40000";

    ctx.font =
        "bold 95px Arial";

    ctx.fillText(
        "R$ 1,00",
        largura / 2,
        395
    );


    /* Desconto */

    ctx.fillStyle = "#333333";

    ctx.font =
        "bold 34px Arial";

    ctx.fillText(
        "DE DESCONTO EM QUALQUER COMPRA",
        largura / 2,
        450
    );


    /* Linha amarela */

    ctx.strokeStyle = "#ffcc00";

    ctx.lineWidth = 8;

    ctx.beginPath();

    ctx.moveTo(150, 490);

    ctx.lineTo(850, 490);

    ctx.stroke();


    /* Código */

    ctx.fillStyle = "#333333";

    ctx.font =
        "bold 30px Arial";

    ctx.fillText(
        "CUPOM: " + codigo,
        largura / 2,
        550
    );


    /* Número */

    ctx.font =
        "24px Arial";

    ctx.fillStyle = "#666666";

    ctx.fillText(
        "Número premiado: " + numero,
        largura / 2,
        595
    );


    /* Rodapé */

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
        document.getElementById("cupomCanvas");

    if (!canvas) {

        alert("Cupom não encontrado.");

        return;
    }


    const link =
        document.createElement("a");


    link.download =
        "cupom-meu-pratinho.png";


    link.href =
        canvas.toDataURL("image/png");


    link.click();

}


/* =========================================
   WHATSAPP
========================================= */

async function enviarWhatsApp() {

    const codigo =
        localStorage.getItem(
            "cupomMeuPratinho"
        );


    if (!codigo) {

        alert(
            "Cupom não encontrado."
        );

        return;
    }


    const mensagem =
        "🎉 PARABÉNS! 🎉\n\n" +
        "Ganhei um cupom de R$ 1,00 de desconto " +
        "no MEU PRATINHO! 🍱❤️\n\n" +
        "🎟️ Cupom: " + codigo +
        "\n\n" +
        "Vou utilizar esse cupom em uma compra. 😊";


    const canvas =
        document.getElementById("cupomCanvas");


    /* Tenta compartilhar a imagem */

    if (
        navigator.share &&
        navigator.canShare
    ) {

        try {

            canvas.toBlob(
                async function (blob) {

                    const arquivo =
                        new File(
                            [blob],
                            "cupom-meu-pratinho.png",
                            {
                                type: "image/png"
                            }
                        );


                    if (
                        navigator.canShare({
                            files: [arquivo]
                        })
                    ) {

                        await navigator.share({

                            files: [arquivo],

                            title:
                                "Cupom Meu Pratinho",

                            text:
                                mensagem

                        });

                        return;
                    }


                    abrirWhatsApp(mensagem);

                },
                "image/png"
            );


            return;

        } catch (e) {

            console.log(
                "Compartilhamento não disponível."
            );

        }

    }


    /* Alternativa */

    abrirWhatsApp(mensagem);

}


/* =========================================
   ABRIR WHATSAPP
========================================= */

function abrirWhatsApp(mensagem) {

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

function novoJogo() {

    const campo =
        document.getElementById("numero");

    const erro =
        document.getElementById("erro");

    const resultado =
        document.getElementById("resultado");

    const naoGanhou =
        document.getElementById("naoGanhou");

    const jogo =
        document.querySelector(".jogo-card");


    campo.value = "";

    erro.textContent = "";

    campo.classList.remove(
        "input-erro"
    );


    jogo.style.display = "block";

    resultado.style.display = "none";

    naoGanhou.style.display = "none";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================
   ENTER
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const campo =
            document.getElementById("numero");


        if (!campo) {

            console.error(
                "Campo numero não encontrado."
            );

            return;
        }


        campo.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    verificarNumero();

                }

            }
        );


        campo.addEventListener(
            "input",
            function () {

                this.value =
                    this.value
                    .replace(/\D/g, "")
                    .slice(0, 2);

            }
        );

    }
);
```
