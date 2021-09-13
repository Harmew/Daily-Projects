const lampadas = document.querySelectorAll('.lampada')
let tamanho = lampadas.length;

function desligar() {
  for(let i = 0; i < tamanho; i++) {
    lampadas[i].classList.add('desligada')
  }
}

function ligar() {
  for(let i = 0; i < tamanho; i++) {
    lampadas[i].classList.remove('desligada')
  }
}

function mudar() {
  let velocidade = document.querySelector('#velocidade').value
  for (let i = 0; i < tamanho; i++) {
    lampadas[i].style.animationDuration = velocidade + "s";
  }
}