const WPAPI = require( 'wpapi' );
const Promise = require( 'bluebird' );
const _ = require( 'lodash' );
const fs = require( 'fs' );
const teams = [
  'core',
  'design',
  'mobile',
  'accessibility',
  'polyglots',
  'support',
  'themes',
  'docs',
  'community',
  'plugins',
  'meta',
  'training',
  'test',
  'tv',
  'marketing',
  'cli',
  'hosting'
]

const getAll = ( request ) => {
  return request.then(function( response ) {
    if ( ! response._paging || ! response._paging.next ) {
      return response;
    }
    // Request the next page and return both responses as one collection
    return Promise.all([
      response,
      getAll( response._paging.next )
    ]).then(function( responses ) {
      return _.flatten( responses );
    });
  });
}

const processData = responses => {
	const data = {};
	_.each( responses, ( response ) => {
		let team = false;
		_.each( response, ( tag ) => {
			if ( false === team ) {
				team = tag.link.split('/')[3]
			}
			if ( 0 >= tag.count ) {
				return;
			}
			if ( false === tag.name in data ) {
				data[tag.name] = { count: 0, siteCount: 0, sites: {}, slug: tag.slug, name: tag.name }; 
			}
			if ( false === team in data[tag.name].sites ) {
				data[tag.name].sites[team] = tag.count;
				data[tag.name].siteCount += 1;
			}
			data[tag.name].count += tag.count;
		})
	})
	return data;
}

const requests = teams.map( t => {
	const wp = new WPAPI({ endpoint: `https://make.wordpress.org/${t}/wp-json/` });
	console.log( `Request kicked off for https://make.wordpress.org/${t}/wp-json/` );
	return getAll( wp.tags() ); 
});

Promise.all( requests ).then( responses => {
	const tagData = processData( responses );
	const sortedData = _.orderBy( tagData, ['count', 'siteCount' ], ['desc', 'desc'] );
	fs.writeFileSync( 'public/data.json', JSON.stringify( sortedData ), 'utf8' );
});
