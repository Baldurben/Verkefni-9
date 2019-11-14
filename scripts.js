const companies = document.getElementById('companies');
let gif = document.createElement("img");
let texti = document.createElement("P");
/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */
const program = (() => {
  function init(companies) {
	

  return {
    init,
  }
  }
});

function emptystring() {
	var villa = document.createElement("P");
	villa.innerHTML = "Fyrirtæki má ekki vera autt";
	companies.appendChild(villa);
}
function loading() {
	texti.innerHTML = "Loading...";
	texti.setAttribute("class", "loading")
	gif.setAttribute("src", "loading.gif");
	gif.setAttribute("class", "loading")
	texti.appendChild(gif);
	companies.appendChild(texti);
}
function makeElement(name,sn,active,address) {
	div = document.createElement("div");
	div.setAttribute("class", "company")

	dt1 = document.createElement("dt");
	dt1.innerHTML("Nafn");
	dd1 = document.createElement("dd");
	dd1.innerHTML(name);
	dt2 = document.createElement("dt");
	dt2.innerHTML("kennitala");
		if(active == 1) {
		
	}
}


document.getElementById('takki').addEventListener('click', function(event) {
	event.preventDefault();
	while (companies.firstChild) {
	companies.removeChild(companies.firstChild);
	}
	var inputvalue = document.getElementById('input').value;
	if(inputvalue.trim() == '') {
		emptystring();
	}
	else {
	let API_URL = 'https://apis.is/company?name=';
	API_URL += inputvalue;
	loading();
	fetch(API_URL)
	.then(result => {
	if (!result.ok) {
		throw new Error('Non 200 status');
	}
	return result.json();
	})
	.then(data => {
	//var jason = window.localStorage.setItem('data', data);
	console.log(data.results);
	//??
	for(let i = 0; i < data.results.length; i++){
	const{name, sn, active, address} = data.results[i];
	makeElement(name,sn,active,address);
	}

	})
	.then(() => companies.removeChild(companies.firstChild)) //taka loading gif og texta út
	.catch(error => console.error(error));
	}
	
	
}, false);
 

document.addEventListener('DOMContentLoaded', () => {
	event.preventDefault();
});
