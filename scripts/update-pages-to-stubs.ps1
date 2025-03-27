$template = @'
import UnderConstructionPage from '@/components/under-construction-page'

export default function Page() {
  return <UnderConstructionPage />
}
'@

$dynamicTemplate = @'
import UnderConstructionPage from '@/components/under-construction-page'

interface Props {
  params: { id: string }
}

export default function Page({ params }: Props) {
  return <UnderConstructionPage />
}
'@

Get-ChildItem -Path "D:\WIND\lib\app\(protected)" -Filter "page.tsx" -Recurse | ForEach-Object {
    $content = if ($_.DirectoryName -match '\[\w+\]') {
        $dynamicTemplate
    } else {
        $template
    }
    Set-Content -Path $_.FullName -Value $content
    Write-Host "Updated: $($_.FullName)"
}
