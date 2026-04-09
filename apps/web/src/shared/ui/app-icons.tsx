interface AppIconProps {
  kind:
    | 'menu'
    | 'close'
    | 'home'
    | 'profile'
    | 'needs'
    | 'gap'
    | 'shopping'
    | 'inventory'
    | 'add'
    | 'maintenance'
    | 'help'
    | 'data'
    | 'status'
    | 'water'
    | 'food'
  size?: number
  color?: string
  title?: string
}

function createIconProps(size: number, title?: string) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    role: title ? 'img' : 'presentation',
    'aria-hidden': title ? undefined : true,
    'aria-label': title,
  }
}

export function AppIcon({
  kind,
  size = 20,
  color = 'currentColor',
  title,
}: AppIconProps) {
  const iconProps = createIconProps(size, title)
  const strokeProps = {
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (kind) {
    case 'menu':
      return (
        <svg {...iconProps}>
          <path d="M4 7H20" {...strokeProps} />
          <path d="M4 12H20" {...strokeProps} />
          <path d="M4 17H20" {...strokeProps} />
        </svg>
      )
    case 'close':
      return (
        <svg {...iconProps}>
          <path d="M6 6L18 18" {...strokeProps} />
          <path d="M18 6L6 18" {...strokeProps} />
        </svg>
      )
    case 'home':
      return (
        <svg {...iconProps}>
          <path d="M3 10.5L12 4L21 10.5" {...strokeProps} />
          <path d="M5.5 9.5V20H18.5V9.5" {...strokeProps} />
          <path d="M10 20V14H14V20" {...strokeProps} />
        </svg>
      )
    case 'profile':
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="8" r="3.25" {...strokeProps} />
          <path
            d="M5 19C6.6 15.9 9 14.5 12 14.5C15 14.5 17.4 15.9 19 19"
            {...strokeProps}
          />
        </svg>
      )
    case 'needs':
      return (
        <svg {...iconProps}>
          <path d="M8 5H16" {...strokeProps} />
          <path d="M8 9H16" {...strokeProps} />
          <path d="M8 13H13" {...strokeProps} />
          <path d="M6 4H18V20H6Z" {...strokeProps} />
        </svg>
      )
    case 'gap':
      return (
        <svg {...iconProps}>
          <path d="M5 18L9.5 12.5L13 15.5L19 8" {...strokeProps} />
          <path d="M18 8H19.5V9.5" {...strokeProps} />
          <path d="M4 20H20" {...strokeProps} />
        </svg>
      )
    case 'shopping':
      return (
        <svg {...iconProps}>
          <path d="M5 6H20" {...strokeProps} />
          <path d="M7 6L8.2 16H17.5L19 9H9" {...strokeProps} />
          <circle cx="10" cy="19" r="1.4" {...strokeProps} />
          <circle cx="16.5" cy="19" r="1.4" {...strokeProps} />
        </svg>
      )
    case 'inventory':
      return (
        <svg {...iconProps}>
          <path d="M5 8H19V19H5Z" {...strokeProps} />
          <path d="M9 8V5H15V8" {...strokeProps} />
          <path d="M5 12H19" {...strokeProps} />
        </svg>
      )
    case 'add':
      return (
        <svg {...iconProps}>
          <path d="M12 5V19" {...strokeProps} />
          <path d="M5 12H19" {...strokeProps} />
          <circle cx="12" cy="12" r="8" {...strokeProps} />
        </svg>
      )
    case 'maintenance':
      return (
        <svg {...iconProps}>
          <path
            d="M14.5 6.5A3.5 3.5 0 0 0 18 10A6 6 0 0 1 9.5 18.5L5 20L6.5 15.5A6 6 0 0 1 14.5 6.5Z"
            {...strokeProps}
          />
        </svg>
      )
    case 'help':
      return (
        <svg {...iconProps}>
          <path
            d="M9.75 9A2.25 2.25 0 1 1 14 10.25C13 11 12 11.6 12 13"
            {...strokeProps}
          />
          <circle cx="12" cy="17" r="0.75" fill={color} />
          <circle cx="12" cy="12" r="8" {...strokeProps} />
        </svg>
      )
    case 'data':
      return (
        <svg {...iconProps}>
          <ellipse cx="12" cy="6.5" rx="6.5" ry="2.75" {...strokeProps} />
          <path
            d="M5.5 6.5V17.5C5.5 19 8.4 20.25 12 20.25C15.6 20.25 18.5 19 18.5 17.5V6.5"
            {...strokeProps}
          />
          <path d="M5.5 12C5.5 13.5 8.4 14.75 12 14.75C15.6 14.75 18.5 13.5 18.5 12" {...strokeProps} />
        </svg>
      )
    case 'status':
      return (
        <svg {...iconProps}>
          <path
            d="M12 3L19 6V11C19 15.2 16.5 18.4 12 20C7.5 18.4 5 15.2 5 11V6L12 3Z"
            {...strokeProps}
          />
          <path d="M9 11.5L11 13.5L15.5 9" {...strokeProps} />
        </svg>
      )
    case 'water':
      return (
        <svg {...iconProps}>
          <path
            d="M12 4C9.7 7 7.5 9.6 7.5 13A4.5 4.5 0 0 0 16.5 13C16.5 9.6 14.3 7 12 4Z"
            {...strokeProps}
          />
          <path d="M9.5 13.5C9.7 15 10.6 16 12 16.4" {...strokeProps} />
        </svg>
      )
    case 'food':
      return (
        <svg {...iconProps}>
          <path d="M6 11.5H18" {...strokeProps} />
          <path d="M7.5 11.5C8.2 15 9.8 18 12 18C14.2 18 15.8 15 16.5 11.5" {...strokeProps} />
          <path d="M9 5V9" {...strokeProps} />
          <path d="M12 5V9" {...strokeProps} />
          <path d="M15 5V9" {...strokeProps} />
        </svg>
      )
  }

  return null
}

