$tempFile = "types.tar.gz"
$typeFolder = "hamibot-types"

if (-not (Test-Path -Path $typeFolder)) {
    $null = New-Item -path $typeFolder -type directory
}

echo "Checking update for types..."
echo ""

# 获取最新标签名
$response = Invoke-WebRequest -Uri "https://dl.hamibot.com/gh/batu1579/hamibot-types/LATEST"
$latestVersion = ConvertFrom-Json $response | Select-Object -expand "tag_name"

echo $latestVersion

$versionFile = "${typeFolder}/version.txt"

if (Test-Path -Path $versionFile) {
    $currentVersion = $(Get-Content $versionFile)
    echo "current version: ${currentVersion}"
    echo "latest version: ${latestVersion}"
    echo ""
    if ($latestVersion -eq $currentVersion) {
        echo "The latest version is being used"
        exit
    }
} else {
    echo "latest version: ${latestVersion}"
    echo ""
    $null = New-Item $versionFile
}

echo "Donwloading update..."
echo ""

curl -Ls -o  $tempFile "https://dl.hamibot.com/gh/batu1579/hamibot-types/hamibot-types.tar.gz"

tar -zxf $tempFile -C $typeFolder

Remove-Item $tempFile

echo $latestVersion > $versionFile
echo "Done !"

# tar -zxvf $tempFile -C $typeFolder --strip-components 1
