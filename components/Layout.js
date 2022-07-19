import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Col, Input, Menu, Row, Switch } from 'antd';
import { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import ProfileForm from './ProfileForm';
import LoginForm from './LoginForm';
import useInput from '../hooks/useInput';
import Router from 'next/router';
import { useThemeSwitcher } from 'react-css-theme-switcher';

const Global = createGlobalStyle`
  .ant-card-bordered {
    border: none;
  }
  
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  .ant-col:first-child {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .ant-col:last-child {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .ant-menu-horizontal {
    border: none !important;
  }
`;

const Layout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const [inputSearch, onChangeInputSearch] = useInput('');

  const onSubmitSearch = useCallback(() => {
    Router.push(`/hashtag/${inputSearch}`);
  }, [inputSearch]);

  const [isDark, setIsDark] = useState();
  const { switcher, themes } = useThemeSwitcher();

  const toggleTheme = useCallback(
    (isChecked) => {
      setIsDark(isChecked);
      switcher({ theme: isChecked ? themes.dark : themes.light });
    },
    [themes]
  );

  const searchInput = useMemo(
    () => ({ verticalAlign: 'middle', maxWidth: '180px' }),
    []
  );

  const menuStyle = useMemo(() => ({ display: 'initial' }), []);
  const switchStyle = useMemo(() => ({ marginLeft: '20px' }), []);
  const linkStyle = useMemo(
    () => ({ verticalAlign: 'middle', marginLeft: '20px' }),
    []
  );

  const items = [
    {
      label: (
        <Link href='/'>
          <a>클론트위터</a>
        </Link>
      ),
      key: '/',
    }, // remember to pass the key prop
    {
      label: (
        <Link href='/profile'>
          <a>프로필</a>
        </Link>
      ),
      key: '/profile',
    }, // which is required
    {
      label: (
        <Input.Search
          style={searchInput}
          enterButton
          value={inputSearch}
          onChange={onChangeInputSearch}
          onSearch={onSubmitSearch}
        />
      ),
      key: '/search',
    },
  ];

  return (
    <>
      <Switch
        checked={isDark}
        onChange={toggleTheme}
        checkedChildren='🌜'
        unCheckedChildren='🌞'
        style={switchStyle}
      />
      <a
        href='https://github.com/dudtk3612/clone-twitter-son'
        target='_blank'
        rel='noreferrer noopener'
        style={linkStyle}
      >
        clone-twitter / github
      </a>
      <a
        href='https://emotion-diary-sys.web.app/'
        target='_blank'
        rel='noreferrer noopener'
        style={linkStyle}
      >
        내 포트폴리오
      </a>
      <Global />
      <Menu items={items} mode='horizontal' style={menuStyle} />
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <ProfileForm /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6} />
      </Row>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
