#!/usr/bin/env node

var argv = require('yargs').argv

var jawnPath = argv.jawn
var feedId = argv.feed
var dbPath = argv.db

console.log(`You are running the database tracker with Jawn ${jawnPath}, feed ${feedId} and db ${dbPath}`)
