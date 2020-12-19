import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
//import required components
import CreateDog from './CreateDog';
import EditDog from './EditDog';
import DogList from './DogList';

// this is the "main" component which sets up the React Router and respective routes
const App = () => {
  return(
    <HashRouter>
      <div>
        {/*SERVERSIDE: Link the routes to components*/}
        <Route exact path="/" component={DogList}/>
        {/*pass the id through the EditDog component*/}
        <Route path="/edit-dog/:id" component={EditDog}/>
        {/*set the path to create a new dog to CreateDog component*/}
        <Route path="/create-dog" component={CreateDog}/>
      </div>
    </HashRouter>
  );
};

export default App;
