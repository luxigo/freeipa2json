#!/bin/env node
/*
    Copyright (C) 2021 luc.deschenaux@freesurf.ch

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

async function main(){
  var stream;
  if (process.argv.length > 2) {
    stream=fs.createReadStream(process.argv[2])
  } else {
    stream=process.stdin;
  }
  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
  });
  var list=[];
  var user={};
  for await (const line of rl) {
    if (line.length) {
      var m=line.match(/^  ([^:]+): (.*)/);
      if (m) {
        user[m[1]]=m[2];
      }
    } else {
      list.push(user);
      user={};
    }
  }
  list.push(user);
  console.log(JSON.stringify(list,false,4))
}

main()

