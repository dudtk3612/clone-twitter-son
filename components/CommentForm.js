import { Button, Form, Input } from 'antd';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentLoading, addCommentDone } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  const [commentText, onChangeCommentText, setCommentText] = useInput('');
  const btnStyle = useMemo(() => ({ float: 'right', zIndex: 100 }), []);

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        content: commentText,
        postId: post.id,
        userId: id,
      },
    });
  }, [commentText, id]);

  return (
    <Form onFinish={onSubmitComment}>
      <Input.TextArea value={commentText} onChange={onChangeCommentText} />
      <div>
        <Button
          type='primary'
          htmlType='submit'
          style={btnStyle}
          loading={addCommentLoading}
        >
          작성완료
        </Button>
      </div>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
