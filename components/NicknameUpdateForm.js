import React, { useCallback, useState } from 'react';
import { Input, Form } from 'antd';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const FormBox = styled(Form)`
  border: 1px solid #f0f0f0;
  padding: 20px;
`;

const NicknameUpdateForm = () => {
  const dispatch = useDispatch();
  const { me, changeNicknameLoading } = useSelector((state) => state.user);
  const [nicknameData, setNicknameData] = useState(me.nickname);

  const onChangeNicknameData = useCallback((e) => {
    setNicknameData(e.target.value);
  }, []);

  const onSubmitChangeNickname = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nicknameData,
    });
  }, [nicknameData]);

  return (
    <FormBox>
      <Input.Search
        enterButton='수정'
        addonBefore='닉네임'
        value={nicknameData}
        onChange={onChangeNicknameData}
        onSearch={onSubmitChangeNickname}
        loading={changeNicknameLoading}
      />
    </FormBox>
  );
};

export default NicknameUpdateForm;