interface BuffertkollMarkProps {
  size?: number
  title?: string
}

export function BuffertkollMark({
  size = 88,
  title = 'Buffertkoll',
}: BuffertkollMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <path
        d="M12 37L48 12L84 37V73"
        stroke="#5FAF4B"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 35H76V76H20V35Z"
        fill="#F7FBF8"
        stroke="#4D6770"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect
        x="28"
        y="38"
        width="18"
        height="28"
        rx="2.5"
        fill="#FFFFFF"
        stroke="#4D6770"
        strokeWidth="3"
      />
      <rect x="31" y="34" width="12" height="5" rx="2" fill="#4D6770" />
      <path d="M33 46L35.8 49L41 43.8" stroke="#5FAF4B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M33 53L35.8 56L41 50.8" stroke="#5FAF4B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M53 36V66" stroke="#4D6770" strokeWidth="3" strokeLinecap="round" />
      <path d="M53 46H72" stroke="#4D6770" strokeWidth="3" strokeLinecap="round" />
      <path d="M53 58H72" stroke="#4D6770" strokeWidth="3" strokeLinecap="round" />
      <rect x="56" y="39" width="7" height="7" rx="1.5" fill="#6B7F86" />
      <rect x="65" y="40" width="5" height="8" rx="1.5" fill="#60B3E5" />
      <rect x="56" y="50" width="9" height="8" rx="1.5" fill="#4D6770" />
      <path d="M60.5 52.5V55.5" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M59 54H62" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M66.5 52H71" stroke="#9EAEB4" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M66.5 56H71" stroke="#9EAEB4" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M70 82C61.5 79.1 57 73.1 57 66V58L70 53L83 58V66C83 73.1 78.5 79.1 70 82Z"
        fill="#5FAF4B"
        stroke="#3F7E3D"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M64.5 67.5L68.5 71.5L76 63.5" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
