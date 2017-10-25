// slice an array into a paged chunk
const pagedData = ( data, page = 0, count = 20 ) => 
	data.slice( ( page * count ), ( count + page * count ) ); 

const navLinks = ( page, pages ) =>{ 
	const html = [];
	page = parseInt( page, 10 );
	pages = parseInt( pages, 10 );
	if ( pages > 1 ){
		html.push( `<div class='nav-links'>` );
		if ( page !== 0 ) {
			html.push( `<a href='/?p=${page -1}' id='prevPage'>Previus</a>` );
		}
		if ( (page+1) !== pages ){
			html.push( `<a href='/?p=${page + 1}' id='nextPage'>Next</a>` );
		}
		html.push( '</div><!-- /.nav-links -->' );
	}
	return html.join( '' );
}

const pageCount = ( data, count = 20 ) =>
	Math.ceil( data.length / count )	

const showData = ( data, dataStore, page, container ) => {	
	const html = data.map( d => {
		const sites = Object.entries( d.sites );	
		const siteList = sites.map(item =>`
				<li><a href="https://make.wordpress.org/${item[0]}/tag/${d.slug}">${item[0]}</a>: ${item[1]}</li>
			`.trim()).join('')
		return `
		<details>
			<summary>${d.name}</summary>
			<p>Count: ${d.count}</p>
			<p>Sites: <ul> ${siteList}</ul></p>
		</details>
	` }) 
	container.innerHTML = navLinks( page, pageCount( dataStore ) )  + '<div class="content">' + html.join( '' ) + '</div>';
	window.history.pushState( { 'page': page }, `Make Tags Browser: page ${page +1}`, `/?p=${page}` );
}

export { pagedData, navLinks, pageCount, showData }
