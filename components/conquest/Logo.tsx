import Image from 'next/image'

export function Logo({ className = '', size = 'default' }: { className?: string; size?: 'small' | 'default' | 'large' }) {
  const dimensions = {
    small: { width: 32, height: 32 },
    default: { width: 40, height: 40 },
    large: { width: 56, height: 56 },
  }

  const { width, height } = dimensions[size]

  return (
    <Image
      src="/branding/conquest-games-logo.svg"
      alt="Conquest Games Logo"
      width={width}
      height={height}
      className={className}
      priority
    />
  )
}
