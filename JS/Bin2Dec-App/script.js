const binariotxt = document.getElementById('number')

binariotxt.addEventListener('keyup', calcularBin)

function calcularBin() {
  const binario = binariotxt.value
  const texto = document.querySelector('.texto-final')
  const resultado = document.querySelector('.resultado')
  if (binario === '') {
    texto.style.color = 'red'
    texto.innerText = 'Por favor, Insira um número'
  }
  binario.split('').map((letra) => {
    if (letra !== '0' && letra !== '1') {
      texto.style.color = 'red'
      texto.innerText = 'Por favor, Insira um número válido'
    } else {
      const decimal = parseInt(binario, 2);
      resultado.value = decimal;
      texto.innerText = ''
    }
  });
}