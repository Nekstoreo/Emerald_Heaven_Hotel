import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ScrollUpButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button onClick={scrollToTop} className="scrollup" id="scroll-up">
      <FontAwesomeIcon icon={faArrowUp} className="scrollup__icon" />
    </button>
  );
};

export default ScrollUpButton;
