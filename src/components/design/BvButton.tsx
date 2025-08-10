import { Button, ButtonProps } from '@/ui/button'
import { Loader2 } from 'lucide-react'

interface BvButtonProps extends ButtonProps {
  title?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isLoading?: boolean
  ref?: React.Ref<HTMLButtonElement>
}

export const BvButton = ({
  title,
  leftIcon,
  rightIcon,
  isLoading = false,
  ref,
  ...props
}: BvButtonProps) => {
  const { ...forwardProps } = props

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (isLoading) return
    if (forwardProps.onClick) {


  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (isLoading) return
    if (props.onClick) {
      props.onClick(event)
    }
  }

  return (
    <Button
      ref={ref}
      {...props}
      className={(!!title ? 'min-w-40 ' : ' ') + props.className}
      aria-label={title ? title : props['aria-label']}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between gap-2">
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-center" data-testid="progress" />
        ) : (
          <>
            {leftIcon && leftIcon}
            {title && title}
            {rightIcon && rightIcon}
          </>
        )}
      </div>
    </Button>
  )
}
