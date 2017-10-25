import {pagedData, showData} from './functions.js'; 
require("./index.css");
// No need for sizzle. 
const container = document.getElementById( 'root' );
// Native API for processing query strings
const urlParams = new URLSearchParams(window.location.search);
let page = urlParams.has('p') ? urlParams.get('p') : 0;
const dataStore = [];

container.innerHTML =  '<h1>...working</h1>';

window.addEventListener( 'click', e => { 
	if ( e.target.id === 'nextPage' ) {
		page++;
	} 
	else if ( e.target.id === 'prevPage' ) {
		page--;
	} 

	if ( e.target.parentElement.className === 'nav-links' ) {
		e.preventDefault();
		showData(pagedData( dataStore, page ), dataStore, page, container )
	}
} );

fetch( '/data.json').then( response => {
	if ( response.ok ) {
		return response.json();
	}
	throw new Error( response );
}).then( data => {
	dataStore.push.apply(dataStore, data );
	showData( pagedData( data, page ), dataStore, page, container );
}).catch( ex => {
	console.log( 'exception', ex );
})
