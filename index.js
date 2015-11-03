'use strict';
var spawnSync = require('child_process').spawnSync,
  fs = require('fs'),
  path = require('path'),
  moment = require('moment');

module.exports = function mp3Length(mp3file, callback) {
  // make sure the file exists
  mp3file = path.resolve(mp3file);
  fs.stat(mp3file, function (err, stats) {
    if (err) {
      callback(err);
    } else if (!stats.isFile()) {
      var error = new Error();
      error.message = 'The entry ' + mp3file + 'is not a file!';
      callback(error);
    } else {
      var mp3Path = path.parse(mp3file);
      if (process.platform === 'win32') {
        var getMp3Length = spawnSync('cscript', ['/nologo', 'lib/mp3length.vbs', mp3Path.dir, mp3Path.base]),
          result = getMp3Length.stdout.toString(),
          mp3Duration = moment.duration(result);
        callback(null, mp3Duration.asSeconds());
      } else if (process.platform === 'darwin') {
        var shellCommand = 'afinfo ' + mp3Path.dir + '/' + mp3Path.base + ' |grep \'estimated duration:\'',
          getMp3Length = spawnSync('afinfo', [mp3Path.dir + '/' + mp3Path.base]);
        var results = getMp3Length.stdout.toString().split('\n'),
          result = null;
        for (var i = 0; i < results.length; i++) {
          if (results[i].includes('estimated')) {
            result = results[i].replace('estimated duration', '').replace(' sec', '').replace(':', '').trim();
          }
        }
        getMp3Length = Math.round(parseFloat(result));
        callback(null, getMp3Length);
      }
    }
  });

}