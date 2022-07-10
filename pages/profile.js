import React, { useEffect } from 'react';
import FollowList from '../components/FollowList';
import NicknameUpdateForm from '../components/NicknameUpdateForm';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import Head from 'next/head';
import Layout from '../components/Layout';

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.replace('/');
    }
  }, [me && me.id]);

  if (!me) {
    return;
  }

  return (
    <Layout>
      <Head>
        <title>클론트위터 | 프로필</title>
      </Head>
      <NicknameUpdateForm />
      <FollowList header='팔로잉' data={me.Followings} />
      <FollowList header='팔로워' data={me.Followers} />
    </Layout>
  );
};

export default Profile;
