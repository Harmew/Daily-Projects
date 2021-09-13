'use strict'

// Abre o Modal

const openModal = () => document.getElementById('modal')
    .classList.add('active')

// Fecha o Modal

const closeModal = () => {
    clearFields() // Limpa os campos
    document.getElementById('modal').classList.remove('active') // Fecha o modal
}


// Verifica se tem dados, caso não teja cria uma arrey vazia e coloca emuma constante
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []

//  Envia os dados para o Local Storage

const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

// CRUD - Create Read Update Delete


const deleteClient = (index) => { // Função para deletar o client
    const dbClient = readClient() // Pega os clientes
    dbClient.splice(index, 1) // Divide ele pelo index em só um
    setLocalStorage(dbClient) // E envia os novos valores para o LocalStorage
}

const updateClient = (index, client) => { // Função para modificar o client
    const dbClient = readClient() // Pega os clientes
    dbClient[index] = client // Pega o cliente pelo Index
    setLocalStorage(dbClient) // Envia os dados
}

const readClient = () => getLocalStorage() // Função para ler os clientes

const createClient = (client) => {  // Função para criar clientes
    const dbClient = getLocalStorage() // Pega os clientes (se existir)
    dbClient.push(client) // Adiciona o cliente por ultimo
    setLocalStorage(dbClient) // Envia os dados
}

const isValidFields = () => {
   return document.getElementById('form').reportValidity() // Verifica se todos os campos estão preenchidos
}

// Interação com o layout

const clearFields = () => { // Função para limpar os campos
    const fields = document.querySelectorAll('.modal-field') // Selecionando os campos
    fields.forEach(field => field.value = "") // Adicionando nenhum valor dentro deles
}

const saveClient = () => { // Função para salvar o cliente
    if (isValidFields()) { // Verifica se tem dados
        const client = { // Cria um objeto com os valores
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index // pega a informação da tabela 
        if(index == 'new') { // Se o index tiver new ele cria um novo client
            createClient(client) // Cria o client passando ele
            updateTable() // Atualiza a tabela
            closeModal() // Fecha o modal
        } else {
            updateClient(index, client) // Muda o client
            updateTable() // Atualiza a tabela
            closeModal() // Fecha o modal
        }
    }
}

const createRow = (client, index) => { // Criar nova Linha
    const newRow = document.createElement('tr') // Cria uma linha
    newRow.innerHTML = ` 
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.telefone}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}"Excluir</button>
        </td>>
    ` // Adiciona os dados 
    document.querySelector('#tableClient>tbody').appendChild(newRow)  // Adiciona por ultimo
}

const clearTable = () => { // Função para limpar a tabela
    const rows = document.querySelectorAll('#tableClient>tbody tr') // Seleciona das linhas
    rows.forEach(row => row.parentNode.removeChild(row)) // remove elas
}

const updateTable = () => { // Função para atualizar a tabela
    const dbClient = readClient() // Pega os clientes 
    clearTable() // Limpa a Tabela
    dbClient.forEach(createRow) // Adiciona a cada client a função crateRow (criarLinha)
}

const fillFields = (client) => { // Função para preencher os campos
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('telefone').value = client.telefone  // Pega os campos de cada um e coloca o valor baseado no client JÁ CRIADO
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.index = client.index
}

const editClient = (index) => { // Função para editar os clientes
    const client = readClient()[index]  // Pega os clients pelo index passado
    client.index = index // Coloca o index pelo index
    fillFields(client) // Preenche os campos
    openModal() // Abre o Modal
}

const editDelete = (event) => { // Função para deletar o clientes
    if(event.target.type == 'button') { // Verifica se o botão selecionado é realmente um botão
        const [action, index] = event.target.id.split('-') // ??
        if(action == 'edit') { // Verifica se o action tem valor de edit
            editClient(index) // Então edita o client
        } else { 
            const client = readClient()[index] // Le o client
            const response = confirm(`Deseja realmente excluir o client ${client.nome}`) // Abre um prompt de confirm 
            if(response) { // Se a resposta for verdadeira
                deleteClient(index) // Execulta a função de deletar o client
                updateTable() // E atualiza a tabela
            }
        }
    }
}

updateTable() // Atualiza a tabela

// Eventos

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal) 

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveClient)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)