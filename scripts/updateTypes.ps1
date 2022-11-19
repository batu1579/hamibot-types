$tempFile = "types.tar.gz"

$typeFolder = "hamibot-types"

$releasesInfo = Invoke-WebRequest -Uri "https://api.github.com/repos/batu1579/hamibot-types/releases/latest"

$releasesInfo.content -match '"tarball_url":"(?<tarUrl>.*?)"'

curl -L --ssl-no-revoke -o $tempFile $Matches.tarUrl

if (-not (Test-Path -Path $typeFolder)) {
    mkdir $typeFolder
}

tar -zxvf $tempFile -C $typeFolder --strip-components 1

Remove-Item $tempFile
