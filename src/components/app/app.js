import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
// import ItemList from '../item-list';

import ItemDetails, { Record } from '../item-details/item-details';

import Row from '../row';

// import PeoplePage from '../people-page/';
// import ErrorButton from '../error-button';

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

  swapiService = new SwapiService();
  
  state = {
    hasError: false
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
      <SwapiServiceProvider value={this.swapiService} >
        <Header />
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
