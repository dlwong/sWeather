import React from 'react';

const Recommendation = () => {

  const randomInt = Math.floor(Math.random() * 6) + 1;
  let title, url;

  switch (randomInt) {
    case 1:
      title = 'STAY COOL';
      url = 'https://weatherdogs.s3-us-west-1.amazonaws.com/cool_dog.jpeg';
      break;
    case 2:
      title = 'HOODIE KIND OF WEATHER';
      url = 'https://weatherdogs.s3-us-west-1.amazonaws.com/hoodie_dog.png';
      break;
    case 3:
      title = 'LIL CHILLY, WEAR DAT PUFFER';
      url = 'https://weatherdogs.s3-us-west-1.amazonaws.com/puffer_dog.jpeg';
      break;
    case 4:
      title = 'GONNA BE RAININ\', KEEP YO\' SELF DRY';
      url = 'https://weatherdogs.s3-us-west-1.amazonaws.com/rain_dog.png';
      break;    
    case 5:
      title = 'TORNADO, NOTHIN\' YOU CAN DO ABOUT IT';
      url = 'https://weatherdogs.s3-us-west-1.amazonaws.com/sad_dog.png';
      break; 
    case 6:
      title = 'ITSA WINDY DAY';
      url = 'https://weatherdogs.s3-us-west-1.amazonaws.com/windbreaker_dog.png';
      break; 
  }

  return ( 
    <div>
      <h1>{title}</h1>
      <img src={url} />
    </div>
    )
}

export default Recommendation;