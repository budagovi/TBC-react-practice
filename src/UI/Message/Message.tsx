'use client'

// *
// * Custom pop-up message component
// *

// --- react api
import { ReactNode } from "react";
// --- antd
import { Space, message } from "antd"


interface IProps {
  children: ReactNode,
  msgType: 'error' | 'warning' | 'success',
  msgText: string
}
const Message = ({ children, msgType, msgText }: IProps) => {

  const [messageApi, contextHolder] = message.useMessage();
  const types = {

    success: () => {
      messageApi.open({
        type: 'success',
        content: msgText,
      });
    },
    error: () => {
      messageApi.open({
        type: 'error',
        content: msgText,
      });
    },
    warning: () => {
      messageApi.open({
        type: 'warning',
        content: msgText,
      });
    }
    
  }

  return (
    <>
      {contextHolder}
      <Space onClick={types[msgType]}>
        <span >
          {children}
        </span>
      </Space>
    </>
  );
};


export default Message;

/*-=-=-=-=-=-=-=-

  Input value is Controlled within given component using useState
  and only passes date value (in number type - amount of milliseconds) 
  to its parent component (form tag).

  To get the Date object from outgoing value use dayjs(value) function.

  -=-=-=-=-=-=-=-*/