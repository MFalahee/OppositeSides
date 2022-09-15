import * as React from 'react'

export interface ButtonProps {
  onClick?: (event: React.MouseEvent) => void
  visible: boolean //is the button rendered?
}

export interface HeaderProps {
  title: string
  subtitle: string
  onBack?: () => void
}

export interface WrapperProps {
  api: string
}

export interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string }
  onClick?: (event: google.maps.MapMouseEvent) => void
  onIdle?: (map: google.maps.Map) => void
  disableDefaultUI?: boolean
  children?: React.ReactNode
  onLoad: (map: google.maps.Map) => void
}

export interface MapControlProps {
  position: string
  map: google.maps.Map
}

export interface ControlOptions {
  controlClick?: (event: MouseEvent) => void
  controlLabel?: string
  prevClick?: (event: MouseEvent) => void
}
export interface mapPositionObj {
  TOP_LEFT: google.maps.ControlPosition
  TOP_CENTER: google.maps.ControlPosition
  TOP_RIGHT: google.maps.ControlPosition
  LEFT_TOP: google.maps.ControlPosition
  LEFT_CENTER: google.maps.ControlPosition
  LEFT_BOTTOM: google.maps.ControlPosition
  RIGHT_TOP: google.maps.ControlPosition
  RIGHT_CENTER: google.maps.ControlPosition
  RIGHT_BOTTOM: google.maps.ControlPosition
  BOTTOM_LEFT: google.maps.ControlPosition
  BOTTOM_CENTER: google.maps.ControlPosition
  BOTTOM_RIGHT: google.maps.ControlPosition
}

export interface MainViewTextFieldProps {
  text?: string[]
  weather?: string
  temperature?: string
  windSpeed?: string
  windDirection?: string
  center?: google.maps.LatLngLiteral
  city?: string
  state?: string
  country?: string
}

// @Slideshow

export interface SlideShowProps {
  slides: Array<string>
}

export interface SlideProps {
  id: number
  content: string
}
