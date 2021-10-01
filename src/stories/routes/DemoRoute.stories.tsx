import React from 'react';
import { Meta, Story } from '@storybook/react';
import Demo from '../../components/routes/DemoRoute';
import demoQuery from '../../api/queries/demoQuery';

const meta: Meta = {
  title: 'Pages/Demo',
  component: Demo,
};

export default meta;

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: demoQuery,
        },
        result: {
          data: {
            someData: {
              someField: 'fefef',
            },
          },
        },
      },
    ],
  },
};
