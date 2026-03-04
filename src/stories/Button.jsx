import React from 'react';
import PropTypes from 'prop-types';

import './button.css';
import { hexToRgba, token, toPx } from './buttonTokens';

const SIZE_CONFIG = {
  XSmall: {
    icon: token('space.xl'),
    fontSize: token('Label.MD.Font Size'),
    lineHeight: token('Label.MD.Line Height'),
    fontWeight: token('Label.MD.Font Weight'),
    gap: token('space.xs'),
    paddingX: token('padding.md'),
    paddingY: token('padding.xs'),
  },
  Small: {
    icon: token('space.xl'),
    fontSize: token('Label.MD.Font Size'),
    lineHeight: token('Label.MD.Line Height'),
    fontWeight: token('Label.MD.Font Weight'),
    gap: token('space.sm'),
    paddingX: token('padding.md'),
    paddingY: token('padding.sm'),
  },
  Medium: {
    icon: token('space.2xl'),
    fontSize: token('Label.LG.Font Size'),
    lineHeight: token('Label.LG.Line Height'),
    fontWeight: token('Label.LG.Font Weight'),
    gap: token('space.sm'),
    paddingX: token('padding.xl'),
    paddingY: token('padding.md'),
  },
  Large: {
    icon: token('space.3xl'),
    fontSize: token('Label.LG.Font Size'),
    lineHeight: token('Label.LG.Line Height'),
    fontWeight: token('Label.LG.Font Weight'),
    gap: token('space.md'),
    paddingX: token('padding.4xl'),
    paddingY: token('padding.3xl'),
  },
  XLarge: {
    icon: token('space.4xl'),
    fontSize: token('Label.LG.Font Size'),
    lineHeight: token('Label.LG.Line Height'),
    fontWeight: token('Label.LG.Font Weight'),
    gap: token('space.md'),
    paddingX: token('padding.4xl'),
    paddingY: token('padding.4xl'),
  },
};

const STATE_CONFIG = {
  Enabled: {
    background: token('button.primary.default'),
    foreground: token('button.primary.text+icons'),
    overlay: 'transparent',
  },
  Hovered: {
    background: token('button.primary.default'),
    foreground: token('button.primary.text+icons'),
    overlay: token('button.primary.ripple'),
  },
  Focused: {
    background: token('button.primary.default'),
    foreground: token('button.primary.text+icons'),
    overlay: token('button.primary.ripple'),
  },
  Pressed: {
    background: token('button.primary.pressed'),
    foreground: token('button.primary.text+icons'),
    overlay: token('button.primary.ripple'),
  },
  Disabled: {
    background: token('button.disabled.default'),
    foreground: token('button.disabled.text+icons'),
    overlay: 'transparent',
  },
};

function Icon({ size }) {
  return (
    <svg
      aria-hidden="true"
      className="primary-button__icon"
      height={size}
      viewBox="0 0 20 20"
      width={size}
    >
      <path
        d="M10 2.5L12.317 7.195L17.5 7.947L13.75 11.602L14.635 16.765L10 14.327L5.365 16.765L6.25 11.602L2.5 7.947L7.683 7.195L10 2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

Icon.propTypes = {
  size: PropTypes.number.isRequired,
};

/** Primary button component from Figma: node 61203:573 */
export const Button = ({
  label = 'Label',
  size = 'Small',
  state = 'Enabled',
  showLeadingIcon = true,
  showTrailingIcon = true,
  showFocusIndicator = false,
  onClick,
}) => {
  const sizeConfig = SIZE_CONFIG[size];
  const stateConfig = STATE_CONFIG[state];
  const isDisabled = state === 'Disabled';
  const focusRingWidth = token('border.lg');
  const focusRingColor = hexToRgba(token('button.primary.pressed'), 0.35);

  const buttonStyle = {
    backgroundColor: stateConfig.background,
    borderRadius: toPx(token('radius.lg')),
    boxShadow: showFocusIndicator ? `0 0 0 ${toPx(focusRingWidth)} ${focusRingColor}` : 'none',
    color: stateConfig.foreground,
    fontFamily: token('Label.MD.Font Family'),
    fontSize: toPx(sizeConfig.fontSize),
    fontWeight: sizeConfig.fontWeight,
    lineHeight: toPx(sizeConfig.lineHeight),
  };

  const stateLayerStyle = {
    boxShadow: `inset 0 0 0 999px ${stateConfig.overlay}`,
    gap: toPx(sizeConfig.gap),
    padding: `${toPx(sizeConfig.paddingY)} ${toPx(sizeConfig.paddingX)}`,
  };

  const labelStyle = {
    fontSize: toPx(sizeConfig.fontSize),
    fontWeight: sizeConfig.fontWeight,
    lineHeight: toPx(sizeConfig.lineHeight),
  };

  return (
    <button
      className={[
        'primary-button',
        `primary-button--${size.toLowerCase()}`,
        `primary-button--${state.toLowerCase()}`,
      ].join(' ')}
      disabled={isDisabled}
      onClick={onClick}
      style={buttonStyle}
      type="button"
    >
      <span className="primary-button__state-layer" style={stateLayerStyle}>
        {showLeadingIcon ? <Icon size={sizeConfig.icon} /> : null}
        <span className="primary-button__label" style={labelStyle}>{label}</span>
        {showTrailingIcon ? <Icon size={sizeConfig.icon} /> : null}
      </span>
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  size: PropTypes.oneOf(['XSmall', 'Small', 'Medium', 'Large', 'XLarge']),
  state: PropTypes.oneOf(['Enabled', 'Hovered', 'Focused', 'Pressed', 'Disabled']),
  showLeadingIcon: PropTypes.bool,
  showTrailingIcon: PropTypes.bool,
  showFocusIndicator: PropTypes.bool,
  onClick: PropTypes.func,
};
