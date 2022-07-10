import { Button, Checkbox, Form, Input } from 'antd';
import Head from 'next/head';
import Router from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Layout from '../components/Layout';
import useInput from '../hooks/useInput';
import { SIGN_UP_REQUEST } from '../reducers/user';

const ErrorMessage = styled.div`
  color: red;
`;

const FormBox = styled(Form)`
  padding: 20px;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { signupLoading, signupDone } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  }, [me && me.id]);

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmitSignup = useCallback(() => {
    if (password !== passwordCheck) {
      setPasswordError(true);
      return;
    }
    if (!term) {
      setTermError(true);
      return;
    }
    if (signupDone) {
      dispatch({
        type: SIGN_UP_REQUEST,
        data: { email, password, nickname },
      });
    }
    Router.replace('/');
  }, [term, password, passwordCheck, email, nickname]);

  return (
    <Layout>
      <Head>
        <title>클론트위터 | 회원가입</title>
      </Head>
      <FormBox onFinish={onSubmitSignup}>
        <div>
          <label>이메일</label>
          <br />
          <Input
            name='user-email'
            type='email'
            value={email}
            onChange={onChangeEmail}
            required
          />
        </div>
        <div>
          <label>닉네임</label>
          <br />
          <Input
            name='user-nickname'
            value={nickname}
            onChange={onChangeNickname}
            required
          />
        </div>
        <div>
          <label>비밀번호</label>
          <br />
          <Input
            name='user-password'
            type='password'
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>
        <div>
          <label>비밀번호 체크</label>
          <br />
          <Input
            name='user-password-check'
            type='password'
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            required
          />
        </div>
        {passwordError && (
          <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
        )}
        <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>
          가입에 동의하시겠습니까?
        </Checkbox>
        {termError && (
          <ErrorMessage>가입에 동의하지 않으셨습니다.</ErrorMessage>
        )}
        <div>
          <Button type='primary' htmlType='submit' loading={signupLoading}>
            가입완료
          </Button>
        </div>
      </FormBox>
    </Layout>
  );
};

export default Signup;
