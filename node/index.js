var fs = require('fs');
var trim = require('./strApi');

fs.readFile('data.txt','utf8',function(err,str) {
	if(err) {
		console.log(err);
	}else {
		console.log(str)


		fs.writeFile('data.txt','haha',function(err) {
			console.log(err);
		});
	}
});

console.log(trim('hdd'))