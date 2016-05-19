var test = require('tape')
var fs = require('fs')
var DatabaseTracker = require('../bin/databaseTracker')
var memdb = require('memdb')
var sqlite3 = require('sqlite3').verbose()

test('retrieve changes', function (t) {
  var file = 'testFile.sqlite'
  setUpDatabase(file).then(function () {
    var dbTracker = new DatabaseTracker(file)
    var date = new Date(2016, 4, 13)
    dbTracker.getChanges(date, function (changes) {
      t.same(changes.GeoData.length, 1, "only returns changes since date")
      t.same(changes.GeoData[0].data, 'Geo Data 1', "returns the correct data")
      t.end()
    })
  })
})

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
