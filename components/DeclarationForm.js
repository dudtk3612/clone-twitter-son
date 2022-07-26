import { Button, Form, Input } from 'antd';
import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import useInput from '../hooks/useInput';
import { DECLARATION_REQUEST } from '../reducers/post';

const DeclarationWrapper = styled(Form)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.8);
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const TitleInput = styled(Input.TextArea)`
  width: 400px !important;
  height: 50px !important;
  resize: none;
`;

const DescInput = styled(Input.TextArea)`
  width: 400px !important;
  height: 350px !important;
  resize: none;
`;

const BtnWrapper = styled.div`
  width: 400px;
  position: relative;
`;

const BtnCancelWrapper = styled(Button)`
  float: left;
`;

const BtnSubmitWrapper = styled(Button)`
  float: right;
`;

const DeclarationForm = ({ post, onCancelSubmit }) => {
  const titleRef = useRef();
  const contentRef = useRef();
  const dispatch = useDispatch();
  const { declarationLoading } = useSelector((state) => state.post);
  const id = useSelector((state) => state.user.me?.id);
  const [titleText, onChangeTitleText] = useInput('');
  const [descText, onChangeDescText] = useInput('');

  const onSubmitDeclaration = useCallback(() => {
    if (!(titleText.length >= 5)) {
      titleRef.current.focus();
      return;
    }
    if (!(descText.length >= 8)) {
      contentRef.current.focus();
      return;
    }
    dispatch({
      type: DECLARATION_REQUEST,
      data: {
        post: post.id,
        postId: post.User.id,
        userId: id,
        content: {
          titleText,
          descText,
        },
      },
    });
  }, [post, id, titleText, descText]);

  return (
    <DeclarationWrapper>
      <InputWrapper>
        <TitleInput
          ref={titleRef}
          placeholder='제목'
          value={titleText}
          onChange={onChangeTitleText}
        />
        <DescInput
          ref={contentRef}
          placeholder='신고사유'
          value={descText}
          onChange={onChangeDescText}
        />
        <BtnWrapper>
          <BtnCancelWrapper type='danger' onClick={onCancelSubmit}>
            취소
          </BtnCancelWrapper>
          <BtnSubmitWrapper
            type='primary'
            onClick={onSubmitDeclaration}
            loading={declarationLoading}
          >
            신고완료
          </BtnSubmitWrapper>
        </BtnWrapper>
      </InputWrapper>
    </DeclarationWrapper>
  );
};

DeclarationForm.propTypes = {
  post: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCancelSubmit: PropTypes.func.isRequired,
};

export default DeclarationForm;
