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
			memoryLen: document.getElementById('limitMemory').value,
			processingSpeed: document.getElementById('limitProcessing').value,
			diskLen: document.getElementById('limitDisk').value,
			Name: document.getElementById('name').value,
			additionalInfo: document.getElementById('description').value,
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