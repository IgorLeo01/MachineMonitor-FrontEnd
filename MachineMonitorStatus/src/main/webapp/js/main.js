const url = 'http://192.168.0.221:8080/MachineMonitor/registers';

function fazGet(url) {
	let request = new XMLHttpRequest()
	request.open("GET", url, false)
	request.send()
	return request.responseText
}

function initLevelColor(){
	
}


function criaLinha(machine, heartbeat) {
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
	tdMemoryLevel.innerHTML = heartbeat.memoryLevel
	tdDesc.innerHTML = '<span class="desc-machine">' + machine.description + '</span>'
	tdStatus.innerHTML = machine.status ? '<span style="color:#40A944">OK</span>' : '<span style="color:#E93333">FAIL</span>'
	
	tdProcessingLevel.innerHTML  = heartbeat.processingLevel 
	tdDiskLevel.innerHTML  = heartbeat.disklevel
	

	
	var info_memory_state = document.createElement('span');
	info_memory_state.classList.add('info-memory-state');

	const body_memorystr = "<span class='info-memory-state'>" +
                    "<span class='info-memory-state-item'>"+
                        "<div class='i-state'>"+
                    		"<img src='imagens/speedometer 1.png' alt=''>"+
                        "</div>"+
                        "<span>"+ (heartbeat.memoryLevel)+'%'+ "</span>"+
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
                    "</span>";
                    
                    console.log(heartbeat.memoryLevel);
					var percentvaluememory = ((heartbeat.memoryLevel != undefined? heartbeat.memoryLevel: 0)/machine.limitMemory) * 100;					

					console.log(percentvaluememory+"************");   
					               
                    info_memory_state.innerHTML = body_memorystr            
                
                if ( percentvaluememory < ((90/100) * machine.limitMemory)) {
					tdMemory.style.backgroundColor =  'rgba(104, 250, 110, 0.28)'
					
				}else if ((percentvaluememory > ((90/100) * machine.limitMemory)) && percentvaluememory < ((100/100) * machine.limitMemory)) {
					tdMemory.style.backgroundColor = 'rgba(250, 192, 104, 0.28)'
					
				}else  {
					tdMemory.style.backgroundColor = 'rgba(250, 104, 104, 0.28)'}

                
                var info_process_state = document.createElement('span');
				info_process_state.classList.add('info-memory-state');
                
     const body_processStr = "<span class='info-memory-state'>" +
                    "<span class='info-memory-state-item'>"+
                        "<div class='i-state'>"+
                    		"<img src='imagens/speedometer 1.png' alt=''>"+
                        "</div>"+
                        "<span>"+ (heartbeat.processingLevel)+ '%' +"</span>"+
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
                
                var percentvalueprocess = ((heartbeat.processingLevel != undefined? heartbeat.processingLevel: 0)/machine.limitProcessing) * 100;					

					console.log(percentvalueprocess+"************");   
					               
                    info_process_state.innerHTML = body_processStr            
                
                if ( percentvalueprocess < ((90/100) * machine.limitProcessing)) {
					tdProcess.style.backgroundColor =  'rgba(104, 250, 110, 0.28)'
					
				}else if ((percentvalueprocess > ((90/100) * machine.limitProcessing)) && percentvalueprocess < ((100/100) * machine.limitProcessing)) {
					tdProcess.style.backgroundColor = 'rgba(250, 192, 104, 0.28)'
					
				}else  {
					tdProcess.style.backgroundColor = 'rgba(250, 104, 104, 0.28)'}
  
  				var info_disk_state = document.createElement('span');
				info_disk_state.classList.add('info-memory-state');
  
                
      const body_diskStr = "<span class='info-memory-state'>" +
                    "<span class='info-memory-state-item'>"+
                        "<div class='i-state'>"+
                    		"<img src='imagens/speedometer 1.png' alt=''>"+
                        "</div>"+
                        "<span>"+ (heartbeat.diskLevel)+ '%' +"</span>"+
                    "</span>"+
                    "<span class='divider'>"+
                        "<img src='imagens/Rectangle 25.png' alt=''>"+
                    "</span>"+
                    "<span class='info-memory-state-item'>"+
                        "<div class='i-state'>"+
                         	"<img src='imagens/Ellipse 24.png' alt=''>"+
                            "<span>max</span>"+
                        "</div>"+
                         "<div class='balloon'>"+
                        (machine.systemDiskLen ? `Tamanho: ${machine.systemDiskLen} GB`: "Tamanho não disponível")+
                        "</div>"+
                        "<span>"+(machine.limitDisk)+"%"+"</span>"+
                    "</span>"+
                "</span>";
                
                 var percentvaluedisk = ((heartbeat.diskLevel != undefined? heartbeat.diskLevel: 0)/machine.limitDisk) * 100;					

					console.log(percentvaluedisk+"************");   
					               
                    info_disk_state.innerHTML = body_diskStr            
                
                if ( percentvaluedisk < ((90/100) * machine.limitProcessing)) {
					tdDisk.style.backgroundColor =  'rgba(104, 250, 110, 0.28)'
					
				}else if ((percentvaluedisk > ((90/100) * machine.limitProcessing)) && percentvaluedisk < ((100/100) * machine.limitDisk)) {
					tdDisk.style.backgroundColor = 'rgba(250, 192, 104, 0.28)'
					
				}else  {
					tdDisk.style.backgroundColor = 'rgba(250, 104, 104, 0.28)'}

	tdLastHeart.innerHTML = '<span class="last-heartbeat">' + (machine.latestHeartBeat ? machine.latestHeartBeat : "") + '</span>'
	tdProcess.appendChild(info_process_state)
	//tdProcess.innerHTML = '<span class="process-monitor">' + (machine.processingSpeed ? machine.processingSpeed : "30") + '</span>'
	//tdLimitProcess.innerHTML = machine.limitProcessing
	tdMemory.appendChild(info_memory_state) 
	//tdMemory.style.backgroundColor = 'red'
	//tdMemory.innerHTML = '<span class="memory-monitor">'+ (machine.memoryLen ? machine.memoryLen : "30%")+ '</span>'
	//tdLimitMemory.innerHTML = machine.limitMemory
	tdDisk.appendChild(info_disk_state)
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

let data = fazGet("http://192.168.0.221:8080/MachineMonitor/registers")
let monitors = JSON.parse(data).Machines;
let beats = JSON.parse(data).Heartbeat;
let tabela = document.getElementById("list");



function main() {
	
	//montarTabela(0);
	
	init();
	console.log(monitors.length);
	console.log(state.totalPage);
	/*const list = document.querySelector('.list')
    item.forEach(element => {
        let linha = criaLinha(element)
        list.appendChild(linha)
    })*/
	//console.log("aaaaaaaaaaaaaa");
	
}


//-----------------paginação


//let data = responseData.get(url).Machines



let perPage = 10

const state = {
	page: 1,
	perPage,
	totalPage: Math.ceil(monitors.length / perPage),
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

		state.page = page

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
	create(monitor) {
		//item.id = state.page
		let rs = beats.find(e => e.IP == monitor.IP);
		if (rs == undefined) {
			rs = beats[0];
			rs.memoryLevel = 0; 
			rs.processingLevel = 0;
			rs.diskLevel = 0;
		}
		let linha = criaLinha(monitor, rs)
		//html.get("list").appendChild(linha)
		tabela.appendChild(linha);
	},
	update() {
		tabela.innerHTML = "" 
		let page = state.page - 1
		let start = page * state.perPage 
		let end = start + state.perPage
		const paginatedItens = monitors.slice(start, end)
		paginatedItens.forEach(list.create)
	}
}

function update() {
	list.update()
	buttons.update()
}

function init() {
	controls.createListeners()
	update()
	console.log(state.totalPage)
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

			controls.goTo(+page)
			update()
		})

		this.element.appendChild(button)
	},
	update() {
		this.element.innerHTML = ""
		const { maxLeft, maxRight } = buttons.calculateMaxVisible()
		//console.log(maxLeft, maxRight);
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
main()


////// MouseOver
//var mouseEvent = document.querySelector("#title");

//mouseEvent.addEventListener("mouseover", function() {
	
//	this.style.backgroundcolor = "yellow"
//})