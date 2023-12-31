@echo off
setlocal enabledelayedexpansion

set "jsonFile=randomphotos.json"
set "folder=gallery"
set "urlPrefix=https://img.wotemo.com/randomphotos/gallery/"

rem Initialize JSON array
echo [ > "%jsonFile%"

set "firstFile=1"

rem Create an array to store shuffled filenames
set "fileList="
for %%f in ("%folder%\*.*") do (
    set "filename=%%~nxf"
    set "fileList[!random!]=!filename!"
)

rem Loop through shuffled filenames
for /f "tokens=2 delims==" %%a in ('set fileList[') do (
    set "filename=%%a"
    if !firstFile!==1 (
        set "firstFile=0"
    ) else (
        rem Add a comma before each object except the first one
        echo , >> "%jsonFile%"
    )
    rem Add each filename to the JSON array
    echo  { >> "%jsonFile%"
    echo    "url": "%urlPrefix%!filename!" >> "%jsonFile%"
    echo  } >> "%jsonFile%"
)

rem Close the JSON array
echo ] >> "%jsonFile%"

echo JSON file created: %cd%\%jsonFile%

endlocal
