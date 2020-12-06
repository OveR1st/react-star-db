import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';



import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-services';
import DummySwapiService from '../../services/dummy-swapi-service';


import './app.css';

import { SwapiServiceProvider } from '../swapi-service-context/';
import { PeoplePage, PlanetPage, StarshipPage } from '../pages/';


export default class App extends Component {

  
  
  state = {
    hasError: false,
    swapiService: new SwapiService()
  }

  onServiceChange = () => {
    this.setState( ({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

      console.log('switched to', Service.name);

      return {
        swapiService: new Service
      }
    })
  }
  
  componentDidCatch() {
    this.setState({ hasError: true });
  }
  
  render(){

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

  return (
    <div>
      <SwapiServiceProvider value={this.state.swapiService} >
        <Header onServiceChange={ this.onServiceChange} />
        <RandomPlanet />
        <PeoplePage />
        <PlanetPage />
        <StarshipPage />
      </SwapiServiceProvider>
    </div>
  );
  };
}
