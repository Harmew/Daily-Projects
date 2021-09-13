const dadosContainer = document.querySelector('.container-dados')
const dados = document.querySelectorAll('.dados')
const button = document.querySelector('.fechar') 
const container = document.querySelector('.container-info')
const sobreLista = document.querySelectorAll('.sobre')
const pessoas = [
    {
        nome: 'Daniel de Oliveira',
        telefone: '41977161810',    
        email: "dann.ew@outlook.com",
        cpf: "09773026940",
        cep: "83466370",
        nascimento: "07-11-2003",
        logradouro: "Rua Seipe",
        numero: "35",
        bairro: "Campo Pequeno",
        cidade: "Colombo",
        estado: "Parana",
    },
    {
        nome: 'Everton Porceli',
        telefone: '41999999999',
        email: "evertib@live.com",
        cpf: "01234567891",
        cep: "02345678",
        nascimento: "26-10-1996",
        logradouro: "Rua Joao",
        numero: "15",
        bairro: "Centro",
        cidade: "Curitiba",
        estado: "Parana"
    },
    {
        nome: 'Davi Rodrigues',
        telefone: '2191231412',
        email: "davi@email.com",
        cpf: "12345678912",
        cep: "12345678",
        nascimento: "07-11-2003",
        logradouro: "Rua 2",
        numero: "123",
        bairro: "Centro",
        cidade: "Juiz de Fora",
        estado: "Minas Gerais"
    },
    {
        nome: "Marcos Rodrigo",
        telefone: "489934334332",
        email: "mrodrigues@gmail.com",
        cpf: "09766677703",
        cep: "9837243940",
        nascimento: "19-04-19957",
        logradouro: "Avenida Paraná",
        numero: "2003",
        bairro: "Sergipe",
        cidade: "Petropolis",
        estado: "Amapá"
    }
]



const listaPessoas = () => {
    return fetch('./js/pessoas.json')
        .then(function(response) {
            if(response.ok) {
                return response.json() 


                








            } 
            throw new Error('Não foi possivel listar os clientes')
        })
    .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    });
}




function colocarDados() {
    let nomes =  document.querySelectorAll('#nome')
    let telefones =  document.querySelectorAll('#telefone')
    let sobre = document.querySelectorAll('.imagem')
    for(let i = 0; i < pessoas.length; i++) {
        if(pessoas[i].nome) {
            nomes[i].innerText = pessoas[i].nome
        } else {
            nomes[i].innerText = 'Sem nome'
        }
        if(pessoas[i].telefone) {
            telefones[i].innerText = pessoas[i].telefone
        } else {
           telefones[i].innerText = 'Sem telefone'
        }
        if(sobre) {
            sobre[i].setAttribute('id', `${i}`);
        }
    }
}

const criardorDeDados = () =>{
    if(dados.length < pessoas.length) {
        const clonarDados = dados[0].cloneNode(true);
        dadosContainer.appendChild(clonarDados)
    }
}

for(let i = dados.length; i < pessoas.length; i++){
    criardorDeDados()
    if(i == pessoas.length - 1){
        colocarDados()
    }
}

button.addEventListener('click', () => {
    container.classList.remove('active')
}) 


function pegarDados(event) {
    container.classList.add('active')
    const data = document.querySelectorAll('[data-info]')
    let id = event.target.id

    data[0].innerText = pessoas[id].nome
    data[1].innerText = pessoas[id].telefone
    data[2].innerText = pessoas[id].email
    data[3].innerText = pessoas[id].cpf
    data[4].innerText = pessoas[id].cep
    data[5].innerText = pessoas[id].nascimento
    data[6].innerText = pessoas[id].logradouro
    data[7].innerText = pessoas[id].numero
    data[8].innerText = pessoas[id].bairro
    data[9].innerText = pessoas[id].cidade
    data[10].innerText = pessoas[id].estado
}
