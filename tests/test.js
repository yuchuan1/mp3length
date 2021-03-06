'use strict'
var assert = require('assert');
var mp3Length = require('../index.js');

describe('mp3Length()', function () {

  it('should return a correct length for test.mp3', function (done) {
    mp3Length('./tests/test.mp3', function (err, length) {
      assert.equal(err, null);
      assert.equal(length, 12);
      done();
    });
  });

  it('should return a correct length for mp3 file with a non-English file name', function (done) {
    mp3Length('./tests/測試.mp3', function (err, length) {
      assert.equal(err, null);
      assert.equal(length, 12);
      done();
    });
  });

  it('should return an error when the mp3 file specified does not exist', function (done) {
    mp3Length('./tests/1.mp3', function (err, length) {
      assert.notEqual(err, null);
      done();
    });
  });

  it('should return an error when the mp3 file is not a file', function (done) {
    mp3Length('./tests/testFolder', function (err, length) {
      assert.notEqual(err, null);
      done();
    });
  });

});