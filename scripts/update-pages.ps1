$template = @'
'use client'

import { UnderConstruction } from '@/components/under-construction'

export default function Page() {
  return <UnderConstruction />
}
'@

Get-ChildItem -Path "D:\WIND\lib\app\(protected)" -Filter "page.tsx" -Recurse | ForEach-Object {
    if ($_.FullName -notlike "*\(public)\*") {
        Set-Content -Path $_.FullName -Value $template -Encoding UTF8
        Write-Host "Updated: $($_.FullName)"
    }
}
