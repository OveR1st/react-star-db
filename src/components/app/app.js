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

import './app.css';

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

  // const personDetails = (
  // <ItemDetails 
  //   itemId={15}
  //   getData={getPerson}
  //   getImageUrl={getPersonImage}>

  //   <Record field="gender" label="Gender"/>
  //   <Record field="eyeColor" label="Eye Color"/>

  // </ItemDetails>
  // );

  // const starshipDetails = (
  // <ItemDetails 
  //   itemId={5}
  //   getData={getStarship}
  //   getImageUrl={getStarshipImage}>

  //   <Record field="model" label="Model"/>
  //   <Record field="length" label="Length"/>
  //   <Record field="costInCredits" label="Cost"/>

  // </ItemDetails> 
  // );


  // const personList = (
  //   <PersonList
  //       onItemSelected={() => {}} >

  //       { ({name}) => <span>{name}</span> }
  //   </PersonList>
  // );

  // const personDetails = (
  //   <PersonDetails
  //     itemId={11}>

  //     <Record field="gender" label="Gender"/>
  //     <Record field="eyeColor" label="Eye Color"/>
  //   </PersonDetails>
  // );

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

  return (
    <div>
      <Header />
      <RandomPlanet />

      <PersonList />
      <StarshipList />
      <PersonDetails itemId={6}/>

    </div>
  );
  };
}
