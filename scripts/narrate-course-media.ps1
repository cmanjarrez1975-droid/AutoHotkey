param([string]$Voice = 'Microsoft Sabina Desktop', [string]$Only = '')
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Speech
$workspace = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$work = Join-Path $workspace 'work\course-media'
$rows = Get-Content -LiteralPath (Join-Path $work 'storyboards.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$speaker = New-Object System.Speech.Synthesis.SpeechSynthesizer
try {
    $available = @($speaker.GetInstalledVoices() | Where-Object { $_.Enabled -and $_.VoiceInfo.Name -eq $Voice -and $_.VoiceInfo.Culture.Name -like 'es-*' })
    if ($available.Count -ne 1) { throw "No hay voz española habilitada con el nombre: $Voice. No se instala ni sustituye automáticamente." }
    $speaker.SelectVoice($Voice)
    $speaker.Rate = -1
    $speaker.Volume = 100
    $format = New-Object System.Speech.AudioFormat.SpeechAudioFormatInfo(24000, [System.Speech.AudioFormat.AudioBitsPerSample]::Sixteen, [System.Speech.AudioFormat.AudioChannel]::Mono)
    foreach ($row in $rows) {
        if ($Only -and $row.id -ne $Only) { continue }
        $folder = Join-Path $work $row.id
        [IO.Directory]::CreateDirectory($folder) | Out-Null
        for ($i = 0; $i -lt $row.scenes.Count; $i++) {
            $file = Join-Path $folder ("{0:D2}.wav" -f $i)
            $speaker.SetOutputToWaveFile($file, $format)
            $speaker.Speak($row.scenes[$i].narration)
            $speaker.SetOutputToNull()
        }
        Write-Output ("Narración lista: {0}" -f $row.id)
    }
    @{ name=$Voice; culture=$available[0].VoiceInfo.Culture.Name; synthetic=$true; rate=-1 } | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $work 'voice.json') -Encoding UTF8
} finally {
    $speaker.Dispose()
}
