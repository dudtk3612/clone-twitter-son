import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { List, Button, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { UNFOLLOW_REQUEST } from '../reducers/user';

const FollowList = ({ header, data }) => {
  const dispatch = useDispatch();
  const listStyle = useMemo(() => ({ marginTop: '20px' }), []);
  const gridStyle = useMemo(() => ({ gutter: 4, xs: 2, md: 3 }), []);
  const moreStyle = useMemo(
    () => ({
      textAlign: 'center',
      marginTop: '10px',
      marginBottom: '10px',
    }),
    []
  );
  const listItemStyle = useMemo(() => ({ marginTop: '20px' }), []);

  const onRemoveFollowings = useCallback((id) => {
    dispatch({
      type: UNFOLLOW_REQUEST,
      data: {
        id,
      },
    });
  }, []);

  return (
    <List
      style={listStyle}
      bordered
      grid={gridStyle}
      loadMore={
        <div style={moreStyle}>
          <Button>더 보기</Button>
        </div>
      }
      size='small'
      itemLayout='horizontal'
      header={<div>{header}</div>}
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={listItemStyle}>
          <Card
            actions={[
              <StopOutlined
                onClick={() => onRemoveFollowings(item.id)}
                key='stop'
              />,
            ]}
          >
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FollowList;
