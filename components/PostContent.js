import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const PostContent = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link key={i} href={`/hashtag/${v.slice(1)}`}>
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
};

PostContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostContent;
