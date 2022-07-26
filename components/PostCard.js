import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, Button, Card, Comment, List, Popover } from 'antd';
import PropTypes from 'prop-types';
import PostImages from './PostImages';
import {
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import CommentForm from './CommentForm';
import PostContent from './PostContent';
import { REMOVE_POST_REQUEST, UPDATE_POST_REQUEST } from '../reducers/post';
import FollowButton from './FollowButton';
import PostUpdateForm from './PostUpdateForm';
import DeclarationForm from './DeclarationForm';

const PostCard = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const { removePostLoading, updatePostDone, declarationDone } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [commentForm, setCommentForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [declarationForm, setDeclarationForm] = useState(false);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentForm((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [post]);

  const onUpdateForm = useCallback(() => {
    setUpdateForm(true);
  }, []);

  const onCloseUpdate = useCallback(() => {
    setUpdateForm(false);
  }, []);

  const onUpdatePost = useCallback(
    (text) => {
      dispatch({
        type: UPDATE_POST_REQUEST,
        data: {
          PostId: post.id,
          content: text,
        },
      });
    },
    [post]
  );

  const onDeclaration = useCallback(() => {
    setDeclarationForm(true);
  }, []);

  const onCancelSubmit = useCallback(() => {
    setDeclarationForm(false);
  }, []);

  useEffect(() => {
    if (updatePostDone) {
      onCloseUpdate();
    }
  }, [updatePostDone]);

  useEffect(() => {
    if (declarationDone) {
      onCancelSubmit();
    }
  }, [declarationDone]);

  return (
    <>
      {declarationForm && (
        <DeclarationForm
          setDeclarationForm={setDeclarationForm}
          post={post}
          onCancelSubmit={onCancelSubmit}
        />
      )}
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key='retweet' />,
          id && liked ? (
            <HeartTwoTone
              twoToneColor='#F67BC8'
              key='heart'
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key='heart' onClick={onToggleLike} />
          ),
          <MessageOutlined key='message' onClick={onToggleComment} />,
          <Popover
            key='more'
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button onClick={onUpdateForm}>수정</Button>
                    <Button
                      type='danger'
                      onClick={onRemovePost}
                      loading={removePostLoading}
                    >
                      삭제
                    </Button>
                  </>
                ) : (
                  id && <Button onClick={onDeclaration}>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={id && post.User.id !== id && <FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={
            updateForm ? (
              <PostUpdateForm
                postData={post.content}
                onCloseUpdate={onCloseUpdate}
                onUpdatePost={onUpdatePost}
              />
            ) : (
              <PostContent postData={post.content} />
            )
          }
        />
      </Card>

      {id && commentForm && (
        <>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            dataSource={post.Comments}
            itemLayout='horizontal'
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </>
      )}
    </>
  );
};

PostCard.propTyeps = {
  post: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostCard;
