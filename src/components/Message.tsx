import React from 'react';
import styled from 'styled-components';

interface IMessage {
  message: string;
  timestamp: any;
  user: string;
  userImage: string;
}

function Message({ message, timestamp, user, userImage }: IMessage) {
  return (
    <MessageContainer>
      <img src={userImage} alt="chat_image" />
      <MessageInfo>
        <h4>
          {user} <span>{new Date(timestamp?.toDate()).toLocaleString()}</span>
        </h4>
        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
}

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  > img {
    height: 50px;
    border-radius: 8px;
  }
`;

const MessageInfo = styled.div`
  padding-left: 10px;

  > h4 > span {
    color: gray;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
  }
`;

export default Message;
