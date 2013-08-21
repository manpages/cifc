// nrepl.js — not a repl for interactive fiction
repl = require("repl");

console.log("Starting NREPL — Not a REPL for working with interactive fiction games...");

function main() {
  options = { useGlobal: true
             ,eval:      function(cmd, context, filename, callback) {callback(null, my_eval(cmd));}
             ,prompt:    'cifc> ' };
  repl.start(options);
}

function my_eval(cmd) {
  return parse(cmd) || try_eval(cmd);
}

function parse(cmd) {
  console.log('Parsing ' + cmd + '...');
  return false;
}

function try_eval(cmd) {
  try {
    return eval(cmd);
  } catch(e) {
    return e;
  }
}

main();
