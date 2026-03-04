import React from 'react';
import PropTypes from 'prop-types';

import './button.css';

const SIZE_CONFIG = {
  XSmall: {
    icon: 20,
    fontSize: 14,
    lineHeight: 20,
    gap: 4,
    paddingX: 12,
    paddingY: 6,
  },
  Small: {
    icon: 20,
    fontSize: 14,
    lineHeight: 20,
    gap: 8,
    paddingX: 16,
    paddingY: 10,
  },
  Medium: {
    icon: 24,
    fontSize: 16,
    lineHeight: 24,
    gap: 8,
    paddingX: 24,
    paddingY: 16,
  },
  Large: {
    icon: 32,
    fontSize: 24,
    lineHeight: 32,
    gap: 12,
    paddingX: 48,
    paddingY: 32,
  },
  XLarge: {
    icon: 40,
    fontSize: 32,
    lineHeight: 40,
    gap: 16,
    paddingX: 64,
    paddingY: 48,
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
  const config = SIZE_CONFIG[size];
  const isDisabled = state === 'Disabled';

  return (
    <button
      className={[
        'primary-button',
        `primary-button--${size.toLowerCase()}`,
        `primary-button--${state.toLowerCase()}`,
        showFocusIndicator ? 'primary-button--show-focus' : '',
      ].join(' ')}
      disabled={isDisabled}
      onClick={onClick}
      style={{
        '--button-gap': `${config.gap}px`,
        '--button-padding-x': `${config.paddingX}px`,
        '--button-padding-y': `${config.paddingY}px`,
        '--button-font-size': `${config.fontSize}px`,
        '--button-line-height': `${config.lineHeight}px`,
      }}
      type="button"
    >
      <span className="primary-button__state-layer">
        {showLeadingIcon ? <Icon size={config.icon} /> : null}
        <span className="primary-button__label">{label}</span>
        {showTrailingIcon ? <Icon size={config.icon} /> : null}
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
