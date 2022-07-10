import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducers/user';
import Link from 'next/link';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const { logoutLoading, me } = useSelector((state) => state.user);
  const onSubmitLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  return (
    <Card
      actions={[
        <div key='posts'>
          <div>
            게시글
            <br />
            {me.Posts.length}
          </div>
        </div>,
        <div key='following'>
          <Link href='/profile'>
            <a>
              <div>
                팔로잉
                <br />
                {me.Followings.length}
              </div>
            </a>
          </Link>
        </div>,
        <div key='follower'>
          <Link href='/profile'>
            <a>
              <div>
                팔로워
                <br />
                {me.Followers.length}
              </div>
            </a>
          </Link>
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
        description={
          <Button onClick={onSubmitLogout} loading={logoutLoading}>
            로그아웃
          </Button>
        }
      />
    </Card>
  );
};

export default ProfileForm;
