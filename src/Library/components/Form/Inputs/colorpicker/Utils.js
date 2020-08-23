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

function RGBToHex(rgb) {
  // Choose correct separator
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb.substr(4).split(")")[0].split(sep);

  let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

export const hex2hsl = (H) =>  {
  
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return h && s && l ?  [h, s, l] : null;
}

export const rgba2hex = orig => {
  
    const rgb = orig
      .replace(/\s/g, '')
      .match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i)
    const alpha = ((rgb && rgb[4]) || '').trim()
    
    const hex = rgb
      ? (rgb[1] | (1 << 8)).toString(16).slice(1) +
        (rgb[2] | (1 << 8)).toString(16).slice(1) +
        (rgb[3] | (1 << 8)).toString(16).slice(1)
      : orig;

  const newHex =  alpha !== ''? alpha : 1;
  // multiply before convert to HEX
  const prepareHex = ((newHex * 255) | (1 << 8)).toString(16).slice(1);
  const FinalHex = hex + (prepareHex !== "ff" ? prepareHex: "");

  return FinalHex;
};

export const hex2rgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
   ] : null;
}

export const hsl2rgb = (h, s, l) => {

  var r, g, b, m, c, x

  if (!isFinite(h)) h = 0
  if (!isFinite(s)) s = 0
  if (!isFinite(l)) l = 0

  h /= 60
  if (h < 0) h = 6 - (-h % 6)
  h %= 6

  s = Math.max(0, Math.min(1, s / 100))
  l = Math.max(0, Math.min(1, l / 100))

  c = (1 - Math.abs((2 * l) - 1)) * s
  x = c * (1 - Math.abs((h % 2) - 1))

  if (h < 1) {
      r = c
      g = x
      b = 0
  } else if (h < 2) {
      r = x
      g = c
      b = 0
  } else if (h < 3) {
      r = 0
      g = c
      b = x
  } else if (h < 4) {
      r = 0
      g = x
      b = c
  } else if (h < 5) {
      r = x
      g = 0
      b = c
  } else {
      r = c
      g = 0
      b = x
  }

  m = l - c / 2
  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return [r, g, b]

}

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
