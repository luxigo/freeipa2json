# freeipa2json
Filter and converts freeipa "ipa user-find" output to json

## License
AGPL-3.0 or later

## How to
Export users with:
```
ipa user-find --all > ipa.txt
```

If the output is truncated adjust the limit with the command below and retry:
```
ipa config-mod --searchrecordslimit=######
```

If not yet installed, install nodejs (with nvm I suggest), eg:
```
wget https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
nvm install --lts
```

Install ipa2json:
```
npm install -g ipa2json
```

## As a command
Usage:
```
usage: ipa2json [<input-file>] [-h|--help] [-u|--usernames] [-a|--active] [-d|--disabled] [-f|--filter 'return user.account_disabled=="False"']
```

Convert with eg:
```
ipa2json ipa.txt
```

Alternatively you can convert the json to csv with:
```
npm i -g json2csv
npm i -g equalizejson
ipa2json ipa.txt | equalizejson | json2csv
```

## As a module:
```
const ipa2json=require('ipa2json');
ipa2json(var stream=process.stdin, var filter=((user) => {return true}))
.then((user_list) => {...})
```
... where "stream" is process.stdin by default or a filestream, and "filter" an optional filtering function.


