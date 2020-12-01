import React, {Component} from 'react';

import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-services';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';

import PeoplePage from '../people-page/';

import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './app.css';

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
        <Header />
        <RandomPlanet />
        <ErrorButton />
  
        <PeoplePage />

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList 
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllPlanets} 
              renderItem={({name, gender, birthYear}) => `${name} (${gender}, ${birthYear})`}/>
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson}/>
          </div>
        </div>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList 
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllStarships}
              renderItem={({name, gender, birthYear}) => `${name} (${gender}, ${birthYear})`} />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson}/>
          </div>
        </div>
      </div>
    );
  };
}
