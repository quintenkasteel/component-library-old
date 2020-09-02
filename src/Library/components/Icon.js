import React from 'react';
import StyledIcon from '../styles/Icon.js';
import finger from '../../../Icons/outline/fuckYou.svg';
import { camelize } from './Utils.js';

//css filter for color of other then outline icons 

const Icon = ({ name, size, fill = 'white', type = 'outline' }) => {
  const string = name ? camelize(name) : null;

  const acceptedTypes = ['outline', 'FontAwesome'];

  const importUrl = (() => {
    try {
      return acceptedTypes.indexOf(type) > -1
        ? require(`../../../Icons/${type}/${string}.png`).default
        : console.warn(`Icon type ${type} doesn't exist. choose on of ${acceptedTypes}`);
    } catch (err) {
      return console.warn(`Icon name ${name} doesn't exist`);
    }
  })();

  if (!string || !importUrl)
    return <StyledIcon ImageSrc={finger} size={size} fill={fill} type={type} />;

  return (
    <StyledIcon ImageSrc={importUrl} size={size} fill={fill} type={type} />
  );
};

export default Icon;
