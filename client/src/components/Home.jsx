import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Home() {
  
  const StyledLink = styled(Link)`
    color: #6d6e71;
    font-weight: bold;
  `;

  const Wrapper = styled.div`
    padding: 4em;
    text-align: center;
  `;

  return(
      <Wrapper>
        <img src = "https://i.imgur.com/9uQz7kg.png" />
        <p>
          <StyledLink to="/login">LOGIN</StyledLink><br /><br />
          <StyledLink to="/signup">SIGN UP</StyledLink>
        </p>
      </Wrapper>
  )
}