'use strict'

const openModal = () => {
    document.getElementById('modal').classList.add('active')
    document.getElementById('titulo-modal').innerText = `Novo Cliente`
}

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []

const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

// CRUD 

const deleteClient = (index) => {
    const dbClient = getLocalStorage()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

const updateClient = (client, index) => {
    const dbClient = getLocalStorage()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
}

// Interação com o layout 

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = '')
}

const saveClient = () => {
    if(isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index
        if(index == 'new') {
            createClient(client)
            updateTable()
            closeModal()
        } else {
            updateClient(index, client)
            updateTable()
            closeModal()
        }
        
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}">Excluir</button>
        </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentElement.removeChild(row))
}

const updateTable = () => {
    const dbClient = getLocalStorage()
    clearTable()
    dbClient.forEach(createRow)
}

const fillFilds = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.index = client.index
}

const editClient = (index) => {
    const client = getLocalStorage()[index]
    client.index = index
    fillFilds(client)
    openModal()
    document.getElementById('titulo-modal').innerText = `Editando ${client.nome}`
}


const editDelete = (event) => {
    if(event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')
        if(action == 'edit') {
            editClient(index)
        } else {
            const client = getLocalStorage()[index]
            const response = confirm(`Deseja realmente exlcuir o cliente ${client.nome}`)
            if(response) {
                deleteClient(index)
                updateTable()
            }
        }
    }
}

updateTable()

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
