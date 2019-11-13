const API_URL = 'https://apis.is/company?name=elko';


/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */
const program = (() => {
  function init(companies) {
	fetch(API_URL);
	.then(result => {
	if (!result.ok) {
		throw new Error('Non 200 status');
	}
	return result.json();
	})
	.then(data => console.log(data));
	.catch(error => console.error(error));
	})
	
	}

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  program.init(companies);
});
