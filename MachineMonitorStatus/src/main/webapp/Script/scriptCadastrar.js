const html = {
    get(element){
        return document.querySelector(element)
    }
}

const options = {
    method: 'Post',
    mode: "no-cors",
    headers: {
        "Content-Type": "application/json",
    }
}
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


html.get('#btnCadastrar').addEventListener('click', () => {
    const machine = inputs.getInputs()
    fetch(`http://192.168.0.221:8080/MachineMonitor/machine`, {
        method: 'Post',
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(machine)
    }).then(e => {console.log(e)})
})