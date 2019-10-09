import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Wrapper = styled.div`
  font-family: 'Montserrat';
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

class Recommendation extends Component {
  constructor(props){
    super(props);

    this.state = {
      predict: 0,
    }
  }

  componentDidMount() {
    axios.get('/recs')
    .then(res => {
      this.setState({predict: res.data.value});
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    const { predict } = this.state;
    let title, url;

        switch (true) {
          case (predict > 5):
            title = 'COOPER say STAY COOL';
            url = 'https://weatherdogs.s3-us-west-1.amazonaws.com/cool.png';
            break;
          case (predict > 4.5):
            title = 'MAX says IT\'S A HOODIE KIND OF WEATHER';
            url = 'https://weatherdogs.s3-us-west-1.amazonaws.com/hoodie.png';
            break;
          case (predict > 3):
            title = 'MILLIE says IT\'S A LIL CHILLY SO WEAR DAT PUFFER';
            url = 'https://weatherdogs.s3-us-west-1.amazonaws.com/puffer.png';
            break;
          case (predict > 2.5):
            title = 'BEAR says IT\'S GONNA BE RAININ\', KEEP YO\' SELF DRY';
            url = 'https://weatherdogs.s3-us-west-1.amazonaws.com/rain.png';
            break;    
          case (predict > 2):
            title = 'ROCKY says IT\'S GONNA BE A TORNADO';
            url = 'https://weatherdogs.s3-us-west-1.amazonaws.com/sad.png';
            break; 
          case (predict > 1):
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
}
  
  export default Recommendation;