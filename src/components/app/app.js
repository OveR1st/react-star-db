import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-services';
import DummySwapiService from '../../services/dummy-swapi-service';

import './app.css';

import { SwapiServiceProvider } from '../swapi-service-context/';
import {
  PeoplePage,
  PlanetPage,
  StarshipsPage,
  LoginPage,
  SecretPage } from '../pages/';

import { 
  BrowserRouter as Router,
  Route,
  Switch } from 'react-router-dom';

import { StarshipDetails } from '../sw-components';


export default class App extends Component {

  state = {
    hasError: false,
    swapiService: new SwapiService(),
    isLoggedIn: false
  }

  onLogin = () => {
    this.setState({ isLoggedIn: true });
  }

  onServiceChange = () => {
    this.setState( ({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      return {
        swapiService: new Service()
      }
    })
  }
  
  componentDidCatch() {
    this.setState({ hasError: true });
  }
  
  render(){

    const { isLoggedIn } = this.state;

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

  return (
    <div>
      <SwapiServiceProvider value={this.state.swapiService} >
        <Router>
          <Header onServiceChange={ this.onServiceChange} />
          <RandomPlanet />
          
          <Switch>
            <Route path="/" render={ () => <h2>Welcome to StarDB</h2>} exact/>
            <Route path="/people" render={ () => <h2>People</h2>} />

            <Route path="/people/:id?" component={PeoplePage} />
            <Route path="/planets" component={PlanetPage} />

            <Route path="/starships" exact component={StarshipsPage} />
            <Route path="/starships/:id" render={({match}) => {
              const { id } = match.params;
              return <StarshipDetails itemId={id}/>
            }} />

            <Route 
              path="/login"
              render={() => (
                <LoginPage 
                  isLoggedIn={isLoggedIn}
                  isLoggin={this.onLogin}/>
              )}/>
            <Route 
              path="/secret"
              render={() => (
                <SecretPage 
                  isLoggedIn={isLoggedIn}/>
              )} />
            <Route render={() => <h2>Page not found</h2>}/>
          </Switch>
        </Router>
      </SwapiServiceProvider>
    </div>
  );
  };
}
