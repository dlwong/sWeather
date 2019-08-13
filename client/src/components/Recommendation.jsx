import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-family: 'Montserrat';
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Recommendation = () => {

  const randomInt = Math.floor(Math.random() * 6) + 1;
  let title, url;

  switch (randomInt) {
    case 1:
      title = 'COOPER say STAY COOL';
      url = 'https://weatherdogs.s3-us-west-1.amazonaws.com/cool.png';
      break;
    case 2:
      title = 'MAX says IT\'S A HOODIE KIND OF WEATHER';
      url = 'https://weatherdogs.s3-us-west-1.amazonaws.com/hoodie.png';
      break;
    case 3:
      title = 'MILLIE says IT\'S A LIL CHILLY SO WEAR DAT PUFFER';
      url = 'https://weatherdogs.s3-us-west-1.amazonaws.com/puffer.png';
      break;
    case 4:
      title = 'BEAR says IT\'S GONNA BE RAININ\', KEEP YO\' SELF DRY';
      url = 'https://weatherdogs.s3-us-west-1.amazonaws.com/rain.png';
      break;    
    case 5:
      title = 'ROCKY says IT\'S GONNA BE A TORNADO';
      url = 'https://weatherdogs.s3-us-west-1.amazonaws.com/sad.png';
      break; 
    case 6:
      title = 'DUKE says IT\'S GONNA BE A WINDY DAY';
      url = 'https://weatherdogs.s3-us-west-1.amazonaws.com/wind.png';
      break; 
  }

  return ( 
    <Wrapper>
      <h1>{title}</h1>
      <img src={url} />
    </Wrapper>
    )
}

export default Recommendation;