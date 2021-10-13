import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/cardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import ErrorBoundary  from '../components/ErrorBoundary';
import { requestRobots, setSearchField } from '../actions'
import './App.css';

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => requestRobots(dispatch)
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: []
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => { this.setState({ robots: users })});
  }


  render() {
    const { robots } = this.state;
    const { searchField, onSearchChange} = this.props;
    const filterRobots = robots.filter(robots => {
      return robots.name
        .toLowerCase()
        .includes(searchField.toLowerCase());

  
    })
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
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
