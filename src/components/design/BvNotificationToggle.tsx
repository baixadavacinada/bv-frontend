import { useId } from 'react'
import { Switch } from '../ui/switch'
import { useLiveRegion } from '@/hooks/use-accessibility'

export const BvNotificationToggle = ({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
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
    <div className="flex items-center justify-between py-1">
      <label id={labelId} htmlFor={switchId} className="cursor-pointer text-base text-gray-900">
        {label}
      </label>
      <Switch
        id={switchId}
        checked={checked}
        onCheckedChange={handleChange}
        aria-labelledby={labelId}
        aria-describedby={`${switchId}-description`}
      />
      {/* Descrição invisível para leitores de tela */}
      <span id={`${switchId}-description`} className="sr-only">
        {checked ? 'Ativado' : 'Desativado'}. Pressione para {checked ? 'desativar' : 'ativar'}{' '}
        {label.toLowerCase()}.
      </span>
    </div>
  )
}
