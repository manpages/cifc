// nrepl.js — not a repl for interactive fiction
repl = require('repl');
fs = require('fs');
game = require_game(process.argv[2]);

function main() {
  console.log(game.main());
  options = { useGlobal: true
             ,eval:      function(cmd, context, filename, callback) {callback(null, my_eval(cmd));}
             ,prompt:    'cifc> ' };
  repl.start(options);
}

function my_eval(cmd) {
  return parse(cmd) || try_eval(cmd);
}

function parse(cmd) {
  cmd = cmd.substring(1, cmd.length-2).
        replace(/\s+/g, ' ').
        split(' ');
  try {
    cmd = 'game.' + cmd.shift() + '(' + 
            cmd.map(function(x) { return '"' + x.replace(/"/g, '\\"') + '"'; }) + 
          ')';
    console.log(eval(cmd));
    return {ok: cmd};
  } catch(e) {
    return false;
  }
}

function try_eval(cmd) {
  try {
    return eval(cmd);
  } catch(e) {
    return e.toString();
  }
}

function require_game(filename) {
  try {
    return require(filename);
  } catch (e) {
    console.log('No game file supplied\nUsage: node nrepl.js game_file');
  }
}

if (game) main();
