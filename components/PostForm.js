import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { ADD_POST_REQUEST } from '../reducers/post';

const PostForm = () => {
  const dispatch = useDispatch();
  const imageInputRef = useRef();
  const { addPostLoading, addPostDone, imagePaths } = useSelector(
    (state) => state.post
  );
  const [text, onChangeText, setText] = useInput('');

  const btnStyle = useMemo(() => ({ float: 'right' }), []);
  const imgWrapperStyle = useMemo(() => ({ display: 'inline-block' }), []);
  const imgStyle = useMemo(() => ({ width: '200px' }), []);

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onImageUpload = useCallback(() => {
    imageInputRef.current.click();
  }, [imageInputRef.current]);

  const onSubmitPost = useCallback(() => {
    dispatch({
      type: ADD_POST_REQUEST,
      data: text,
    });
  }, [text]);

  return (
    <Form onFinish={onSubmitPost} encType='multipart/form-data'>
      <Input.TextArea value={text} onChange={onChangeText} />
      <div>
        <input multiple hidden type='file' ref={imageInputRef} />
        <Button onClick={onImageUpload}>이미지 업로드</Button>
        <Button
          type='primary'
          htmlType='submit'
          style={btnStyle}
          loading={addPostLoading}
        >
          작성완료
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => (
          <div key={v} style={imgWrapperStyle}>
            <img src={v} alt={v} style={imgStyle} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
