'use strict';



function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

var React = require('react');

___$insertStyle(".ripple {\n  --ripple-color: rgba(21, 144, 238, 0.3);\n  display: block;\n  top: 0;\n  left: 0;\n  width: 60px;\n  height: 60px;\n  margin-top: -30px;\n  margin-left: -30px;\n  position: absolute;\n  z-index: 999;\n  background-color: var(--ripple-color);\n  border-radius: 100%;\n  border: 2px solid var(--ripple-color);\n  pointer-events: none;\n}\n\n.hidden {\n  display: none;\n}\n\n.visible {\n  display: block;\n}\n\n.rippleFadeIn {\n  animation: rippleFadeIn 0.3s ease 0s 1 normal forwards;\n}\n\n.rippleFadeOut {\n  animation: rippleFadeOut 0.3s ease 0s 1 normal forwards;\n}\n\n@keyframes rippleFadeIn {\n  from {\n    transform: scale(0.6);\n    opacity: 0.2;\n  }\n  to {\n    transform: scale(1);\n    opacity: 0.6;\n  }\n}\n@keyframes rippleFadeOut {\n  from {\n    transform: scale(1);\n    opacity: 0.6;\n  }\n  to {\n    transform: scale(1);\n    opacity: 0.2;\n  }\n}");

var defaultClasses = ['hidden'];
var RipplePointer = function (_a) {
    var children = _a.children;
    var pointerContainerRef = React.useRef(null);
    var _b = React.useState(defaultClasses), rippleClasses = _b[0], setRippleClasses = _b[1];
    var _c = React.useState({ top: 0, left: 0 }), pointerRippleStyle = _c[0], setPointerRippleStyle = _c[1];
    var _d = React.useState(false), isDragging = _d[0], setIsDragging = _d[1];
    var _e = React.useState(false), isAnimating = _e[0], setIsAnimating = _e[1];
    var handleEvent = function (e) {
        setPointerRippleStyle({
            top: e.pageY,
            left: e.pageX
        });
        switch (e.type) {
            case 'pointermove':
                if (isDragging && !rippleClasses.includes('rippleFadeIn')) {
                    setRippleClasses(['ripple', 'rippleFadeIn']);
                }
                break;
            case 'pointerdown':
                setIsDragging(true);
                setIsAnimating(true);
                setRippleClasses(['ripple', 'rippleFadeIn']);
                break;
            case 'pointerup':
                setIsDragging(false);
                !isAnimating && setRippleClasses(['hidden']);
                break;
            case 'animationend':
                if (e.animationName && e.animationName == 'rippleFadeIn') {
                    setRippleClasses(['ripple', 'rippleFadeOut']);
                }
                else {
                    setIsAnimating(false);
                    setRippleClasses(['hidden']);
                }
            default:
                setRippleClasses(['hidden']);
                break;
        }
    };
    return (React.createElement("div", { ref: pointerContainerRef, onPointerDown: handleEvent, onPointerUp: handleEvent, onPointerMove: handleEvent, onAnimationEnd: handleEvent },
        React.createElement("span", { className: rippleClasses.join(' '), style: pointerRippleStyle }),
        children));
};

module.exports = RipplePointer;
