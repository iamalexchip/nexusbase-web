import React from 'react';
import { Meta, Story } from '@storybook/react';
import { MyWorkspaces } from '../../components/routes/MyWorkspaces';

const meta: Meta = {
  title: 'Pages/Workspace Home',
  component: MyWorkspaces,
};

export default meta;

const Template: Story = (args) => <MyWorkspaces {...args} />;

export const Default = Template.bind({});

//Default.args = {};
