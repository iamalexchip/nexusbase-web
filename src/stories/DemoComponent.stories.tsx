import React from 'react';
import { Meta, Story } from '@storybook/react';
import Demo from '../components/DemoComponent';

const meta: Meta = {
  title: 'Demo',
  component: Demo,
};

export default meta;

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {};
