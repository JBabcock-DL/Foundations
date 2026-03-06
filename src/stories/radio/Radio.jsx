import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './radio.css';
import { token, toPx } from '../tokenResolver';

const RADIO_TYPES = ['Selected', 'Unselected', 'Error selected', 'Error unselected'];
const RADIO_STATES = ['Enabled', 'Hovered', 'Focused', 'Pressed', 'Disabled'];

const OUTER_SIZE = token('Size.size-1200');
const STATE_LAYER_PADDING = token('space.sm');
const WRAPPER_PADDING = token('padding.xs');
const ICON_SIZE = token('Size.size-600');
const GLYPH_SIZE = token('Size.size-500');
const DOT_SIZE = token('Size.size-250');
const GLYPH_STROKE = token('border.md');
const FOCUS_RING_WIDTH = token('border.lg');
const STATE_LAYER_RADIUS = token('radius.full');

const COLORS = {
  active: token('background.primary.default'),
  activeContainer: token('background.primary.container'),
  activeRipple: token('button.secondary.ripple'),
  error: token('background.danger.default'),
  errorContainer: token('background.danger.container'),
  errorRipple: token('button.danger.ripple'),
  disabled: token('background.disabled.default'),
  disabledOn: token('background.disabled.on disabled'),
  focusRing: token('border.default.secondary'),
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

  return type;
}

function buildVisualModel(type, state) {
  const isError = type.startsWith('Error');
  const isSelected = type === 'Selected' || type === 'Error selected';
  const isDisabled = state === 'Disabled';
  const hasOverlay = ['Hovered', 'Focused', 'Pressed'].includes(state);

  const ringColor = isDisabled
    ? COLORS.disabledOn
    : isError
      ? COLORS.error
      : COLORS.active;

  const dotColor = isDisabled
    ? COLORS.disabledOn
    : isError
      ? COLORS.error
      : COLORS.active;

  const overlayColor = hasOverlay
    ? (isError ? COLORS.errorContainer : COLORS.activeContainer)
    : 'transparent';

  const rippleColor = isError ? COLORS.errorRipple : COLORS.activeRipple;

  return {
    dotColor,
    isDisabled,
    isSelected,
    overlayColor,
    ringColor,
    rippleColor,
  };
}

export const Radio = ({
  type = 'Selected',
  state = 'Enabled',
  showFocusIndicator = false,
  onClick,
}) => {
  const [currentType, setCurrentType] = useState(type);
  const [interaction, setInteraction] = useState({ hovered: false, pressed: false });

  useEffect(() => {
    setCurrentType(type);
  }, [type]);

  const isInteractive = state === 'Enabled';
  const effectiveState = resolveEffectiveState(state, interaction);
  const visuals = buildVisualModel(currentType, effectiveState);

  return (
    <button
      aria-checked={visuals.isSelected}
      aria-disabled={visuals.isDisabled}
      className="radio"
      data-node-id="60993:19095"
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
      role="radio"
      style={{
        height: toPx(OUTER_SIZE),
        padding: toPx(WRAPPER_PADDING),
        width: toPx(OUTER_SIZE),
      }}
      type="button"
    >
      <span
        className="radio__container"
        style={{
          borderRadius: toPx(STATE_LAYER_RADIUS),
        }}
      >
        <span
          className="radio__state-layer"
          style={{
            backgroundColor: visuals.overlayColor,
            borderRadius: toPx(STATE_LAYER_RADIUS),
            padding: toPx(STATE_LAYER_PADDING),
          }}
        >
          <span
            className="radio__icon"
            style={{
              height: toPx(ICON_SIZE),
              width: toPx(ICON_SIZE),
            }}
          >
            <span
              className="radio__ring"
              style={{
                borderColor: visuals.ringColor,
                borderRadius: toPx(STATE_LAYER_RADIUS),
                borderWidth: toPx(GLYPH_STROKE),
                height: toPx(GLYPH_SIZE),
                width: toPx(GLYPH_SIZE),
              }}
            >
              {visuals.isSelected ? (
                <span
                  className="radio__dot"
                  style={{
                    backgroundColor: visuals.dotColor,
                    borderRadius: toPx(STATE_LAYER_RADIUS),
                    height: toPx(DOT_SIZE),
                    width: toPx(DOT_SIZE),
                  }}
                />
              ) : null}
            </span>
          </span>
          {effectiveState === 'Pressed' ? (
            <span
              className="radio__ripple"
              style={{
                backgroundColor: visuals.rippleColor,
                borderRadius: toPx(STATE_LAYER_RADIUS),
              }}
            />
          ) : null}
        </span>
      </span>
      {showFocusIndicator && effectiveState === 'Focused' ? (
        <span
          className="radio__focus-indicator"
          style={{
            borderColor: COLORS.focusRing,
            borderRadius: toPx(token('Size.size-full')),
            borderWidth: toPx(FOCUS_RING_WIDTH),
          }}
        />
      ) : null}
    </button>
  );
};

Radio.propTypes = {
  onClick: PropTypes.func,
  showFocusIndicator: PropTypes.bool,
  state: PropTypes.oneOf(RADIO_STATES),
  type: PropTypes.oneOf(RADIO_TYPES),
};

export { RADIO_STATES, RADIO_TYPES };
