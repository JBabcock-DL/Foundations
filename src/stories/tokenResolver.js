import primitives from '../../styles/token_Primitives_Mode1.json';
import layoutMobile from '../../styles/token_Layout_Mobile.json';
import themeLight from '../../styles/token_Theme_Lightmode.json';
import typographyNativeMobile from '../../styles/token_Typography-Native_Mobile.json';

function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function deepMerge(...sources) {
  const target = {};

  for (const source of sources) {
    for (const [key, value] of Object.entries(source)) {
      if (isPlainObject(value) && isPlainObject(target[key])) {
        target[key] = deepMerge(target[key], value);
      } else if (isPlainObject(value)) {
        target[key] = deepMerge(value);
      } else {
        target[key] = value;
      }
    }
  }

  return target;
}

const TOKEN_TREE = deepMerge(
  primitives,
  layoutMobile,
  themeLight,
  typographyNativeMobile,
);

function getPathValue(path) {
  return path.split('.').reduce((acc, key) => acc?.[key], TOKEN_TREE);
}

function resolveReference(value) {
  if (typeof value !== 'string') {
    return value;
  }

  const refMatch = value.match(/^\{(.+)\}$/);
  if (!refMatch) {
    return value;
  }

  const referencedToken = getPathValue(refMatch[1]);
  if (!referencedToken) {
    throw new Error(`Unknown token reference: ${value}`);
  }

  if (Object.prototype.hasOwnProperty.call(referencedToken, '$value')) {
    return resolveReference(referencedToken.$value);
  }

  return referencedToken;
}

export function token(path) {
  const tokenNode = getPathValue(path);
  if (!tokenNode) {
    throw new Error(`Unknown token path: ${path}`);
  }

  if (!Object.prototype.hasOwnProperty.call(tokenNode, '$value')) {
    return tokenNode;
  }

  return resolveReference(tokenNode.$value);
}

export function toPx(value) {
  return `${value}px`;
}

export function hexToRgba(hex, alpha) {
  const normalized = hex.replace('#', '');
  const hasAlpha = normalized.length === 8;
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  const a = hasAlpha ? parseInt(normalized.slice(6, 8), 16) / 255 : alpha;

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
