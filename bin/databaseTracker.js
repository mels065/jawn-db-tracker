 var sqlite3 = require('sqlite3').verbose()

 module.exports = DatabaseTracker

 function DatabaseTracker (dbfile) {
   this.db = new sqlite3.Database(dbfile)
 }

 DatabaseTracker.prototype.getAllTables = function (callback) {
   var query = "Select name FROM sqlite_master WHERE type = 'table'"
   var dbTracker = this
   this.db.serialize(function () {
     dbTracker.db.all(query, function (err, tables) {
       if (err) {
         throw new Error(err)
       }

       callback(tables)
     })
   })
 }

 DatabaseTracker.prototype.getChanges = function (date, callback) {
   var currentDb = this.db

   function findAllChanges (tables) {
     var changes = {}
     var tableNumber = tables.length
     currentDb.serialize(function () {
       tables.forEach(function (item, index) {
         var dformat = js_yyyy_mm_dd_hh_mm_ss(date)
         var sqlStatement = 'SELECT * FROM ' + item.name + ' WHERE lastUpdate > ' + '\'' + dformat + '\''
         // var sqlStatement = 'SELECT * FROM ' + item.name

         currentDb.all(sqlStatement, [], function (err, rows) {
           if (err) {
             console.log(err)
           }

           changes[item.name] = rows

           if (sizeObject(changes) === tableNumber) {
             callback(changes)
           }
         })
       })
     })
   }

   this.getAllTables(findAllChanges)
 }

 function sizeObject (obj) {
   var size = 0
   var key
   for (key in obj) {
     if (obj.hasOwnProperty(key)) {
       size++
     }
   }
   return size
 }

 function js_yyyy_mm_dd_hh_mm_ss (now) {
   var year = '' + now.getFullYear()
   var month = '' + (now.getMonth() + 1)
   if (month.length === 1) {
     month = '0' + month
   }

   var day = '' + now.getDate()
   if (day.length === 1) {
     day = '0' + day
   }
   var hour = '' + now.getHours()
   if (hour.length === 1) {
     hour = '0' + hour
   }
   var minute = '' + now.getMinutes()
   if (minute.length === 1) {
     minute = '0' + minute
   }

   var second = '' + now.getSeconds()
   if (second.length === 1) {
     second = '0' + second
   }

   return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
 }
