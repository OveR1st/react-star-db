import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';


import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-services';
import DummySwapiService from '../../services/dummy-swapi-service';


import './app.css';

import { SwapiServiceProvider } from '../swapi-service-context/';

import {  PersonDetails,
          PlanetDetails,
          StarshipDetails,
          PersonList,
          PlanetList,
          StarshipList } from '../sw-components/';

export default class App extends Component {

  
  
  state = {
    hasError: false,
    swapiService: new DummySwapiService()
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

        <PersonList />
        <StarshipList />
        <PersonDetails itemId={2}/>
        <StarshipDetails itemId={3}/>
        <PlanetDetails itemId={5}/>
      </SwapiServiceProvider>
    </div>
  );
  };
}
