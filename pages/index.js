import Head from 'next/head';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, morePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (morePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts, morePosts, loadPostsLoading]);

  return (
    <Layout>
      <Head>
        <meta charSet='utf-8' />
        <title>클론트위터</title>
      </Head>
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </Layout>
  );
};

export default Home;
