import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const canObserve = () => typeof window !== 'undefined' && 'IntersectionObserver' in window;

// Fades its children in the first time they scroll into view. Without
// IntersectionObserver (or with reduced motion, via CSS) content shows at once.
function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(() => !canObserve());

  useEffect(() => {
    if (isVisible) {
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [isVisible]);

  const classes = ['reveal', isVisible && 'reveal--visible', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
}

Reveal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Reveal;
