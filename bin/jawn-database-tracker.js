#!/usr/bin/env node

var argv = require('yargs').argv
var path = require('path')
var Jawn = require('jawn')

var jawnPath = argv.jawn
var feedId = argv.feed
var dbPath = argv.db

var DatabaseTracker = require('./databaseTracker.js')
var dbTracker = DatabaseTracker(dbPath)

if (argv._[0] === 'commit' && path.extname(jawnPath) === '.jawn') {
    // Get data from Jawn instance
    var jawn = retrieveJawnData(jawnPath)
    
    dbTracker.getChanges(Date.now(), function (changes) {
         jawn.importRowsKv(changes, feedId)
    })
   
}

function retrieveJawnData (jawnPath) {
    return new Jawn({db: jawnPath})
}

console.log(`You are running the database tracker with Jawn ${jawnPath}, feed ${feedId} and db ${dbPath}`)
