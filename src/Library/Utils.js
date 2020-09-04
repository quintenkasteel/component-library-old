import { useEffect } from 'react';
export const convertRGBtoHSL = rgb => {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;
  let h;
  let s;

  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }

  h = Math.min(h * 60, 360);

  if (h < 0) {
    h += 360;
  }

  const l = (min + max) / 2;

  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max + min);
  } else {
    s = delta / (2 - max - min);
  }

  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
};

export function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

export const onClickOutSide = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export var inRange = function(num, start, end) {
  return num >= start && num <= end;
};

export const camelCaseToDashed = string =>
  string.replace(/[A-Z]/g, m => '-' + m.toLowerCase());

var radius = 12;

const convertPoints = points => {
  const pointSplit = points.replace(/[,]/g, ' ').split(' ');
  const newArray = pointSplit.map(p => parseInt(p));
  return newArray;
};

const Middle = points => {
  const lineToVector = (p1, p2) => {
    var vector = {
      x: p2.x - p1.x,
      y: p2.y - p1.y,
    };
    return vector;
  };

  const vectorToUnitVector = v => {
    const magnitude = v.x * v.x + v.y * v.y;
    const newMag = Math.sqrt(magnitude);
    const unitVector = {
      x: v.x / newMag,
      y: v.y / newMag,
    };
    return unitVector;
  };

  const roundOneCorner = (p1, corner, p2) => {
    const corner_to_p1 = lineToVector(corner, p1);
    const corner_to_p2 = lineToVector(corner, p2);
    const corner_to_p1_unit = vectorToUnitVector(corner_to_p1);
    const corner_to_p2_unit = vectorToUnitVector(corner_to_p2);

    const curve_p1 = {
      x: corner.x + corner_to_p1_unit.x * radius,
      y: corner.y + corner_to_p1_unit.y * radius,
    };
    const curve_p2 = {
      x: corner.x + corner_to_p2_unit.x * radius,
      y: corner.y + corner_to_p2_unit.y * radius,
    };
    const path = {
      line_end: curve_p1,
      curve_control: corner,
      curve_end: curve_p2,
    };
    return path;
  };

  var printPath = function(path) {
    const L =
      'L' + path.line_end.x.toFixed(1) + ',' + path.line_end.y.toFixed(1);

    const Q =
      'Q' +
      path.curve_control.x.toFixed(1) +
      ',' +
      path.curve_control.y.toFixed(1) +
      ' ' +
      path.curve_end.x.toFixed(1) +
      ',' +
      path.curve_end.y.toFixed(1);

    return L + ' ' + Q;
  };

  for (var i = 2; i + 5 < points.length; i += 2) {
    console.log(points.length);
    var p1 = {
      x: parseInt(points[i]),
      y: parseInt(points[i + 1]),
    };
    var p2 = {
      x: parseInt(points[i + 2]),
      y: parseInt(points[i + 3]),
    };
    var p3 = {
      x: parseInt(points[i + 4]),
      y: parseInt(points[i + 5]),
    };
    var path = roundOneCorner(p1, p2, p3);
    return printPath(path);
  }
};

export const polyLineRounded = points => {
  const newPoints = convertPoints(points);

  console.log(newPoints);

  //check input
  if (newPoints.length <= 2) {
    console.log('enter at least one point');
  }
  if (newPoints.length % 2 !== 0) {
    console.log(
      'you entered ' +
        (newPoints.length - 2) +
        ' numbers, but each point should have two numbers'
    );
  }
  if (newPoints.length < 8) {
    console.log('need at least 3 newPoints');
  }

  const M = 'M' + newPoints[2] + ',' + newPoints[3];
  const forLoop = Middle(newPoints);
  var lastArg = newPoints.length - 1;
  const Last = 'L' + newPoints[lastArg - 1] + ',' + newPoints[lastArg];
  console.log(forLoop)
  return M + ' ' + forLoop + ' ' + Last;
};
