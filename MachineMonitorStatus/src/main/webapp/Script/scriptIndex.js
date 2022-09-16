const urlGet = `http://192.168.0.221:8080/MachineMonitor/registers`
const options = {
    method: 'GET',
    mode: "no-cors",
    headers: {
        "Content-Type": "application/json",
    }
}
//Executa requisição HTTP Get
function getData(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}
//Restorna os dados e elementos consedidos pela API
let responseData = {
    get(url) {
        var dados = getData(url)
        machines = JSON.parse(dados)
        return machines
    }

}

//Coloca os dados do elemento nas devidas colunas da tabela
function criaLinha(machine) {
    linha = document.createElement("tr")
    linha.classList.add('linha')
    tdId = document.createElement("td")
    tdId.classList.add('firstColumn')
    tdIp = document.createElement("td")
    tdIp.classList.add('item')
    tdOs = document.createElement("td")
    tdOs.classList.add('item')
    tdStatus = document.createElement("td")
    tdStatus.classList.add('item')
    tdLastHeartbeat = document.createElement("td")
    tdLastHeartbeat.classList.add('item')
    tdLimiteMemoria = document.createElement("td")
    tdLimiteMemoria.classList.add('item')
    tdLimiteProcessamento = document.createElement("td")
    tdLimiteProcessamento.classList.add('item')
    tdLimiteDisco = document.createElement("td")
    tdLimiteDisco.classList.add('item')

    if (machine.status == false) {
        tdStatus.classList.add('statusFail')
        machine.status = "fail"
    } else {
        tdStatus.classList.add('status')
    }

    tdId.innerHTML = machine.mchID
    tdIp.innerHTML = machine.IP
    tdOs.innerHTML = machine.OS
    tdStatus.innerHTML = machine.status
    tdLastHeartbeat.innerHTML = new Date(machine.latestHeartBeat).toISOString().replace(/t|z/gi, " ").replace(/.000/gi, "")
    tdLimiteMemoria.innerHTML = machine.limitMemory
    tdLimiteProcessamento.innerHTML = machine.limitProcessing
    tdLimiteDisco.innerHTML = machine.limitDisk

    linha.appendChild(tdId)
    linha.appendChild(tdIp)
    linha.appendChild(tdOs)
    linha.appendChild(tdStatus)
    linha.appendChild(tdLastHeartbeat)
    linha.appendChild(tdLimiteMemoria)
    linha.appendChild(tdLimiteProcessamento)
    linha.appendChild(tdLimiteDisco)

    return linha
}
//popula a tabelacom os elementos recebidos da API
function populateList(item) {
    const list = document.querySelector('.list')
    item.forEach(element => {
        let linha = criaLinha(element)
        list.appendChild(linha)
    })

    return item
}

//==================================================================================
let data = responseData.get(urlGet).Machines
//Configura dados da Paginação da tabela
let perPage = 10
const state = {
    page: 1,
    perPage,
    totalPage: Math.ceil(data.length / perPage),
    maxVisibleButtons: 5,
}
//busca algum elemento HTML
const html = {
    get(element) {
        return document.querySelector(element)
    }
}

//Controles dos botões de paginação: previous, next.
const controls = {
    next() {
        state.page++
        const lastPage = state.page > state.totalPage
        if (lastPage) {
            state.page--
        }
    },
    prev() {
        state.page--
        if (state.page < 1) {
            state.page++
        }
    },
    goTo(page) {
        if (page < 1) {
            page = 1
        }

        state.page = +page

        if (page > state.totalPage) {
            state.page = state.totalPage
        }
    },
    createListeners() {
        html.get('.next').addEventListener('click', () => {
            controls.next()
            update()
        })

        html.get('.prev').addEventListener('click', () => {
            controls.prev()
            update()
        })
    }
}
const list = {
    create(item) {
        item.id = state.page
        let linha = criaLinha(item)
        html.get('.list').appendChild(linha)
    },
    update() {
        html.get('.list').innerHTML = "" //Limpa a pagina 
        let page = state.page - 1
        let start = page * state.perPage //Determina a qnt de paginas
        let end = start + state.perPage
        const paginatedItens = data.slice(start, end)
        paginatedItens.forEach(list.create)
    }
}

const buttons = {
    element: html.get('.pagination .numbers'),
    create(number) {
        const button = document.createElement('div')

        button.innerHTML = number

        if (state.page == number) {
            button.classList.add('active')
        }

        button.addEventListener('click', (event) => {
            const page = event.target.innerText

            controls.goTo(page)
            update()
        })

        this.element.appendChild(button)
    },
    update() {
        this.element.innerHTML = ""
        const { maxLeft, maxRight } = buttons.calculateMaxVisible()
        for (let page = maxLeft; page <= maxRight; page++) {
            buttons.create(page)
        }
    },
    calculateMaxVisible() {
        let maxLeft = (state.page - Math.floor(state.maxVisibleButtons / 2))
        let maxRight = (state.page + Math.floor(state.maxVisibleButtons / 2))

        if (maxLeft < 1) {
            maxLeft = 1
            maxRight = state.maxVisibleButtons
        }

        if (maxRight > state.totalPage) {
            maxLeft = state.totalPage - (state.maxVisibleButtons - 1)
            maxRight = state.totalPage

            if (maxLeft < 1)
                maxLeft = 1
        }

        return { maxLeft, maxRight }
    }

}

const filters = {
    click() {
        html.get('#filter-button').addEventListener('click', () => {
            const ip = html.get('#input').value
            let date = html.get('#date').value
                console.log(date)
            if (ip !== '' && date === '') {
                var url =urlGet + "?ip=" + ip
                data = responseData.get(url).Machines
                update()
                return console.log(1)
            }

            if (ip === '' && date !== '') {
                url = urlGet + "?data=" + date + " 11:11:11"
                console.log(url)
                data = responseData.get(url).Machines
                update()
                return console.log(2)
            }

            if (ip !== '' && date !== '') {
                url = urlGet + "?ip=" + ip + "&" + "data=" + date
                data = responseData.get(urlGet + "?ip=" + ip + "&" + "data=" + date).Machines
                update()
                return console.log(3)
            }
            data = responseData.get(urlGet).Machines
            update()
            return 0
        })
    }
}

function update() {
    list.update()
    buttons.update()
}

function init() {
    update()
    controls.createListeners()
    filters.click()
}

init()