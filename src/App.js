import React from 'react';

// React-Router:
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
