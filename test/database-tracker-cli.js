const test = require('tape')
const path = require('path')
// const spawn = require('tape-spawn')
const pathToTracker = path.resolve(__dirname + '/../bin/jawn-database-tracker.js')

test('commit accepts --jawn, --feed and --db args', function (t) {
  // var st = spawn(t, 'jawn-database-tracker commit --jawn /path/to/jawn --feed XXX --db /path/to/db')
  const exec = require('child_process').exec;
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
