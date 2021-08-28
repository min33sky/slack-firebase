import { Button } from '@material-ui/core';
import React, { MutableRefObject, useState } from 'react';
import styled from 'styled-components';
import { db, firebase } from '../firebase';

interface IChatInput {
  chatRef: MutableRefObject<HTMLDivElement | null>;
  channelId: string;
  channelName: string;
}

function ChatInput({ channelId, channelName, chatRef }: IChatInput) {
  const [input, setInput] = useState('');

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    db.collection('rooms').doc(channelId).collection('messages').add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: 'chelsea',
      userImage: `https://upload.wikimedia.org/wikipedia/ko/thumb/a/ae/Chelsea_FC_Logo.svg/209px-Chelsea_FC_Logo.svg.png`,
    });

    if (chatRef.current) {
      chatRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }

    setInput('');
  };

  return (
    <ChatInputContainer>
      <form onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder={`Message #${channelName}`}
        />
        <Button hidden type="submit">
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;

export default ChatInput;
