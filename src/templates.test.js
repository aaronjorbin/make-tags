import {page} from './templates';
import {html, postJS} from './template-data';

expect.extend({
  toEqualIgnoringWhitespace(received, argument) {
	const removeWhitespace = ( str ) => str.split(/\r?\n/).map( l => l.trim() );	
    const pass = ( removeWhitespace(received ).join('') === removeWhitespace( argument ).join('') );
    if (pass) {
      return {
        message: () => (
          `expected two strings to not be equal irregardless of whitespace between lines`
        ),
        pass: true,
      };
    } else {
      return {
        message: () => (`expected two strings to be equal irregardless of whitespace between lines`),
        pass: false,
      };
    }
  },
});


test( 'html', () => {
	expect( html ).toBeTruthy();
}); 

test( 'page', () => {
	const base = html; 
	const jstemplate = page( postJS );
	expect( base ).toEqualIgnoringWhitespace( jstemplate );

}); 
