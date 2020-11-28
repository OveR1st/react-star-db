import React, {Component} from 'react';
import SwapiService from '../../services/swapi-services';
import Spinner from '../spinner';

import './item-list.css';

export default class ItemList extends Component {
  
  swapiService = new SwapiService();



  state = {
    peopleList: null
  }

  componentDidMount() {
    this.swapiService
      .getAllPeople()
      .then((peopleList) => {
        console.log(peopleList);
        this.setState({
          peopleList
        })
      })
  }


  renderItems(arr) {
    console.log(arr);
    return arr.map( ({name, id}) => {
      return (
        <li 
          key={id}
          className="list-group-item"
          onClick={ () => this.props.OnItemSelected(id) } >
          {name}
        </li>
      );
    })
  }


  render() {

    const { peopleList } = this.state;
    

    if (!peopleList) {
      return <Spinner />;
    }

    const items = this.renderItems(peopleList);

    return(


      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}

