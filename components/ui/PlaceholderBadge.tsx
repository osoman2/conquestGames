import { AlertCircle } from 'lucide-react'

export function PlaceholderBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-900/20 border border-yellow-700/40 rounded-sm">
      <AlertCircle size={14} className="text-yellow-600" />
      <span className="text-xs font-mono text-yellow-600">[ESPERANDO {label}]</span>
    </div>
  )
}
