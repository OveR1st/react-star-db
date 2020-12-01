import React, {Component} from 'react';
import SwapiService from '../../services/swapi-services';
import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './people-page';

const Row = ({left, right}) => {
  return(
    <div className="row mb2">
      <div className="col-md-6">
        {left}
      </div>
      <div className="col-md-6">
        {right}
      </div>
    </div>
  );
}

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state={
    selectedPerson: 3,
    hasError: false
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }


  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    })
  }

  render(){

    const itemList = (
      <ItemList 
            onItemSelected={this.onPersonSelected}
            getData={this.swapiService.getAllPeople}
            renderItem={({name, gender, birthYear}) => `${name} (${gender}, ${birthYear})`} />
    );

    const personDetails = (
      <PersonDetails personId={this.state.selectedPerson}/>
    );

    if ( this.state.hasError) {
      return <ErrorIndicator />
    }

    return(
      <Row left={itemList}
           right={personDetails} />
    );
  }
}