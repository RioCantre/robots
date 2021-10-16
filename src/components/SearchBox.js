import React from 'react';

const SearchBox = ({ searchfield, searchChange }) => {
  return (
    <div className='pa4'>
      <input
        className='pa3 ba b--green bg-washed-green'
        type='search'
        placeholder='search robots'
        onChange={searchChange}
      />
    </div>
  );
};

export default SearchBox;
