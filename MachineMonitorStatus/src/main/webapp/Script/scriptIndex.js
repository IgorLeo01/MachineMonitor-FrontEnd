const url = `http://192.168.0.221:8080/MachineMonitor/registers`
const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
}
fetch(url, options)
    .then((response) => {
        return response.json()
            .then((responseData) => console.log(responseData))
    })
    .catch(e => console.Log('Deu error: ' + e.message))
