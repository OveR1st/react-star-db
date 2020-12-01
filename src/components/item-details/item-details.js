
import React, {Component} from 'react';

import SwapiService from '../../services/swapi-services';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import ErrorButton from '../error-button';

import './item-details.css';



export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: null,
    loading: true,
    error: false,
    image: null
  }

  componentDidMount(){
    this.updateItem();
  }

  componentDidUpdate(prevProps){
    if (this.props.itemId !== prevProps.itemId) {
      this.setState({
        loading: true
      });
      this.updateItem();
    }
  }

  updateItem(){
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId)
      .then( (item) => {
        this.setState({
          item,
          loading: false,
          image: getImageUrl(item)
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

    const { item, loading, error, image } = this.state;
    
    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <ItemView item={item} image={image}/> : null;
    const errorbutton = <ErrorButton />

    if(!item) {
      return <span>Select a item from a list</span>
    }


    return(
      <div className="item-details card">
        {errorMessage}
        {spinner}
        {content}
        {errorbutton}
      </div>

    );
  }
};

const ItemView = ({item, image}) => {

  const { id, name, height, gender, birthYear, eyeColor } = item
  const images = image

  return(
    <React.Fragment>
      <img className="item-image"
          src={images}/>


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