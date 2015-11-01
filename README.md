# mp3length

[![Join the chat at https://gitter.im/yuchuan1/mp3length](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/yuchuan1/mp3length?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
Get the length of mp3 files utilizing OS built in functions

	Usage:
	
	var mp3Length = require('mp3Length');
	mp3Length('test.mp3', function (err, length) {
		console.log('The estimated length test.mp3 is ' + length + ' secs');
	})