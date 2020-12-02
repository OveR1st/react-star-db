import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';

import ItemDetails, { Record } from '../item-details/item-details';

import Row from '../row';

import PeoplePage from '../people-page/';
import ErrorButton from '../error-button';

import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-services';

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

    const {getPerson, getStarship, getPersonImage, getStarshipImage, getAllPeople, getAllPlanets} = this.swapiService

    const personDetails = (
      <ItemDetails 
        itemId={15}
        getData={getPerson}
        getImageUrl={getPersonImage}>

        <Record field="gender" label="Gender"/>
        <Record field="eyeColor" label="Eye Color"/>

      </ItemDetails>
    );
    
    const starshipDetails = (
      <ItemDetails 
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}>

        <Record field="model" label="Model"/>
        <Record field="length" label="Length"/>
        <Record field="costInCredits" label="Cost"/>

        

      </ItemDetails> 
    );

    return (
      <div>
        <Header />
        
        <ItemList
            getData={getAllPeople}
            onItemSelected={() => {}}>

            { ({name}) => <span>{name}</span> }
          </ItemList>

          <ItemList
            getData={getAllPlanets}
            onItemSelected={() => {}}>

            { ({name}) => <span>{name}</span> }
          </ItemList>
          <Row 
          left={personDetails}
          right={starshipDetails} />
        {/* <RandomPlanet /> */}
        {/* <ErrorButton /> */}
  
        {/* <PeoplePage /> */}

        {/* <div className="row mb2">
          <div className="col-md-6">
            <ItemList 
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllPlanets}>

                {(i) => (
                  `${i.name}, (${i.population}, ${i.diameter})`
                )}

            </ItemList>   
          </div>
          <div className="col-md-6">
            <ItemDetails personId={this.state.selectedPerson}/>
          </div>
        </div> */}

        {/* <div className="row mb2">
          <div className="col-md-6">
            <ItemList 
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllStarships}>
                
                {(i) => (
                  `${i.name}, (${i.model}, ${i.length})`
                )}

            </ItemList>
              
          </div>
          <div className="col-md-6">
            <Details personId={this.state.selectedPerson}/>
          </div>
        </div> */}
      </div>
    );
  };
}
