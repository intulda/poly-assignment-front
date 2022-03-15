import React from "react";
import {List, Avatar, Badge, Skeleton} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import IconText from "./IconText";
import {useSelector} from "react-redux";
import {RootState} from "../../reducers";
import {Link} from "react-router-dom";

const Board = () => {
    const {boards, common} = useSelector((state:RootState) => state.board);

    return (
        <List
          itemLayout="vertical"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 5,
            size: 'small'
          }}
          dataSource={boards}
          renderItem={({avatar, contents, id, title, regDate}) => (
                <List.Item
                key={id}
                actions={ !common.boardLoading && [
                  <IconText icon={StarOutlined} text="0" key="list-vertical-star-o" />,
                  <IconText icon={LikeOutlined} text="0" key="list-vertical-like-o" />,
                  <IconText icon={MessageOutlined} text="0" key="list-vertical-message" />,
                ]}
                extra={
                    !common.boardLoading &&
                  <img
                    width={272}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <Skeleton loading={common.boardLoading} paragraph={{ rows: 3 }} active avatar>
                    <Badge.Ribbon text="새글" color="blue">
                    <List.Item.Meta
                      avatar={<Avatar src={avatar} />}
                      title={
                        <Link to={`/board/${id}`}>
                          {title}
                        </Link>
                      }
                      description={regDate}
                    />
                    {contents}
                    </Badge.Ribbon>
                </Skeleton>
            </List.Item>
          )}
        />
    )
}


export default Board;
