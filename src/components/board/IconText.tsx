import React from "react";
import { Space } from "antd";

interface IconTextType {
  icon: any,
  text: string
}

const IconText = ({ icon, text }: IconTextType) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default IconText;
