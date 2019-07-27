import React from 'react';
import styled from 'styled-components';

const SideMenuWrapper = styled.div`
    width: 200px;
    display: flex;
    flex-direction: column;
    background: white;
    height:100%;
`;

const MenuItem = styled.div`
    padding: 10px;
    font-size: 16px;
    &:hover {
        background-color: #EEEEEE;
        cursor: pointer;
    }
`;

const SideMenu = () => (
    <SideMenuWrapper>
        <MenuItem>one</MenuItem>
        <MenuItem>two</MenuItem>
    </SideMenuWrapper>
)

export default SideMenu;