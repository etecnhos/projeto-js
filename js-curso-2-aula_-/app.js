let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2})
}

function exibirMensagemInicial() {
  exibirTextoNaTela('h1', 'Jogo do Número Secreto');
  exibirTextoNaTela('p', 'Escolha um número entre 1 e 50');
}

exibirMensagemInicial();

function verificarChute() {
  let chute = parseInt(document.querySelector('input').value); // Converte o valor para inteiro

  if (chute === numeroSecreto) {
    exibirTextoNaTela('h1', 'Acertou!');

    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela('p', mensagemTentativas);

    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela('p', 'O número secreto é menor');
    } else {
      exibirTextoNaTela('p', 'O número secreto é maior');
    }

    tentativas++;
    limparCampo();
  }
}

function gerarNumeroAleatorio() {
  let numeroEscolhido;

  do {
    numeroEscolhido = parseInt(Math.random() * numeroLimite) + 1; // Gera número entre 1 e o limite
  } while (listaDeNumerosSorteados.includes(numeroEscolhido)); // Evita números repetidos

  listaDeNumerosSorteados.push(numeroEscolhido);
  console.log(listaDeNumerosSorteados);

  return numeroEscolhido;
}

function limparCampo() {
  document.querySelector('input').value = '';
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true);
}