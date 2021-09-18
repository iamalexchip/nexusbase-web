import React from 'react';
import { Meta, Story } from '@storybook/react';
import Workspaces from '../../components/routes/Workspaces';

const meta: Meta = {
  title: 'Pages/Workspace Home',
  component: Workspaces,
};

export default meta;

const Template: Story = (args) => <Workspaces {...args} />;

export const Default = Template.bind({});

//Default.args = {};
