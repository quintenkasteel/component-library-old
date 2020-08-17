import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PageProgressContainer = styled.div`
  height: 5px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  z-index: 1;
`;

const PageProgressBar = styled.div`
  height: 100%;
  width: ${props => props.width};
  transition: width ease-in-out 0.2s;
  background: black;
`;

const PageProgress = () => {
  const [scrollPercentage, setScrollPercentage] = useState('0%');

  const listenToScrollEvent = () => {
    document.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        calculateScrollDistance();
      });
    });
  };

  const calculateScrollDistance = () => {
    const scrollTop =
      window.pageYOffset ||
      (document.documentElement || document.body.parentNode || document.body)
        .scrollTop; // how much the user has scrolled by

    const documentHeight = window.document.body.offsetHeight;
    const windowHeight = window.innerHeight;

    const scrollDistance = (scrollTop / (documentHeight - windowHeight)) * 100;
    setScrollPercentage(`${scrollDistance}%`);
  };

  useEffect(() => {
    listenToScrollEvent();
  });

  return (
    <PageProgressContainer className="page-progress">
      <PageProgressBar width={scrollPercentage} />
    </PageProgressContainer>
  );
};

export default PageProgress;
