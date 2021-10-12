import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/cardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import ErrorBoundary  from '../components/ErrorBoundary';
import './App.css';
import { setSearchField } from '../actions'

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  }
}

function App(){
  const [robots, setRobots] = useState([])
  const [searchfield, setSearchfield] = useState('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => { setRobots(users) });
  },[])

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };

  const filterRobots = robots.filter(robots => {
    return robots.name
      .toLowerCase()
      .includes(searchfield.toLowerCase());
  });
    return !robots.length ?
      <h1 className='tc'> Loading...</h1> :
      (
        <div className='tc'>
          <h1 className='f1'> RoboFriends </h1>
          <SearchBox searchChange={onSearchChange} />
          <Scroll>
            <ErrorBoundary ErrorBoundary>
              <CardList robots={filterRobots} />
            </ErrorBoundary>
          </Scroll>
        </div>
      );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
