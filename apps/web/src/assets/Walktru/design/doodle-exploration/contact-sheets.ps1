Add-Type -AssemblyName System.Drawing
$sourceRoot = Join-Path $PSScriptRoot '../source-images'
foreach ($folder in @('doodles','illustration','visual','mcp-claude','inspo','info')) {
  $files = @(Get-ChildItem -LiteralPath (Join-Path $sourceRoot $folder) -File | Sort-Object Name)
  $rows = [Math]::Ceiling($files.Count / 5)
  $canvas = New-Object System.Drawing.Bitmap(1250, ($rows * 225))
  $graphics = [System.Drawing.Graphics]::FromImage($canvas)
  $graphics.Clear([System.Drawing.Color]::White)
  $font = New-Object System.Drawing.Font('Arial', 10)
  for ($i = 0; $i -lt $files.Count; $i++) {
    $img = [System.Drawing.Image]::FromFile($files[$i].FullName)
    $scale = [Math]::Min(230 / $img.Width, 190 / $img.Height)
    $w = [int]($img.Width * $scale); $h = [int]($img.Height * $scale)
    $x = ($i % 5) * 250; $y = [Math]::Floor($i / 5) * 225
    $graphics.DrawImage($img, [int]($x + (250 - $w) / 2), [int]$y, $w, $h)
    $graphics.DrawString("$i $($files[$i].Name.Substring(0,8))", $font, [System.Drawing.Brushes]::Black, [float]($x + 10), [float]($y + 198))
    $img.Dispose()
  }
  $canvas.Save((Join-Path $PSScriptRoot "$folder-sheet.jpg"), [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $graphics.Dispose(); $canvas.Dispose(); $font.Dispose()
  Write-Output "$folder : $($files.Count) images"
}
