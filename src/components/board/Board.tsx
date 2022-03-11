import React, {useState} from "react";
import {List, Avatar, Badge, Skeleton} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import IconText from "./IconText";

//TODO: 임시 게시글 리스트
const listData: any = [
];


for (let i = 0; i < 23; i++) {
  listData.push({
    href: `/posts/${i}`,
    title: `ant design part ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const Board = () => {
    const [isLoading, setIsLoading] = useState(false);

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
      dataSource={listData}
      renderItem={({avatar, content, description, href, title}) => (
            <List.Item
            key={title}
            actions={ !isLoading && [
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
            extra={
                !isLoading &&
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <Skeleton loading={isLoading} paragraph={{ rows: 3 }} active avatar>
                <Badge.Ribbon text="New" color="red">
                <List.Item.Meta
                  avatar={<Avatar src={avatar} />}
                  title={
                    <a href={href}>
                      {title}
                    </a>
                  }
                  description={description}
                />
                {content}
                </Badge.Ribbon>
            </Skeleton>
        </List.Item>
      )}
    />
  )
}

export default Board;
