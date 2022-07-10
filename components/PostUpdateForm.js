import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

const PostUpdateForm = ({ postData, onCloseUpdate, onUpdatePost }) => {
  const { updatePostLoading } = useSelector((state) => state.post);
  const [updateText, setUpdateText] = useState(postData);
  const onChangeUpdateText = useCallback((e) => {
    setUpdateText(e.target.value);
  }, []);

  return (
    <Form onFinish={() => onUpdatePost(updateText)}>
      <Input.TextArea value={updateText} onChange={onChangeUpdateText} />
      <div>
        <Button onClick={onCloseUpdate}>수정취소</Button>
        <Button type='primary' htmlType='submit' loading={updatePostLoading}>
          수정완료
        </Button>
      </div>
    </Form>
  );
};

PostUpdateForm.propTypes = {
  postData: PropTypes.string.isRequired,
  onCloseUpdate: PropTypes.func.isRequired,
  onUpdatePost: PropTypes.func.isRequired,
};

export default PostUpdateForm;
