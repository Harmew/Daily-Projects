const resultado = document.querySelector('.resultado')
const numeros = document.querySelectorAll('.numeros')
const box = document.querySelector('.box')

numeros.forEach((item) => {
  item.addEventListener('keyup', trocar)
})

function trocar(item) {
  const nome = item.target.id
  const valor = item.target.value
  if(nome == 'borderTopLeftRadius') {
    return box.style.borderTopLeftRadius = valor + 'px'
  }
  if(nome == 'borderBottomRightRadius') {
    return box.style.borderBottomRightRadius = valor + 'px'
  }
  if(nome == 'borderBottomLeftRadius') {
    return box.style.borderBottomLeftRadius = valor + 'px'
  }
  if(nome == 'borderTopRightRadius') {
    return box.style.borderTopRightRadius = valor + 'px'
  }
}

function copiar() {
  const texto = box.style
  navigator.clipboard.writeText(texto.cssText);
  resultado.innerText = 'Copiado'
  setTimeout(function() {resultado.innerText = 'Copiar'},2000)
}