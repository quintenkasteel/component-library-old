import React from 'react';
import Slider from '../library/components/Slider.js';

const SliderPage = () => {
  return (
    <Slider styled={'caroussel'} slideCount={1} showCount={3}>
      <div>
        <img src="https://source.unsplash.com/user/erondu" />
      </div>
      <div>
        <img src="https://source.unsplash.com/user/hayleykimdesign" />
      </div>
      <div>
        <img src="https://source.unsplash.com/collection/8469893" />
      </div>
      <div>
        <img src="https://source.unsplash.com/random" />
      </div>
      <div>
        <img src="https://source.unsplash.com/user/jeannerosegomez" />
      </div>
      <div>
        <img src="https://source.unsplash.com/user/osillbury" />
      </div>
      <div>
        <img src="https://source.unsplash.com/collection/1758353" />
      </div>
      <div>
        <img src="https://source.unsplash.com/collection/1118894" />
      </div>
      <div>
        <img src="https://source.unsplash.com/collection/1360971" />
      </div>
    </Slider>
  );
};

export default SliderPage;
