$url = 'https://api.github.com/repos/Mionecart79/Smart-Grocery-Tractorr/actions/runs/41866428380/jobs'
try {
    $res = Invoke-RestMethod -Uri $url -Headers @{'User-Agent'='PowerShell'}
    foreach ($j in $res.jobs) {
        Write-Host "Job: $($j.name) -> $($j.status) | $($j.conclusion)"
        foreach ($s in $j.steps) {
            Write-Host "   Step: $($s.name) -> $($s.status) | $($s.conclusion)"
        }
    }
} catch {
    Write-Host "Error: $_"
}
