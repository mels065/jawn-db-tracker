var test = require('tape')
var fs = require('fs')
var Jawn = require('../')
var memdb = require('memdb')
var sqlite3 = require('sqlite3').verbose()

test('retrieve changes', function (t) {
  var jawn = freshJawn()
  var file = 'testFile.db'
  setUpDatabase(file).then(function () {
    var dbTracker = jawn.createDatabaseTracker(file)
    var date = new Date(2016, 4, 13)
    dbTracker.getChanges(date, function (changes) {
      console.log(changes)
      t.end()
    })
  })
})

function freshJawn () {
  return new Jawn({db: memdb()})
}

function setUpDatabase (file) {
  return new Promise(function (resolve, reject) {
    var db = new sqlite3.Database(file)
    db.serialize(function () {
      db.run('DROP TABLE IF EXISTS GeoData')
      db.run('CREATE TABLE IF NOT EXISTS GeoData (data TEXT, lastUpdate TEXT)', [], function (err, rows) {
        if (err) {
          return
        }
        var stmt = db.prepare('INSERT INTO GeoData VALUES (?, ?)')
        stmt.run(['Geo Data 1', new Date(2016, 4, 14).toString()])
        stmt.run(['Geo Data 2', new Date(2016, 4, 12).toString()])
        stmt.finalize()

        resolve()
      })
    })
  })
}
