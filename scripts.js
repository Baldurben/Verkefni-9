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
	var jason = window.localStorage.setItem('data', data);
	JSON.stringify(jason);
	console.log(jason);
	})
	.then(() => companies.removeChild(companies.firstChild))
	.catch(error => console.error(error));
	}
	
	
}, false);
 

document.addEventListener('DOMContentLoaded', () => {
	event.preventDefault();
});
