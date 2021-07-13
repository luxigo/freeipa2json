# freeipa2json
converts freeipa "ipa user-find" output to json

## license
AGPL-3.0 or later

## how to
export users with:
```
ipa user-find --all > ipa.txt
```

if the output is truncated adjust the limit with the command below and retry:
```
ipa config-mod --searchrecordslimit=######
```

if not yet installed, install nodejs (with nvm I suggest), eg:
```
wget https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
nvm install --lts
```

install ipa2json:
```
npm install -g ipa2json
```

convert with:
```
ipa2json ipa.txt
```

alternatively you can convert the json to csv with:
```
npm i -g json2csv
npm i -g equalizejson
ipa2json ipa.txt | equalizejson | json2csv
```

