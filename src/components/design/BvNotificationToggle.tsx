import { useId } from 'react'
import { Switch } from '../ui/switch'
import { useLiveRegion } from '@/hooks/use-accessibility'

export const BvNotificationToggle = ({
  label,
  checked,
  onChange,
  description,
}: {
  label: string
  checked: boolean
  onChange: () => void
  description?: string
}) => {
  const switchId = useId()
  const labelId = useId()
  const { announceToScreenReader } = useLiveRegion()

  const handleChange = () => {
    onChange()
    // Anuncia a mudança para leitores de tela
    const newState = checked ? 'desativado' : 'ativado'
    announceToScreenReader(`${label} ${newState}`, 'polite')
  }

  return (
    <div className="flex items-start justify-between gap-4 py-1">
      <div className="flex-1">
        <label
          id={labelId}
          htmlFor={switchId}
          className="cursor-pointer text-base font-medium text-gray-900"
        >
          {label}
        </label>
        {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
      </div>
      <Switch
        id={switchId}
        checked={checked}
        onCheckedChange={handleChange}
        aria-labelledby={labelId}
        aria-describedby={`${switchId}-description`}
        className="shrink-0"
      />
      {/* Descrição invisível para leitores de tela */}
      <span id={`${switchId}-description`} className="sr-only">
        {checked ? 'Ativado' : 'Desativado'}. Pressione para {checked ? 'desativar' : 'ativar'}{' '}
        {label.toLowerCase()}.
      </span>
    </div>
  )
}
