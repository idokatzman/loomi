# Copies template.html -> index.html. Historically this also inlined the
# product photos as base64 so the site shipped as one self-contained file;
# that stopped scaling once the doll count grew past a handful (every photo
# on every page load, no browser caching), so template.html now references
# real files in images/ directly and this step is just a straight copy.
#
# (loomi-web.html — the stripped-wrapper file for Claude Artifact publishing —
# is no longer generated here: that route needs a fully self-contained page
# with no external asset requests, which external image paths would break.
# GitHub Pages is the live site now; see README.)
$ErrorActionPreference = 'Stop'
$root = "C:\Users\win 10\Desktop\loomi"

$html = [IO.File]::ReadAllText("$root\template.html")

if ($html -match '\{\{[A-Z0-9_]+\}\}') {
  Write-Error "unreplaced placeholders found (should not exist anymore): $($Matches[0])"
  exit 1
}

[IO.File]::WriteAllText("$root\index.html", $html, (New-Object System.Text.UTF8Encoding($false)))

"built index.html: {0} KB" -f [math]::Round((Get-Item "$root\index.html").Length/1KB)
