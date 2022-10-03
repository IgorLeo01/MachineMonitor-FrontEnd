function get(url){
	let request = new XMLHttpRequest()
	request.open("GET", url, false)
	request.send()
	return request.responseText
}

function linha(data){
	
}

function main(){
	console.log(get("http://192.168.0.221:8080/MachineMonitor/registers"));
}

main()