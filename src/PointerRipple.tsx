import * as React from 'react'
import './styles.scss'

const defaultClasses = ['hidden']

const RipplePointer: React.FC = ({ children }): JSX.Element => {
  const pointerContainerRef = React.useRef<HTMLDivElement>(null)
  const [rippleClasses, setRippleClasses] = React.useState(defaultClasses)
  const [pointerRippleStyle, setPointerRippleStyle] = React.useState({top: 0, left: 0})
  const [isDragging, setIsDragging] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)

  const handleEvent = (e: any) => {
    setPointerRippleStyle({
      top: e.pageY,
      left: e.pageX
    })
    switch (e.type) {
      case 'pointermove':
        if (isDragging && !rippleClasses.includes('rippleFadeIn')) {
          setRippleClasses(['ripple', 'rippleFadeIn'])
        }
        break;
      case 'pointerdown':
        setIsDragging(true)
        setIsAnimating(true)
        setRippleClasses(['ripple', 'rippleFadeIn'])
        break;
      case 'pointerup':
        setIsDragging(false)
        !isAnimating && setRippleClasses(['hidden'])
        break;
      case 'animationend':
        if (e.animationName && e.animationName == 'rippleFadeIn') {
          setRippleClasses(['ripple', 'rippleFadeOut'])
        } else {
          setIsAnimating(false)
          setRippleClasses(['hidden'])
        }
      default:
        setRippleClasses(['hidden'])
        break;
    }
  }

  return (
    <div
      ref={pointerContainerRef}
      onPointerDown={handleEvent}
      onPointerUp={handleEvent}
      onPointerMove={handleEvent}
      onAnimationEnd={handleEvent}
    >
      <span className={rippleClasses.join(' ')} style={pointerRippleStyle}></span>
      {children}
    </div>
  )
}

export default RipplePointer