import {pagedData, navLinks, pageCount} from './functions.js'; 

describe( 'pagedData', () => {
	const a = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40];
	test('pagedData returns the first 20 by default', () => {
		expect( pagedData(a)).toEqual([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]);
	});
	test('pagedData returns the second 20 for page 2', () => {
		expect( pagedData(a, 1)).toEqual([20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]);
	});
	test('pagedData returns the third 10 for page 3 with 10', () => {
		expect( pagedData(a, 2, 10)).toEqual([20,21,22,23,24,25,26,27,28,29]);
	});
});

describe( 'navLinks', () => {
	test( 'if there are no pages, an empty string is returned', () => {
		expect( navLinks(0,1) ).toEqual( '' );
	});
	test( 'on the first page, only a next is returned', () => {
		expect( navLinks(0,2) ).toEqual( `<div class='nav-links'><a href='/?p=1' id='nextPage'>Next</a></div><!-- /.nav-links -->` ); 
	});
	test( 'on the last page, only a previus is returned', () => {
		expect( navLinks(1,2) ).toEqual( `<div class='nav-links'><a href='/?p=0' id='prevPage'>Previus</a></div><!-- /.nav-links -->` ); 

	});
	test( 'on intermediat pages, but a previus and a next is returned', () => {
		expect( navLinks(1,3) ).toEqual( `<div class='nav-links'><a href='/?p=0' id='prevPage'>Previus</a><a href='/?p=2' id='nextPage'>Next</a></div><!-- /.nav-links -->` ); 

	});
	test( 'strings should be converted to ints', () => {
		expect( navLinks('1','3') ).toEqual( `<div class='nav-links'><a href='/?p=0' id='prevPage'>Previus</a><a href='/?p=2' id='nextPage'>Next</a></div><!-- /.nav-links -->` ); 
		expect( navLinks('0','2') ).toEqual( `<div class='nav-links'><a href='/?p=1' id='nextPage'>Next</a></div><!-- /.nav-links -->` ); 
	});
});

describe( 'pageCount', () => {
	test( '20 items are 1 page', () => {
		expect( pageCount( new Array( 20 ) ) ).toEqual( 1 );
	});
	test( '19 items are 1 page', () => {
		expect( pageCount( new Array( 19 ) ) ).toEqual( 1 );
	});
	test( '21 items are 2 pages', () => {
		expect( pageCount( new Array( 21 ) ) ).toEqual( 2 );
	});
	test( '20 items are 2 pages if page count is 15', () => {
		expect( pageCount( new Array( 20 ), 15 ) ).toEqual( 2 );
	});
});
