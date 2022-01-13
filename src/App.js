import React from 'react';

// React-Router:
import { BrowserRouter, Route } from 'react-router-dom';

// Components:
import Album from './component/Album';
import Favorites from './component/Favorites';
import Login from './component/Login';
import NotFound from './component/NotFound';
import Profile from './component/Profile';
import ProfileEdit from './component/ProfileEdit';
import Search from './component/Search';

class App extends React.Component {
  render() {
    return (
      <section>
        <BrowserRouter>
          <Route path="/" component={ Login } />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </BrowserRouter>
      </section>
    );
  }
}

export default App;
