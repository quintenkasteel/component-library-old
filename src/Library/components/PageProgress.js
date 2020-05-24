import React from 'react';
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
  width: ${(props) => props.width};
  transition: width ease-in-out 0.2s;
  background: black;
`;

class PageProgress extends React.Component {
  state = {
    scrollPercentage: '0%',
  };

  listenToScrollEvent = () => {
    document.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        this.calculateScrollDistance();
      });
    });
  };

  calculateScrollDistance = () => {
    const scrollTop =
      window.pageYOffset ||
      (document.documentElement || document.body.parentNode || document.body).scrollTop; // how much the user has scrolled by

    const documentHeight = window.document.body.offsetHeight;
    const windowHeight = window.innerHeight;

    const scrollDistance = (scrollTop / (documentHeight - windowHeight)) * 100;
    this.setState({
      scrollPercentage: `${scrollDistance}%`,
    });
  };

  componentDidMount() {
    this.listenToScrollEvent();
  }

  render() {
    return (
      <PageProgressContainer className="page-progress">
        <PageProgressBar width={this.state.scrollPercentage} />
      </PageProgressContainer>
    );
  }
}

export default PageProgress;
