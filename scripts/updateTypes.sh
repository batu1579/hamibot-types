#!/usr/bin/env bash

tempFile="types.tar.gz"

typeFolder="hamibot-types"

tarUrl=$(
    curl -s "https://api.github.com/repos/batu1579/hamibot-types/releases/latest" |
        grep '"tarball_url":' |
        sed -E 's/.*"(.*?)".*/\1/'
)

echo "Donwload types from: " $tarUrl

curl -L -o $tempFile $tarUrl

if [ ! -f ${typeFolder} ]; then
    mkdir -p ${typeFolder}
fi

tar -zxvf $tempFile -C $typeFolder --strip-components 1

rm $tempFile
