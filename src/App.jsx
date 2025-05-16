import React from 'react';
import { Outlet } from 'react-router-dom';
import FullWrapper from './layouts/FullWrapper';

const App = () => {
  return (

     <FullWrapper>
    <div className="app">
      <Outlet />
    </div>
    </FullWrapper>
  );
};

export default App;

