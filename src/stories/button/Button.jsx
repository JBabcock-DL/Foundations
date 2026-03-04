import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './button.css';
import { hexToRgba, token, toPx } from '../tokenResolver';

const FONT_FAMILY_BODY = token('Typography.font-face.body');
export const MATERIAL_ICON_NAMES = ['star', 'favorite', 'check', 'arrow_forward', 'home'];

const SIZE_CONFIG = {
  XSmall: {
    icon: token('Size.size-500'),
    fontFamily: FONT_FAMILY_BODY,
    fontSize: token('Label.MD.Font Size'),
    fontWeight: token('Typography.weight.regular'),
    lineHeight: token('Label.MD.Line Height'),
    gap: token('space.xs'),
    paddingX: token('padding.md'),
    paddingY: token('padding.xs'),
  },
  Small: {
    icon: token('Size.size-500'),
    fontFamily: FONT_FAMILY_BODY,
    fontSize: token('Label.MD.Font Size'),
    fontWeight: token('Typography.weight.regular'),
    lineHeight: token('Label.MD.Line Height'),
    gap: token('space.sm'),
    paddingX: token('padding.md'),
    paddingY: token('padding.sm'),
  },
  Medium: {
    icon: token('Size.size-600'),
    fontFamily: FONT_FAMILY_BODY,
    fontSize: token('Label.LG.Font Size'),
    fontWeight: token('Typography.weight.regular'),
    lineHeight: token('Label.LG.Line Height'),
    gap: token('space.sm'),
    paddingX: token('padding.xl'),
    paddingY: token('padding.md'),
  },
  Large: {
    icon: token('Size.size-800'),
    fontFamily: FONT_FAMILY_BODY,
    fontSize: token('Size.size-600'),
    fontWeight: token('Typography.weight.regular'),
    lineHeight: token('Size.size-800'),
    gap: token('space.md'),
    paddingX: token('padding.4xl'),
    paddingY: token('padding.3xl'),
  },
  XLarge: {
    icon: token('Size.size-1000'),
    fontFamily: FONT_FAMILY_BODY,
    fontSize: token('Size.size-800'),
    fontWeight: token('Typography.weight.regular'),
    lineHeight: token('Size.size-1000'),
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

function Icon({ icon, size }) {
  const symbol = MATERIAL_ICON_NAMES.includes(icon) ? icon : 'star';

  return (
    <span
      aria-hidden="true"
      className="material-symbols-rounded primary-button__icon"
      style={{ fontSize: toPx(size) }}
    >
      {symbol}
    </span>
  );
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

/** Primary button component from Figma: node 61203:573 */
export const Button = ({
  label = 'Label',
  size = 'Small',
  state = 'Enabled',
  icon = 'star',
  showLeadingIcon = true,
  showTrailingIcon = true,
  showFocusIndicator = false,
  onClick,
}) => {
  const [interaction, setInteraction] = useState({
    hovered: false,
    pressed: false,
  });

  const isInteractive = state === 'Enabled';
  const effectiveState = !isInteractive
    ? state
    : interaction.pressed
      ? 'Pressed'
      : interaction.hovered
        ? 'Hovered'
        : 'Enabled';

  const sizeConfig = SIZE_CONFIG[size] ?? SIZE_CONFIG.Small;
  const stateConfig = STATE_CONFIG[effectiveState] ?? STATE_CONFIG.Enabled;
  const isDisabled = state === 'Disabled';
  const focusRingWidth = token('border.lg');
  const focusRingColor = hexToRgba(token('button.primary.pressed'), 0.35);
  const shouldShowFocusRing = showFocusIndicator;

  const buttonStyle = {
    backgroundColor: stateConfig.background,
    borderRadius: toPx(token('radius.lg')),
    boxShadow: shouldShowFocusRing
      ? `0 0 0 ${toPx(focusRingWidth)} ${focusRingColor}`
      : 'none',
    color: stateConfig.foreground,
    fontFamily: sizeConfig.fontFamily,
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
      className={isDisabled ? 'primary-button primary-button--disabled' : 'primary-button'}
      disabled={isDisabled}
      onClick={onClick}
      onKeyDown={isInteractive ? (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          setInteraction((prev) => ({ ...prev, pressed: true }));
        }
      } : undefined}
      onKeyUp={isInteractive ? (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          setInteraction((prev) => ({ ...prev, hovered: false, pressed: false }));
        }
      } : undefined}
      onMouseDown={isInteractive ? () => setInteraction((prev) => ({ ...prev, pressed: true })) : undefined}
      onMouseEnter={isInteractive ? () => setInteraction((prev) => ({ ...prev, hovered: true })) : undefined}
      onMouseLeave={isInteractive ? () => setInteraction((prev) => ({ ...prev, hovered: false, pressed: false })) : undefined}
      onMouseUp={isInteractive ? () => setInteraction((prev) => ({ ...prev, hovered: false, pressed: false })) : undefined}
      style={buttonStyle}
      type="button"
    >
      <span className="primary-button__state-layer" style={stateLayerStyle}>
        {showLeadingIcon ? <Icon icon={icon} size={sizeConfig.icon} /> : null}
        <span className="primary-button__label" style={labelStyle}>{label}</span>
        {showTrailingIcon ? <Icon icon={icon} size={sizeConfig.icon} /> : null}
      </span>
    </button>
  );
};

Button.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.oneOf(['XSmall', 'Small', 'Medium', 'Large', 'XLarge']),
  state: PropTypes.oneOf(['Enabled', 'Hovered', 'Focused', 'Pressed', 'Disabled']),
  showLeadingIcon: PropTypes.bool,
  showTrailingIcon: PropTypes.bool,
  showFocusIndicator: PropTypes.bool,
  onClick: PropTypes.func,
};
