#!/usr/bin/env bash

tempFile="types.tar.gz"
typeFolder="hamibot-types"

if [ ! -f ${typeFolder} ]; then
    mkdir -p ${typeFolder}
fi

echo "Checking update for types..."

# 获取最新标签名
latestVersion=$(
    curl -s "https://api.github.com/repos/batu1579/hamibot-types/releases/latest" |
        grep '"tag_name":' |
        sed -E 's/.*"(.*?)".*/\1/'
)

versionFile="${typeFolder}/version.txt"

# 检查版本
if [ -f $versionFile ]; then
    currentVersion=$(cat $versionFile)
    echo ""
    echo "current version: ${currentVersion}"
    echo "latest version: ${latestVersion}"
    echo ""
    if [[ "${latestVersion}" == "${currentVersion}" ]]; then
        echo "The latest version is being used"
        exit
    fi
else
    echo "latest version: ${latestVersion}"
    echo ""
    touch $versionFile
fi

echo "Donwloading update..."
echo ""

curl -Ls -o  $tempFile "https://github.com/batu1579/hamibot-types/releases/download/${latestVersion}/hamibot-types.tar.gz"

tar -zxf $tempFile -C $typeFolder

rm $tempFile

echo $latestVersion > $versionFile
echo "Done !"
