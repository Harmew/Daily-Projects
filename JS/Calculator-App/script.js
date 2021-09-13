let valores = document.querySelector('[data-resultado]')

function inserir(numero) {
  valores.innerHTML = valores.innerHTML + numero
  if(valores.innerHTML.length > 8) {
    valores.innerHTML = 'Error'
  }
}

function limpar() {
  valores.innerHTML = ''
}

function apagar() {
  valores.innerHTML = valores.innerHTML.substring(0, valores.innerHTML.length -1)
}

function calcular() {
  if(valores.innerHTML) {
    valores.innerHTML = eval(valores.innerHTML)
  }
}

function mudar() {
  valores.innerHTML = -valores.innerHTML
}

const botao = document.querySelectorAll(".botao")
botao.forEach((e) => {
	e.addEventListener("click", function () {
		this.classList.add("efeito-de-click");
		setTimeout(() => {
			this.classList.remove("efeito-de-click");
		}, 100);
	});
});