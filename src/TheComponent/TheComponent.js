import React from "react";

import styled from "styled-components"

const SideBarWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100vh;
    display: block;
    z-index: 2;
    translation: transform 0.s ease-in-out;
`;

const TheComponent = () => {
    return(
        <div>
            <SideBarWrapper></SideBarWrapper>
        </div>
    )
}

export default TheComponent;

