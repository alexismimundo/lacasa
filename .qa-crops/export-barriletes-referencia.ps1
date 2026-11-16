$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Drawing
$root='C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo'
$assets=Join-Path $root 'dist\assets\barrilete'
$scale=6
$bitmap=New-Object Drawing.Bitmap (921*$scale),(234*$scale),([Drawing.Imaging.PixelFormat]::Format32bppArgb)
$bitmap.SetResolution(300,300)
$g=[Drawing.Graphics]::FromImage($bitmap)
$g.Clear([Drawing.Color]::Transparent)
$g.SmoothingMode=[Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode=[Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode=[Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality=[Drawing.Drawing2D.CompositingQuality]::HighQuality
$g.ScaleTransform($scale,$scale)
# Coordinates are measured against the supplied 921 x 234 reference.
$designs=@(
 @{name='volador-azul-rombo';tail='cola-negro';x=102;y=20;w=66;h=84;angle=0;label='AFINES';lx=140;ly=62},
 @{name='volador-azul-rombo';tail='cola-azul';x=256;y=100;w=21;h=29;angle=0;label='TEASER';lx=278;ly=90},
 @{name='volador-usuario';tail='cola-rosa';x=417;y=29;w=76;h=94;angle=0;label='WEB';lx=456;ly=34},
 @{name='volador-negro';tail='cola-rosa';x=575;y=41;w=45;h=24;angle=0;label='EVENTO';lx=608;ly=50},
 @{name='volador-azul-rombo';tail='cola-rosa';x=687;y=112;w=27;h=32;angle=-12;label='ÁLBUM';lx=713;ly=95},
 @{name='volador-usuario';tail='cola-rosa';x=812;y=114;w=16;h=20;angle=0;label='ARCHIVO';lx=847;ly=109}
)
$pen=New-Object Drawing.Pen ([Drawing.Color]::FromArgb(72,108,113,124)),0.55
$curves=@(
 @(130,91,178,110,191,165,177,210),
 @(263,137,305,156,278,176,282,194),
 @(421,154,408,174,318,174,274,202),
 @(580,88,579,137,530,155,486,181),
 @(696,153,653,163,609,165,568,234),
 @(815,141,796,170,730,192,683,232)
)
foreach($c in $curves){$g.DrawBezier($pen,[single]$c[0],[single]$c[1],[single]$c[2],[single]$c[3],[single]$c[4],[single]$c[5],[single]$c[6],[single]$c[7])}
# Additional loose thread seen underneath the large left-hand kite.
$g.DrawBezier($pen,177,210,158,224,167,229,164,234)
$g.DrawBezier($pen,177,210,222,181,270,182,315,160)
foreach($d in $designs){
 $state=$g.Save();$g.TranslateTransform([single]$d.x,[single]$d.y);$g.RotateTransform([single]$d.angle)
 $tail=[Drawing.Image]::FromFile((Join-Path $assets ($d.tail+'.png')))
 $image=[Drawing.Image]::FromFile((Join-Path $assets ($d.name+'.png')))
 $tw=[single]($d.w*.60);$th=[single]($tw*$tail.Height/$tail.Width)
 $g.DrawImage($tail,[single](-$d.w*.03),[single]($d.h*.90),$tw,$th)
 $g.DrawImage($image,[single](-$d.w/2),[single]0,[single]$d.w,[single]$d.h)
 $g.Restore($state);$tail.Dispose();$image.Dispose()
}
$plain=Join-Path $root 'barriletes-referencia-5526x1404-transparente.png'
$bitmap.Save($plain,[Drawing.Imaging.ImageFormat]::Png)
$font=New-Object Drawing.Font 'Consolas',6.2,([Drawing.FontStyle]::Regular),([Drawing.GraphicsUnit]::Pixel)
$brush=New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(210,89,91,96))
foreach($d in $designs){$g.DrawString(('/ '+$d.label),$font,$brush,[single]$d.lx,[single]$d.ly)}
$labelled=Join-Path $root 'barriletes-referencia-con-rotulos-5526x1404-transparente.png'
$bitmap.Save($labelled,[Drawing.Imaging.ImageFormat]::Png)
# Validate the exported file, not just the in-memory drawing.
$check=[Drawing.Bitmap]::FromFile($plain)
$transparent=0;$visible=0
for($y=0;$y -lt $check.Height;$y+=7){for($x=0;$x -lt $check.Width;$x+=7){if($check.GetPixel($x,$y).A -eq 0){$transparent++}else{$visible++}}}
if($check.Width -ne 5526 -or $check.Height -ne 1404 -or $transparent -eq 0 -or $visible -eq 0){throw 'PNG validation failed'}
$report=@{status='PASS';width=$check.Width;height=$check.Height;dpi=$check.HorizontalResolution;transparentSamples=$transparent;artSamples=$visible;files=@($plain,$labelled);kites=$designs.Count}
$report|ConvertTo-Json|Set-Content (Join-Path $root '.qa-crops\barriletes-referencia-validation.json') -Encoding UTF8
$check.Dispose();$g.Dispose();$bitmap.Dispose();$pen.Dispose();$font.Dispose();$brush.Dispose()