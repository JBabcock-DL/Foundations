import React from 'react';
import { fn } from 'storybook/test';

import { Radio, RADIO_STATES, RADIO_TYPES } from './Radio';

export default {
  title: 'Foundations/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: RADIO_TYPES,
    },
    state: {
      control: 'select',
      options: RADIO_STATES,
    },
    showFocusIndicator: { control: 'boolean' },
  },
  args: {
    onClick: fn(),
  },
};

export const Playground = {
  args: {
    type: 'Unselected',
    state: 'Enabled',
    showFocusIndicator: false,
  },
};

export const AllTypesByState = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '12px' }}>
      {RADIO_TYPES.map((type) => (
        <div key={type} style={{ alignItems: 'center', display: 'flex', gap: '12px' }}>
          <span style={{ width: '140px' }}>{type}</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {RADIO_STATES.map((state) => (
              <Radio key={`${type}-${state}`} {...args} state={state} type={type} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  args: {
    showFocusIndicator: false,
  },
};

export const FocusIndicator = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Radio {...args} state="Focused" type="Selected" />
      <Radio {...args} state="Focused" type="Unselected" />
      <Radio {...args} state="Focused" type="Error selected" />
      <Radio {...args} state="Focused" type="Error unselected" />
    </div>
  ),
  args: {
    showFocusIndicator: true,
  },
};
