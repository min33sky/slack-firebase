import { Avatar } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import React from 'react';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
`;

const HeaderAvatar = styled(Avatar)`
  /* todo */
  cursor: pointer;

  :hover {
    opacity: 0.7;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 0.3;
  margin-left: 20px;
  margin-right: 30px;

  /* Icon */
  > .MuiSvgIcon-root {
    margin-left: auto;
  }
`;

const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  text-align: center;
  display: flex;
  padding: 0 50px;
  color: gray;
  border: 1px gray solid;

  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 0.3;
    outline: 0;
    color: white;
  }
`;

const HeaderRight = styled.div`
  /*  */
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;

function Header() {
  const [user] = useAuthState(auth);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <HeaderContainer>
      {/* Header Left */}
      <HeaderLeft>
        <HeaderAvatar onClick={() => auth.signOut()} alt={user.displayName!} src={user.photoURL!} />
        <AccessTimeIcon />
      </HeaderLeft>
      {/* Header Search */}

      <HeaderSearch>
        <SearchIcon />
        <input type="text" placeholder="Search..." />
      </HeaderSearch>

      {/* Header RIght */}
      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;
