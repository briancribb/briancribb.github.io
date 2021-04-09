

let STRPG = (function(){
	console.log('Things');
	function myFunction(stuff) {
		console.log('myFunction() - ', stuff);
		return stuff;
	}

	return {myFunction};
}());

export default STRPG
