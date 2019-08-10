import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      dog: null,
      header: 0
    }
  }

  componentDidMount() {
    this.getDog();
  }

  getDog() {
    axios.get('/api')
      .then(response => {
        this.setState({
          dog: response.data.url,
          header: response.data.id
        });
      }).catch(function (error) {
        console.log(error);
    });
  }

  render() {
    let title;

    switch (this.state.header) {
      case 1:
        title = 'STAY COOL';
        break;
      case 2:
        title = 'HOODIE KIND OF WEATHER';
        break;
      case 3:
        title = 'LIL CHILLY, WEAR DAT PUFFER';
        break;
      case 4:
        title = 'GONNA BE RAININ\', KEEP YO\' SELF DRY';
        break;    
      case 5:
        title = 'TORNADO, NOTHIN\' YOU CAN DO ABOUT IT';
        break; 
      case 6:
        title = 'ITSA WINDY DAY';
        break; 
    }

    return (
      <div>
        <h1>{title}</h1>
        <img src = {this.state.dog} />
      </div>
      );
  }
}

export default App;
