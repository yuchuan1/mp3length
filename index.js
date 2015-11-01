'use strict';
var spawnSync = require('child_process').spawnSync,
  fs = require('fs'),
  path = require('path'),
  moment = require('moment');
/*
var getMp3Length = spawnSync('cscript', ['/nologo', 'mp3length.vbs']),
  dur = moment.duration(getMp3Length.stdout.toString());
console.log(dur.asSeconds());
console.log('Is a duration? ' + moment.isDuration(dur));
console.log(path.parse('d:/work/mp3length/tests/test.mp3'));

      for mac use afinfo
      http://osxdaily.com/2010/10/19/get-mp3-file-info-on-mac/
*/

module.exports = function mp3Length(mp3file, callback) {
  // make sure the file exists
  mp3file = path.resolve(mp3file);
  fs.stat(mp3file, function (err, stats) {
    if (err) {
      callback(err);
    }
    else if (!stats.isFile()) {
      var error = new Error();
      error.message = 'The entry ' + mp3file + 'is not a file!';
      callback(error);
    }
    else {
      var mp3Path = path.parse(mp3file);
      console.log(mp3Path);
      console.log('mp3Path.dir: ' + mp3Path.dir);
      console.log('mp3Path.base: ' + mp3Path.base);
      var getMp3Length = spawnSync('cscript', ['/nologo', 'lib/mp3length.vbs', mp3Path.dir, mp3Path.base]),
        result = getMp3Length.stdout.toString(),
        mp3Duration = moment.duration(result);
      callback(null, mp3Duration.asSeconds());
    }
  });

}