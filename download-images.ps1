# Image Download Script for Jekyll Migration
# Run this script with PowerShell to download all images from mvdm.io

# Create directories if they don't exist
New-Item -ItemType Directory -Force -Path "assets/images/posts"
New-Item -ItemType Directory -Force -Path "assets/images/projects"
New-Item -ItemType Directory -Force -Path "assets/images/products"

# Blog post images
$postImages = @{
    "effective-dotnet-web-development.jpeg" = "https://mvdm.io/content/images/size/w2000/2023/04/IMG_2838.jpeg"
    "watercooler.jpeg" = "https://mvdm.io/content/images/size/w2000/2023/04/watercooler.jpeg"
    "developers-not-introverts.jpg" = "https://mvdm.io/content/images/size/w2000/2023/04/pexels-olia-danilevich-4974914.jpg"
    "what-it-takes-to-lead.jpeg" = "https://mvdm.io/content/images/size/w2000/2023/04/what-it-takes-to-lead-software-development-teams-effectively.jpeg"
    "cloud-skyline.jpg" = "https://mvdm.io/content/images/size/w2000/2023/04/cloud-skyline.jpg"
    "impression.jpg" = "https://mvdm.io/content/images/size/w2000/2023/04/impression.jpg"
    "remote-coding.jpg" = "https://mvdm.io/content/images/size/w2000/2023/04/remote-coding.jpg"
    "bill-of-rights.jpg" = "https://mvdm.io/content/images/size/w2000/2023/04/bill-of-rights.jpg"
    "meeting-room.jpg" = "https://mvdm.io/content/images/size/w2000/2023/04/meeting-room.jpg"
    "remote-work.jpg" = "https://mvdm.io/content/images/size/w2000/2023/04/remote-work.jpg"
}

# Project images
$projectImages = @{
    "jewel-software.png" = "https://mvdm.io/content/images/size/w2000/2024/05/jewel_software.png"
    "ridder-hortos.png" = "https://mvdm.io/content/images/size/w2000/2023/04/Ridder-HortOS.png"
    "vdmeer-software.jpg" = "https://mvdm.io/content/images/size/w2000/2023/04/software.jpg"
    "psa-antwerp-quay.jpg" = "https://mvdm.io/content/images/size/w2000/2023/04/psa-antwerp-quay.jpg"
    "psa-sines-terminal.jpg" = "https://mvdm.io/content/images/size/w2000/2023/04/psa-sines-terminal.jpg"
    "psa-antwerp-terminal.jpg" = "https://mvdm.io/content/images/size/w2000/2023/04/psa-antwerp-terminal.jpg"
    "ships-in-harbor.jpg" = "https://mvdm.io/content/images/size/w2000/2023/04/ships-in-harbor.jpg"
    "24green.jpg" = "https://mvdm.io/content/images/size/w2000/2023/04/24green.jpg"
}

# Product images
$productImages = @{
    "commonplace.jpg" = "https://mvdm.io/content/images/size/w2000/2023/04/commonplace.jpg"
    "translation-tools.jpg" = "https://mvdm.io/content/images/size/w2000/2025/08/image-1-.jpg"
    "health-check.jpg" = "https://mvdm.io/content/images/size/w2000/2025/08/image-2-.jpg"
}

Write-Host "Downloading blog post images..."
foreach ($img in $postImages.GetEnumerator()) {
    $outPath = "assets/images/posts/$($img.Key)"
    Write-Host "  Downloading $($img.Key)..."
    try {
        Invoke-WebRequest -Uri $img.Value -OutFile $outPath -UseBasicParsing
        Write-Host "    OK" -ForegroundColor Green
    } catch {
        Write-Host "    FAILED: $_" -ForegroundColor Red
    }
}

Write-Host "Downloading project images..."
foreach ($img in $projectImages.GetEnumerator()) {
    $outPath = "assets/images/projects/$($img.Key)"
    Write-Host "  Downloading $($img.Key)..."
    try {
        Invoke-WebRequest -Uri $img.Value -OutFile $outPath -UseBasicParsing
        Write-Host "    OK" -ForegroundColor Green
    } catch {
        Write-Host "    FAILED: $_" -ForegroundColor Red
    }
}

Write-Host "Downloading product images..."
foreach ($img in $productImages.GetEnumerator()) {
    $outPath = "assets/images/products/$($img.Key)"
    Write-Host "  Downloading $($img.Key)..."
    try {
        Invoke-WebRequest -Uri $img.Value -OutFile $outPath -UseBasicParsing
        Write-Host "    OK" -ForegroundColor Green
    } catch {
        Write-Host "    FAILED: $_" -ForegroundColor Red
    }
}

Write-Host "`nDone! All images downloaded." -ForegroundColor Green
