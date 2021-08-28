import React, { MutableRefObject, useEffect, useRef } from 'react';
import styled from 'styled-components';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import { useSelector } from 'react-redux';
import { seleteRoomId } from '../features/appSlice';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Message from './Message';

function Chat() {
  const roomId = useSelector(seleteRoomId);
  console.log('[Chat] roomId: ', roomId);
  const chatRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [roomDetails] = useDocument(roomId ? db.collection('rooms').doc(roomId) : undefined);
  const [roomMessages, loading] = useCollection(
    roomId
      ? db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc')
      : undefined
  );

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [roomId, loading]);

  if (!roomId) {
    return (
      <ChatContainer>
        <p>Loading.....</p>
      </ChatContainer>
    );
  }

  if (roomDetails?.data() === undefined) return <p>....</p>;

  return (
    <ChatContainer>
      <>
        <Header>
          <HeaderLeft>
            <h4>
              <strong>#{roomDetails.data() && roomDetails.data()!.name}</strong>
            </h4>
            <StarBorderOutlinedIcon />
          </HeaderLeft>

          <HeaderRight>
            <p>
              <InfoOutlinedIcon /> Details
            </p>
          </HeaderRight>
        </Header>

        <ChatMessages>
          {roomMessages?.docs.map((doc) => {
            const { message, timestamp, user, userImage } = doc.data();
            console.log('채팅 내역: ', message, timestamp, user, userImage);
            return (
              <Message message={message} timestamp={timestamp} user={user} userImage={userImage} />
            );
          })}
          <ChatBottom ref={chatRef} />
        </ChatMessages>

        <ChatInput chatRef={chatRef} channelName={roomDetails?.data()!.name} channelId={roomId} />
      </>
    </ChatContainer>
  );
}

const ChatBottom = styled.div`
  padding-bottom: 200px;
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const Header = styled.div`
  /*  */
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: right;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatMessages = styled.div`
  /*  */
`;

export default Chat;
