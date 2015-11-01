# mp3length
Get the length of mp3 files utilizing OS built in functions

	Usage:
	
	var mp3Length = require('mp3Length');
	mp3Length('test.mp3', function (err, length) {
		console.log('The estimated length test.mp3 is ' + length + ' secs');
	})