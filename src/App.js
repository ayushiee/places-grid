import React from 'react';
import './App.css';
import Header from './components/header';
import Home from './components/home';
import Grid from './components/Grid';
import { GridData } from './static';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DetailScreen from './screens/DetailScreen';

const HomeScreen = () => (
  <div className="main">
    <Header />
    <Home />
    <Grid data={GridData} />
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={HomeScreen} />
          <Route path='/:word' exact component={DetailScreen} />
            
        </Switch>
      </Router>
    );
  }
}

export default App;
