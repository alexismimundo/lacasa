Add-Type -AssemblyName System.Drawing
$root='C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo'
$out="$root\dist\assets\casas-comunidad\recortes"
[IO.Directory]::CreateDirectory($out) | Out-Null
$sets=@(
 @{sheet=1;boxes=@(@(20,40,160,95),@(191,43,113,94),@(321,39,108,98),@(459,40,125,96),@(628,35,191,101),@(21,141,121,93),@(152,146,154,88),@(314,147,124,89),@(468,135,114,102),@(593,147,192,88),@(24,245,241,103),@(278,229,121,120),@(407,247,181,102),@(598,229,62,121),@(674,248,118,101),@(28,357,174,96),@(208,354,113,98),@(333,345,139,108),@(481,367,172,87),@(670,375,103,77),@(23,451,144,109),@(173,460,130,96),@(310,454,109,105),@(432,461,156,98),@(602,449,124,116),@(727,468,164,94))},
 @{sheet=2;boxes=@(@(38,42,166,143),@(224,28,239,159),@(485,37,234,149),@(732,26,118,160),@(34,201,209,132),@(249,205,325,132),@(595,203,247,107),@(32,343,174,157),@(227,351,242,97),@(479,348,88,106),@(580,315,251,138),@(39,518,185,133),@(242,463,254,135),@(517,470,210,119),@(28,669,181,97),@(223,622,156,114),@(377,608,147,139),@(538,595,187,138))}
)
$i=0
foreach($set in $sets){
 $im=[Drawing.Bitmap]::FromFile("$root\dist\assets\casas-comunidad\casas-comunidad-$($set.sheet).png")
 $scale=$im.Width/900
 foreach($box in $set.boxes){
  $rect=New-Object Drawing.Rectangle([int]($box[0]*$scale),[int]($box[1]*$scale),[int]($box[2]*$scale),[int]($box[3]*$scale))
  $crop=$im.Clone($rect,[Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $i++;$crop.Save(("$out\casa-{0:D2}.png" -f $i),[Drawing.Imaging.ImageFormat]::Png);$crop.Dispose()
 }
 $im.Dispose()
}
"Recortadas $i casas. Originales intactos." | Set-Content -Encoding utf8 "$root\.qa-crops\community-crop-result.txt"