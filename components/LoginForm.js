import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import useInput from '../hooks/useInput';
import { LOG_IN_REQUEST } from '../reducers/user';

const FormBox = styled(Form)`
  padding: 20px;
`;

const LoginForm = () => {
  const { loginLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onSubmitLogin = useCallback(() => {
    dispatch({
      type: LOG_IN_REQUEST,
      data: {
        email,
        password,
      },
    });
  }, [email, password]);

  return (
    <FormBox onFinish={onSubmitLogin}>
      <div>
        <label>이메일</label>
        <br />
        <Input
          required
          name='user-email'
          type='email'
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div>
        <label>비밀번호</label>
        <br />
        <Input
          required
          name='user-password'
          type='password'
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div>
        <Button type='primary' htmlType='submit' loading={loginLoading}>
          로그인
        </Button>
        <Link href='/signup'>
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </div>
    </FormBox>
  );
};

export default LoginForm;
