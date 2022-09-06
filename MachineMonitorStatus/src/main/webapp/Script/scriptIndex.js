const urlGet = `http://192.168.0.221:8080/MachineMonitor/registers`
const options = {
    method: 'GET',
    mode: "no-cors",
    headers: {
        "Content-Type": "application/json",
    }
}
    function getData(){
        let request = new XMLHttpRequest()
        request.open("GET", urlGet, false)
        request.send()
        return request.responseText
    }

    let responseData = {
        get (){
            dados = getData()
            machines = JSON.parse(dados)
            return machines
        }

    }
  
    var machine = {
        id: 1,
        ip: "192.168.1.1",
        os:"windows",
        status: "OK",
        lastHeartbeat: new Date().toISOString(),
        limiteMemoria: "40%",
        limiteProcessamento: "30%",
        limiteDisco: "30%"
    }

    const data = Array.from({length:20})
        .map((_, i) => machine)
    
    
    function criaLinha(machine) {
        linha = document.createElement("tr")
        tdId = document.createElement("td")
        tdIp = document.createElement("td")
        tdOs = document.createElement("td")
        tdStatus = document.createElement("td")
        tdLastHeartbeat = document.createElement("td")
        tdLimiteMemoria = document.createElement("td")
        tdLimiteProcessamento = document.createElement("td")
        tdLimiteDisco = document.createElement("td")

        tdId.innerHTML = machine.mchID
        tdIp.innerHTML = machine.mchIP
        tdOs.innerHTML = machine.mchOS
        tdStatus.innerHTML = machine.mchStatus
        tdLastHeartbeat.innerHTML = new Date(machine.mchLatestHeartBeat).toISOString().replace(/t|z/gi," ").replace(/.000/gi,"")
        tdLimiteMemoria.innerHTML = machine.mchLimitMemory
        tdLimiteProcessamento.innerHTML = machine.mchLimitProcessing
        tdLimiteDisco.innerHTML = machine.mchLimitDisk

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
    
    function populateList(item){
        const list = document.querySelector('.list')
        item.forEach(element => {
            let linha = criaLinha(element)
            list.appendChild(linha)
    })

    return item 
}

//==================================================================================
let perPage = 5
const state = {
    page: 1,
    perPage,
    totalPage: Math.ceil(data.length / perPage),
    maxVisibleButtons: 5,
}

const html = {
    get(element){
        return document.querySelector(element)
    }
}

const controls = {
    next(){
        state.page++
        const lastPage = state.page > state.totalPage
        if(lastPage){
            state.page --
        }
    },
    prev(){
        state.page--
        if( state.page < 1){
            state.page ++
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
    createListeners(){ 
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
    create(item){
        item.id = state.page
        let linha = criaLinha(item)
        html.get('.list').appendChild(linha)
    },
    update(){
        html.get('.list').innerHTML = "" //Limpa a pagina 
		let page = state.page - 1
		let start = page * state.perPage //Determina a qnt de paginas
		let end = start + state.perPage
        const dados = responseData.get().Machines
		const paginatedItens = dados.slice(start, end)
		paginatedItens.forEach(list.create)
    }
}

const buttons = {
    element:  html.get('.pagination .numbers'),
    create(number){
        const button = document.createElement('div')
        
        button.innerHTML = number

        if(state.page == number) {
            button.classList.add('active')
        }

        button.addEventListener('click', (event) => {
            const page = event.target.innerText

            controls.goTo(page)
            update()
        })

       this.element.appendChild(button)
    },
    update(){
        this.element.innerHTML = ""
        const {maxLeft, maxRight} = buttons.calculateMaxVisible()
        for(let page = maxLeft; page <= maxRight; page++){
            buttons.create(page)
        }
    },
    calculateMaxVisible(){
        let maxLeft = (state.page -Math.floor(state.maxVisibleButtons/2))
        let maxRight = (state.page + Math.floor(state.maxVisibleButtons/2))
        
        if(maxLeft < 1){
            maxLeft = 1
            maxRight = state.maxVisibleButtons
        }

        if(maxRight > state.totalPage){
            maxLeft = state.totalPage - (state.maxVisibleButtons - 1)
            maxRight = state.totalPage

            if(maxLeft < 1)
                maxLeft = 1
        }

        return {maxLeft, maxRight}
    }
    
}

function update(){
    list.update()
    buttons.update()
}

function init(){
    update()
    controls.createListeners()
}

init()