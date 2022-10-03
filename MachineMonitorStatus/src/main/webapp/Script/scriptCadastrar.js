//busca um elemento html no documento
const html = {
    get(element){
        return document.querySelector(element)
    }
}
//opções da requisição HTTP
const options = {
    method: 'Post',
    mode: "no-cors",
    headers: {
        "Content-Type": "application/json",
    }
}
//captura os dados digitados pelo usuário nos iputs da página
const inputs = {
    getInputs(){
        const machine = {
			IP: document.getElementById('ip').value,
			limitMemory: document.getElementById('limitMemory').value,
			limitProcessing: document.getElementById('limitProcessing').value,
			limitDisk: document.getElementById('limitDisk').value,
			name: document.getElementById('name').value,
			description: document.getElementById('description').value,
        }
        return machine 
    }
}
//Evento de click do botão cadastrar 
html.get('#btnCadastrar').addEventListener('click', () => {
    const machine = inputs.getInputs()
    fetch(`http://192.168.0.221:8080/MachineMonitor/machine`, {
        method: 'Post',
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(machine)
    }).then(e => {
        console.log(e)
        alert("Máquina cadastrada com sucesso.")
    })
})