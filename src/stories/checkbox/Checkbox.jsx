import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './checkbox.css';
import { hexToRgba, token, toPx } from '../tokenResolver';

const CHECKBOX_TYPES = [
  'Selected',
  'Unselected',
  'Indeterminate',
  'Error unselected',
  'Error indeterminate',
  'Error selected',
];

const CHECKBOX_STATES = ['Enabled', 'Hovered', 'Focused', 'Pressed', 'Disabled'];

const OUTER_SIZE = token('Size.size-1200');
const CONTROL_SIZE = token('Size.size-600');
const GLYPH_WIDTH = token('Size.size-300');
const GLYPH_STROKE = token('border.md');
const WRAPPER_PADDING = token('padding.xs');
const STATE_LAYER_PADDING = token('space.sm');
const CONTROL_RADIUS = token('radius.xs');
const STATE_LAYER_RADIUS = token('radius.full');
const FOCUS_RING_WIDTH = token('border.lg');

const COLORS = {
  activeFill: token('background.primary.default'),
  activeOverlay: token('background.primary.container'),
  activeGlyph: token('background.primary.on primary'),
  activeBorder: token('border.default.default'),
  activeRipple: token('button.secondary.ripple'),
  errorFill: token('background.danger.default'),
  errorOverlay: token('background.danger.container'),
  errorGlyph: token('background.danger.on danger'),
  errorBorder: token('border.danger.default'),
  errorRipple: token('button.danger.ripple'),
  disabledFill: token('background.disabled.default'),
  disabledGlyph: token('background.disabled.on container'),
  disabledBorder: token('border.disabled.default'),
};

function resolveEffectiveState(state, interaction) {
  if (state !== 'Enabled') {
    return state;
  }

  if (interaction.pressed) {
    return 'Pressed';
  }

  if (interaction.hovered) {
    return 'Hovered';
  }

  return 'Enabled';
}

function buildVisualModel(type, state) {
  const isError = type.startsWith('Error');
  const isDisabled = state === 'Disabled';
  const hasActiveOverlay = ['Hovered', 'Focused', 'Pressed'].includes(state);
  const isSelected = type === 'Selected' || type === 'Error selected';
  const isIndeterminate = type === 'Indeterminate' || type === 'Error indeterminate';
  const isUnselected = type === 'Unselected' || type === 'Error unselected';
  const showGlyph = isSelected || isIndeterminate;
  const showContainerFill = showGlyph;

  const controlBackground = !showContainerFill
    ? 'transparent'
    : isDisabled
      ? COLORS.disabledFill
      : isError
        ? COLORS.errorFill
        : COLORS.activeFill;

  const borderColor = isUnselected
    ? (isDisabled ? COLORS.disabledBorder : (isError ? COLORS.errorBorder : COLORS.activeBorder))
    : 'transparent';

  const overlayColor = hasActiveOverlay
    ? (isError ? COLORS.errorOverlay : COLORS.activeOverlay)
    : 'transparent';

  const glyphColor = isDisabled
    ? COLORS.disabledGlyph
    : (isError ? COLORS.errorGlyph : COLORS.activeGlyph);

  const focusColor = hexToRgba(isError ? COLORS.errorFill : COLORS.activeFill, 0.35);
  const rippleColor = isError ? COLORS.errorRipple : COLORS.activeRipple;

  return {
    borderColor,
    controlBackground,
    focusColor,
    glyphColor,
    isDisabled,
    isIndeterminate,
    isUnselected,
    overlayColor,
    rippleColor,
    showGlyph,
  };
}

function toggleType(type) {
  if (type === 'Selected') {
    return 'Unselected';
  }

  if (type === 'Unselected') {
    return 'Selected';
  }

  if (type === 'Error selected') {
    return 'Error unselected';
  }

  if (type === 'Error unselected') {
    return 'Error selected';
  }

  if (type === 'Indeterminate') {
    return 'Selected';
  }

  if (type === 'Error indeterminate') {
    return 'Error selected';
  }

  return type;
}

export const Checkbox = ({
  type = 'Selected',
  state = 'Enabled',
  showFocusIndicator = false,
  onClick,
}) => {
  const [currentType, setCurrentType] = useState(type);
  const [interaction, setInteraction] = useState({ hovered: false, pressed: false });
  const effectiveState = resolveEffectiveState(state, interaction);
  const visuals = buildVisualModel(currentType, effectiveState);
  const isInteractive = state === 'Enabled';
  const ariaChecked = visuals.isIndeterminate
    ? 'mixed'
    : currentType === 'Selected' || currentType === 'Error selected';

  useEffect(() => {
    setCurrentType(type);
  }, [type]);

  return (
    <button
      aria-checked={ariaChecked}
      aria-disabled={visuals.isDisabled}
      className="checkbox"
      data-node-id="60970:18947"
      disabled={visuals.isDisabled}
      onClick={(event) => {
        if (isInteractive) {
          setCurrentType((prev) => toggleType(prev));
        }
        onClick?.(event);
      }}
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
      role="checkbox"
      style={{
        height: toPx(OUTER_SIZE),
        padding: toPx(WRAPPER_PADDING),
        width: toPx(OUTER_SIZE),
      }}
      type="button"
    >
      <span
        className="checkbox__state-layer"
        style={{
          backgroundColor: visuals.overlayColor,
          borderRadius: toPx(STATE_LAYER_RADIUS),
          boxShadow: showFocusIndicator && effectiveState === 'Focused'
            ? `0 0 0 ${toPx(FOCUS_RING_WIDTH)} ${visuals.focusColor}`
            : 'none',
          padding: toPx(STATE_LAYER_PADDING),
        }}
      >
        <span
          className="checkbox__control"
          style={{
            backgroundColor: visuals.controlBackground,
            borderColor: visuals.borderColor,
            borderRadius: toPx(CONTROL_RADIUS),
            borderWidth: visuals.isUnselected ? toPx(GLYPH_STROKE) : '0px',
            height: toPx(CONTROL_SIZE),
            width: toPx(CONTROL_SIZE),
          }}
        >
          {visuals.showGlyph ? (
            visuals.isIndeterminate ? (
              <span
                className="checkbox__minus"
                style={{
                  backgroundColor: visuals.glyphColor,
                  height: toPx(GLYPH_STROKE),
                  width: toPx(GLYPH_WIDTH),
                }}
              />
            ) : (
              <span className="checkbox__check" style={{ borderColor: visuals.glyphColor }} />
            )
          ) : null}
        </span>
        {effectiveState === 'Pressed' ? (
          <span
            className="checkbox__ripple"
            style={{ backgroundColor: visuals.rippleColor, borderRadius: toPx(STATE_LAYER_RADIUS) }}
          />
        ) : null}
      </span>
    </button>
  );
};

Checkbox.propTypes = {
  onClick: PropTypes.func,
  showFocusIndicator: PropTypes.bool,
  state: PropTypes.oneOf(CHECKBOX_STATES),
  type: PropTypes.oneOf(CHECKBOX_TYPES),
};

export { CHECKBOX_STATES, CHECKBOX_TYPES };
