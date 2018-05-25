import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
//import Converter from '../containers/Converter/Converter'
import Converter from '../containers/Converter/CompleterConverter'

class App extends Component {
  render() {
    return (
      <div className="App">

        <AppBar position="static">

          <Toolbar>
            <Typography variant="title" color="inherit">
              Converter
            </Typography>
          </Toolbar>

          <Converter />

        </AppBar>

      </div>
    );
  }
}

export default App;
