# Builds index.html by injecting base64 images into template.html
$ErrorActionPreference = 'Stop'
$root = "C:\Users\win 10\Desktop\loomi"
$img  = "$root\images"

$map = @{
  'IMG_CAT'    = 'cat-main-sm.jpg'
  'IMG_RACOON' = 'raccoon-main-sm.jpg'
  'IMG_DOG'    = 'dog-main-sm.jpg'
  'IMG_BEAR'   = 'bear-main-sm.jpg'
  'IMG_FAMILY' = 'family-main-sm.jpg'
  'IMG_PAIR1'  = 'pairs-chairs-sm.jpg'
  'IMG_PAIR2'  = 'dog-bear-pair-sm.jpg'
}

$html = [IO.File]::ReadAllText("$root\template.html")
foreach($k in $map.Keys){
  $b64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes("$img\$($map[$k])"))
  $html = $html.Replace("{{$k}}", "data:image/jpeg;base64,$b64")
}
[IO.File]::WriteAllText("$root\index.html", $html, (New-Object System.Text.UTF8Encoding($false)))

# hosted variant (artifact) - strip document wrapper
$web = $html
foreach($t in @('<!DOCTYPE html>','<html lang="he" dir="rtl">','<head>','</head>','<body>','</body>','</html>')){ $web = $web.Replace($t,'') }
[IO.File]::WriteAllText("$root\loomi-web.html", $web, (New-Object System.Text.UTF8Encoding($false)))

"built index.html: {0} KB" -f [math]::Round((Get-Item "$root\index.html").Length/1KB)
