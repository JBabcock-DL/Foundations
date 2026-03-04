import React from 'react';
import { fn } from 'storybook/test';

import { Checkbox, CHECKBOX_STATES, CHECKBOX_TYPES } from './Checkbox';

export default {
  title: 'Foundations/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: CHECKBOX_TYPES,
    },
    state: {
      control: 'select',
      options: CHECKBOX_STATES,
    },
    showFocusIndicator: { control: 'boolean' },
  },
  args: {
    onClick: fn(),
  },
};

export const Playground = {
  args: {
    type: 'Selected',
    state: 'Enabled',
    showFocusIndicator: false,
  },
};

export const AllTypesByState = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '12px' }}>
      {CHECKBOX_TYPES.map((type) => (
        <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '140px' }}>{type}</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {CHECKBOX_STATES.map((state) => (
              <Checkbox key={`${type}-${state}`} {...args} state={state} type={type} />
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
      <Checkbox {...args} state="Focused" type="Selected" />
      <Checkbox {...args} state="Focused" type="Indeterminate" />
      <Checkbox {...args} state="Focused" type="Unselected" />
      <Checkbox {...args} state="Focused" type="Error selected" />
      <Checkbox {...args} state="Focused" type="Error indeterminate" />
      <Checkbox {...args} state="Focused" type="Error unselected" />
    </div>
  ),
  args: {
    showFocusIndicator: true,
  },
};
