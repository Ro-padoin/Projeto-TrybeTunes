import React from 'react';

// React-Router:
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Pages:
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <section>
        <BrowserRouter>
          <Switch>
            <Route exact path="/search" component={ Search } />
            <Route exact path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
            <Route exact path="/album/:id" component={ Album } />
            <Route exact path="/" component={ Login } />
            <Route exact path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </section>
    );
  }
}

export default App;
