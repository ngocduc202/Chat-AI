import React, { useEffect, useState, useRef } from 'react';

const Typewriter = ({ text, speed = 100, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const elementRef = useRef(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index === text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [displayedText]);

  return <p ref={elementRef} dangerouslySetInnerHTML={{ __html: displayedText }} />
};

export default Typewriter;
