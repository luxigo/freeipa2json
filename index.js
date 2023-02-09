#!/usr/bin/env node
/*
    Copyright (C) 2021-2023 luc.deschenaux@freesurf.ch

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
    */

const fs=require('fs');
const readline=require('readline');

async function parse(filter){
    const rl = readline.createInterface({
      input: stream,
      crlfDelay: Infinity
    });

    var list=[];
    var user={};
    var count=0;

    for await (const line of rl) {
      if (line.length) {
        var m=line.match(/^  ([^:]+): (.*)/);
        if (m) {
          var key=m[1].trim().replace(/ /g,'_').toLowerCase();
          user[key]=m[2];
        } else {
          console.error(`unexpected format: ${count} ${line}`);
        }
      } else {
        if (!filter || (filter && filter(user))) {
          list.push(user);
        } 
        user={};
      }
      ++count;
    }
    if (!filter || (filter && filter(user))) {
      list.push(user);
    } 
    return list;
}

function main(){
  const minimist = require('minimist');
  const options= {
    string: ['filter'],
    boolean: ['help','usernames','disabled','active'],
    alias: {
      h: 'help',
      f: 'filter',
      u: 'usernames',
      d: 'disabled',
      a: 'active'
    }
  }

  var args=minimist(process.argv.slice(2),options);
  var stream=process.stdin;
  var filter;

  if (args.help) {
    help();
  }

  if (args.disabled) {
    if (args.active||args.filter) throw "mutually exclusive: filter, active, disabled"
    args.filter='return user.account_disabled=="True"';
  }
  if (args.active) {
    if (args.disabled||args.filter) throw "mutually exclusive: filter, active, disabled"
    args.filter='return user.account_disabled=="False"';
  }
  if (args.filter) {
    filter=Function('user',args.filter);
  }

  if (args._) {
    stream=fs.createReadStream(args._[0]);
  }

  return parse(filter)
    .then((list) => {
      if (args.usernames) {
        list.forEach(function(user){
          console.log(user.user_login);
        })
      } else {
        console.log(JSON.stringify(list,false,4));
      }
    });
}

function help() {
  var path = require('path');
  console.log(`usage: ipa user-find --all | ipa2json [<input-file>] [-h|--help] [-u|--usernames] [-a|--active] [-d|--disabled] [-f|--filter 'return user.account_disabled=="False"']`);
  process.exit(1);
}

if (require.main===module) {
    main();
} else {
    module.exports=parse;
}

