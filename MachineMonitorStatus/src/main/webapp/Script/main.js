const url = 'http://192.168.0.221:8080/MachineMonitor/registers';

function fazGet(url) {
	let request = new XMLHttpRequest()
	request.open("GET", url, false)
	request.send()
	return request.responseText
}

function criaLinha(machine) {
	linha = document.createElement("tr");
	linha.classList.add('linha');
	tdId = document.createElement("td");
	tdId.classList.add('firstColumn');
	tdNome = document.createElement("td");
	tdNome.classList.add('item');
	tdIp = document.createElement("td");
	tdIp.classList.add('item');
	tdOs = document.createElement("td");
	tdOs.classList.add('item');
	tdDesc = document.createElement("td");
	tdDesc.classList.add('item');
	tdStatus = document.createElement("td");
	tdStatus.classList.add('item');
	tdLastHeart = document.createElement("td");
	tdLastHeart.classList.add('item');
	tdProcess = document.createElement("td");
	tdProcess.classList.add('item');
	tdLimitProcess = document.createElement("td");
	tdLimitProcess.classList.add('item');
	tdMemory = document.createElement("td");
	tdMemory.classList.add('item');
	tdLimitMemory = document.createElement("td");
	tdLimitMemory.classList.add('item');
	tdDisk = document.createElement("td");
	tdDisk.classList.add('item');
	tdLimitDisk = document.createElement("td");
	tdLimitDisk.classList.add('item');
	tdMemoryLevel = document.createElement("td");
	tdMemoryLevel.classList.add('item');
	tdProcessingLevel = document.createElement("td");
	tdProcessingLevel.classList.add('item');
	tdDiskLevel = document.createElement("td");
	tdDiskLevel.classList.add('item');

	tdId.innerHTML = machine.mchID
	tdNome.innerHTML = machine.name
	tdIp.innerHTML = machine.IP
	tdOs.innerHTML = machine.OS ? machine.OS : ""
	tdDesc.innerHTML = '<span class="desc-machine">' + machine.description + '</span>'
	tdStatus.innerHTML = machine.status ? '<span style="color:#40A944">OK</span>' : '<span style="color:#E93333">FAIL</span>'
	tdMemoryLevel = machine.memoryLevel
	tdProcesisngLevel = machine.processingLevel
	tdDiskLevel = machine.disklevel

	const memory_str = "<span class='info-memory-state'>" +
                    "<span class='info-memory-state-item'>"+
                        "<div class='i-state'>"+
                    		"<img src='imagens/speedometer 1.png' alt=''>"+
                        "</div>"+
                        "<span>"+(machine.memoryLevel)+ "</span>"+
                    "</span>"+
                    "<span class='divider'>"+
                        "<img src='imagens/Rectangle 25.png' alt=''>"+
                    "</span>"+
                    "<span class='info-memory-state-item'>"+
                        "<div class='i-state'>"+
                         	"<img src='imagens/Ellipse 24.png' alt=''>"+
                            "<span>max</span>"+
                        "</div>"+
                        "<span>"+(machine.limitMemory)+"%"+"</span>"+
                    "</span>"+
                "</span>";
                
     const process_str = "<span class='info-memory-state'>" +
                    "<span class='info-memory-state-item'>"+
                        "<div class='i-state'>"+
                    		"<img src='imagens/speedometer 1.png' alt=''>"+
                        "</div>"+
                        "<span>txt1</span>"+
                    "</span>"+
                    "<span class='divider'>"+
                        "<img src='imagens/Rectangle 25.png' alt=''>"+
                    "</span>"+
                    "<span class='info-memory-state-item'>"+
                        "<div class='i-state'>"+
                         	"<img src='imagens/Ellipse 24.png' alt=''>"+
                            "<span>max</span>"+
                        "</div>"+
                        "<span>"+(machine.limitProcessing)+"%"+"</span>"+
                    "</span>"+
                "</span>";
                
      const disk_str = "<span class='info-memory-state'>" +
                    "<span class='info-memory-state-item'>"+
                        "<div class='i-state'>"+
                    		"<img src='imagens/speedometer 1.png' alt=''>"+
                        "</div>"+
                        "<span>txt2</span>"+
                    "</span>"+
                    "<span class='divider'>"+
                        "<img src='imagens/Rectangle 25.png' alt=''>"+
                    "</span>"+
                    "<span class='info-memory-state-item'>"+
                        "<div class='i-state'>"+
                         	"<img src='imagens/Ellipse 24.png' alt=''>"+
                            "<span>max</span>"+
                        "</div>"+
                        "<span>"+(machine.limitDisk)+"%"+"</span>"+
                    "</span>"+
                "</span>";

	tdLastHeart.innerHTML = '<span class="last-heartbeat">' + (machine.latestHeartBeat ? machine.latestHeartBeat : "") + '</span>'
	tdProcess.innerHTML = process_str
	//tdProcess.innerHTML = '<span class="process-monitor">' + (machine.processingSpeed ? machine.processingSpeed : "30") + '</span>'
	//tdLimitProcess.innerHTML = machine.limitProcessing
	tdMemory.innerHTML = memory_str
	//tdMemory.innerHTML = '<span class="memory-monitor">'+ (machine.memoryLen ? machine.memoryLen : "30%")+ '</span>'
	//tdLimitMemory.innerHTML = machine.limitMemory
	tdDisk.innerHTML = disk_str
	//tdDisk.innerHTML = '<span class="disk-monitor">' + (machine.systemDiskLen ? machine.systemDiskLen : "30") + " " + machine.limitDisk + '</span>'
	//tdLimitDisk.innerHTML = machine.limitDisk

	linha.appendChild(tdId);
	linha.appendChild(tdNome);
	linha.appendChild(tdIp);
	linha.appendChild(tdOs);
	linha.appendChild(tdDesc);
	linha.appendChild(tdStatus);
	linha.appendChild(tdLastHeart);
	linha.appendChild(tdProcess);
	linha.appendChild(tdMemory);
	linha.appendChild(tdDisk);

	return linha;
}

function main(item) {
	let data = fazGet("http://192.168.0.221:8080/MachineMonitor/registers")
	let monitors = JSON.parse(data).Machines;
	let beats = JSON.parse(data).Heartbeat;
	console.log(beats);
	let tabela = document.getElementById("list")
	console.log(monitors);

	/*beats.forEach(element => {

		let linha = criaLinha(element);
		tabela.appendChild(linha);
		console.log(linha);
	});*/

	monitors.forEach(element => {

		let linha = criaLinha(element);
		tabela.appendChild(linha);
		console.log(linha);
	});

	return item;
}

main()

//paginação
let responseData = {
	get(url) {
		let dados = fazGet(url)
		machines = JSON.parse(dados)
		return machines
	}

}

let data = responseData.get(url).Machines

let perPage = 10
const state = {
	page: 1,
	perPage,
	totalPage: Math.ceil(data.length / perPage),
	maxVisibleButtons: 5,
}

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
		html.get('.list').innerHTML = "" 
		let page = state.page - 1
		let start = page * state.perPage 
		let end = start + state.perPage
		const paginatedItens = data.slice(start, end)
		paginatedItens.forEach(list.create)
	}
}

function update() {
	list.update()
	buttons.update()
}

function init() {
	update()
	controls.createListeners()
}

const html = {
	get(element) {
		return document.querySelector(element)
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

init()