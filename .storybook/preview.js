import { MockedProvider } from '@apollo/client/testing';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from '../src/store';
import theme from '../src/theme/tailwind';
import GlobalStyle from '../src/theme/GlobalStyle';
import '../src/theme/index.css';

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
  apolloClient: {
    MockedProvider,
  },
};

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    </Provider>
  ),
];
