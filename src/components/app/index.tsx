import { FC } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../../theme/GlobalStyle';
import { store } from '../../store';
import theme from '../../theme/tailwind';
import Routes from './Routes';
import '../../theme/index.css';
import AttributeModal from '../modals/AttributeModal';

const App: FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes />
      <AttributeModal />
    </ThemeProvider>
  </Provider>
);

export default App;
