import { SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { enterRoom } from '../features/appSlice';
import { db } from '../firebase';

interface ISidebarOption {
  Icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  id?: string;
  AddChannelOption?: boolean;
  title: string;
}

function SidebarOption({ Icon, id, title, AddChannelOption }: ISidebarOption) {
  const dispatch = useDispatch();

  const addChannel = () => {
    const channelName = prompt('Please enter the channel name');

    if (channelName) {
      db.collection('rooms').add({
        name: channelName,
      });
    }
  };

  const selectChannel = () => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };

  return (
    <SidebarOptionContainer onClick={AddChannelOption ? addChannel : selectChannel}>
      {Icon && <Icon fontSize="small" style={{ padding: '10px' }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span> {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
}

const SidebarOptionContainer = styled.div`
  /*  */
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }
`;

const SidebarOptionChannel = styled.h3`
  /*  */
  padding: 10px 0;
  font-weight: 300;
`;

export default SidebarOption;
