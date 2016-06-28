const test = require('tape')
const path = require('path')
const Jawn = require('jawn')
// const spawn = require('tape-spawn')
const pathToTracker = 'node ' + path.resolve(__dirname + '/../bin/jawn-database-tracker.js')

const exec = require('child_process').exec;

test('commit accepts --jawn, --feed and --db args', function (t) {
  // var st = spawn(t, 'jawn-database-tracker commit --jawn /path/to/jawn --feed XXX --db /path/to/db')
  const command = pathToTracker+' commit --jawn /path/to/jawn --feed XXX --db /path/to/db'
  console.log("Running `"+command+"`")
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    t.same(stdout, "You are running the database tracker with Jawn /path/to/jawn, feed XXX and db /path/to/db\n")
    console.log(`stderr: ${stderr}`);
    t.end()
  });
})

test('commit a change to jawn instance', function (t) {
  const command = pathToTracker+' commit --jawn data/jawn/data.jawn --feed 1 --db data/sqlite/testFile.sqlite'
  
  var jawn = freshJawn()
  //Make an update to sglite database
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`)
    // Check to see if changes match test case
  })
})

function freshJawn () {
  return new Jawn()
}
