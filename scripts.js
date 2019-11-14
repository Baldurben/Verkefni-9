/**Þurfti að runna ESlint með ($ npx eslint scripts.js) veit ekki hvort það sé bara 
   eitthvað sem ég var að gera vitlaust eða hvort það sé bara þannig*/

const companies = document.querySelector('.results'); //Auðveldar að vinna með elementið

/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */
document.getElementsByTagName('button')[0].addEventListener('click', function(event) { //Aðal function
	event.preventDefault();
	while (companies.firstChild) {
	companies.removeChild(companies.firstChild);
	}
	let inputvalue = document.getElementsByTagName('input')[0].value; 
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
	if(data.results.length == 0) {notfound();} 
	for(let i = 0; i < data.results.length; i++){ //Sendir niðurstöður annað til að allt sé ekki á sama stað
	const{name, sn, active, address} = data.results[i];
	makeElement(name,sn,active,address);
	}

	})
	.then(() => companies.removeChild(companies.firstChild)) //taka loading gif og texta út
	.catch(error => {
		companies.removeChild(companies.firstChild); //taka loading gif og texta út þótt að connectionið faili
		connectionfail();
		console.error(error);
	})
  }
}, false);
 
 
function emptystring() { //Ef input empty callar aðal function á þetta
	var villa = document.createElement("p");
	villa.innerHTML = "Fyrirtæki má ekki vera autt";
	companies.appendChild(villa);
}
function notfound() { //Ef ekkert fyrirtæki finnst með gefnu nafni er kallað á þetta
	let texti = document.createElement("p");
	texti.innerHTML = "Ekkert fyrirtæki fannst fyrir leitarstreng " + document.getElementsByTagName('input')[0].value; 
	companies.appendChild(texti);
}
function connectionfail() { //Ef villa kemur upp með tengingu eða apis.is
	let texti = document.createElement("p");
	texti.innerHTML = "Villa við að sækja gögn";
	companies.appendChild(texti);
}

function loading() { //Setur loading gif og viðeigandi texta meðan fetchað er gögn
	let gif = document.createElement("img");
	let texti = document.createElement("P");
	texti.innerHTML = "Loading...";
	texti.setAttribute("class", "loading")
	gif.setAttribute("src", "loading.gif");
	gif.setAttribute("class", "loading")
	texti.appendChild(gif);
	companies.appendChild(texti);
}

function makeElement(name,sn,active,address) { // Býr til öll element sem þarf og appendar 
	var div = document.createElement("div");
	if (active == 1) {div.setAttribute("class", "company company--active");}
	else {div.setAttribute("class", "company company--inactive");}
	var nafn = document.createElement("dt");
	nafn.innerHTML = "Nafn";
	var realnafn = document.createElement("dd");
	realnafn.innerHTML = name;
	var kennitala = document.createElement("dt");
	kennitala.innerHTML = "Kennitala";
	var realkennitala = document.createElement("dd");
	realkennitala.innerHTML = sn;
	var dl = document.createElement("dl");
	dl.appendChild(nafn);
	dl.appendChild(realnafn);
	dl.appendChild(kennitala);
	dl.appendChild(realkennitala);
		if(active == 1) {
		var adressa = document.createElement("dt");
		adressa.innerHTML = "Heimilisfang";
		var realadressa = document.createElement("dd");
		realadressa.innerHTML = address;
		dl.appendChild(adressa);
		dl.appendChild(realadressa);
	}	
	div.appendChild(dl);
	companies.appendChild(div);
} 
