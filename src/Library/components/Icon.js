import React from 'react';
import StyledIcon from '../styles/Icon.js';
import finger from '../../../Icons/outline/fuckYou.svg';

const camelize = str => {
  const newString = str.replace('-', ' ');

  return newString.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
};

const Icon = ({ name, size, fill = 'white', type = 'outline' }) => {
  const string = name ? camelize(name) : null;

  const acceptedType = ['outline', 'FontAwesome'].indexOf(type) > -1;

  const importUrl = (() => {
    try {
      return acceptedType
        ? require(`../../../Icons/${type}/${string}.png`).default
        : console.warn(`Icon type ${type} doesn't exist in package AWESOME`);
    } catch (err) {
      return console.warn(`Icon name ${name} doesn't exist in package AWESOME`);
    }
  })();

  if (!string || !importUrl)
    return <StyledIcon ImageSrc={finger} size={size} fill={fill} type={type} />;

  return (
    <StyledIcon ImageSrc={importUrl} size={size} fill={fill} type={type} />
  );
};

export default Icon;
