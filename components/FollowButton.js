import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';

import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector(
    (state) => state.user
  );
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);

  const onFollow = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: {
          id: post.User.id,
          nickname: post.User.nickname,
        },
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: {
          id: post.User.id,
          nickname: post.User.nickname,
        },
      });
    }
  }, [isFollowing]);

  return (
    <div>
      {isFollowing ? (
        <Button
          type='danger'
          loading={followLoading || unfollowLoading}
          onClick={onFollow}
        >
          언팔로우
        </Button>
      ) : (
        <Button
          type='primary'
          loading={followLoading || unfollowLoading}
          onClick={onFollow}
        >
          팔로우
        </Button>
      )}
    </div>
  );
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
