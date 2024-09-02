import React from 'react';
import Input from './Input';

function Search() {
  return (
    <div className='sm:flex gap-2 pl-3 items-center justify-center border-[1px] border-gray-400 hidden sm:w-[180px]'>
      <i className="ri-search-line text-xl sm:text-lg"></i>
      <Input 
      type="text"
      placeholder="Search"
      className="form-input focus:outline-none block w-full rounded-md border-none"
      />
    </div>
  );
}

export default Search;
