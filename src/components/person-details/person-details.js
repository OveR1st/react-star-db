
import React, {Component} from 'react';

import SwapiService from '../../services/swapi-services';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import './person-details.css';



export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    person: null,
    loading: true,
    error: false
  }

  componentDidMount(){
    this.updatePerson();
  }

  componentDidUpdate(prevProps){
    if (this.props.personId !== prevProps.personId) {
      this.setState({
        loading: true
      });
      this.updatePerson();
    }
  }

  updatePerson(){
    const { personId } = this.props;
    console.log(personId);
    if (!personId) {
      return;
    }

    this.swapiService
      .getPerson(personId)
      .then( (person) => {
        this.setState({
          person,
          loading: false
        })
      })
      .catch(this.onError);
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  }

  render(){

    const { person, loading, error } = this.state;
    console.log(person)
    console.log(loading)
    console.log(error)
    
    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PersonView person={person}/> : null;

    if(!person) {
      return <span>Select a personfrom a list</span>
    }


    return(
      <div className="person-details card">
        {errorMessage}
        {spinner}
        {content}
      </div>

    );
  }
};

const PersonView = ({person}) => {

  const { id, name, height, gender, birthYear, eyeColor } = person
  console.log(person)

  return(
    <React.Fragment>
      <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}/>


        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Height</span>
              <span>{height}</span>
            </li>
          </ul>
        </div>
    </React.Fragment>
  );
}