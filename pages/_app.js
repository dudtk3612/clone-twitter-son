import React from 'react';
import 'antd/dist/antd.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { createWrapper } from 'next-redux-wrapper';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from '../store/store';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import Head from 'next/head';

const CloneTwitter = ({ Component }) => {
  const themes = {
    dark: '/antd.dark-theme.css',
    light: '/antd.light-theme.css',
  };
  return (
    <ThemeSwitcherProvider themeMap={themes} defaultTheme='light'>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Head>
            <link rel='shortcut icon' href='/images/favicon.ico' />
          </Head>
          <Component />;
        </PersistGate>
      </Provider>
    </ThemeSwitcherProvider>
  );
};

const makestore = () => store;
const wrapper = createWrapper(makestore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper.withRedux(CloneTwitter);
