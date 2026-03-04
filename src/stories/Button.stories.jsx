import { fn } from 'storybook/test';

import { Button } from './Button';

export default {
  title: 'Foundations/PrimaryButton',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['XSmall', 'Small', 'Medium', 'Large', 'XLarge'],
    },
    state: {
      control: 'select',
      options: ['Enabled', 'Hovered', 'Focused', 'Pressed', 'Disabled'],
    },
    showLeadingIcon: { control: 'boolean' },
    showTrailingIcon: { control: 'boolean' },
    showFocusIndicator: { control: 'boolean' },
  },
  args: {
    onClick: fn(),
  },
};

export const Playground = {
  args: {
    label: 'Label',
    size: 'Small',
    state: 'Enabled',
    showLeadingIcon: true,
    showTrailingIcon: true,
    showFocusIndicator: false,
  },
};

const sizes = ['XSmall', 'Small', 'Medium', 'Large', 'XLarge'];
const states = ['Enabled', 'Hovered', 'Focused', 'Pressed', 'Disabled'];

export const AllSizes = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '16px' }}>
      {sizes.map((size) => (
        <Button key={size} {...args} size={size} state="Enabled" />
      ))}
    </div>
  ),
  args: {
    label: 'Label',
    showLeadingIcon: true,
    showTrailingIcon: true,
    showFocusIndicator: false,
  },
};

export const AllStates = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '16px' }}>
      {states.map((state) => (
        <Button key={state} {...args} state={state} />
      ))}
    </div>
  ),
  args: {
    label: 'Label',
    size: 'Medium',
    showLeadingIcon: true,
    showTrailingIcon: true,
    showFocusIndicator: false,
  },
};

export const VariantMatrix = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '24px' }}>
      {sizes.map((size) => (
        <div key={size} style={{ display: 'grid', gap: '12px' }}>
          <strong>{size}</strong>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {states.map((state) => (
              <Button key={`${size}-${state}`} {...args} size={size} state={state} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  args: {
    label: 'Label',
    showLeadingIcon: true,
    showTrailingIcon: true,
    showFocusIndicator: false,
  },
};
