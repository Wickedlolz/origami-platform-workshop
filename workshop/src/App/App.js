import React from 'react';
import logo from '../logo.svg';
import './App.css';
import Navigation from '../Navigation/Navigation';
import Main from './Main/Main';
import Aside from '../Aside/Aside';
import Posts from '../publications/Posts/Posts';
import CreatePost from '../publications/CreatePost/CreatePost';
import Footer from '../Footer/Footer';
import Loader from './Loader/Loader';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Logout from '../Logout/Logout';
import userService from '../services/user-service';

function render(title, Cmp, otherProps) {
  return function (props) {
    return <Main title={title}><Cmp {...props} {...otherProps} /></Main>
  }
}

function parseCookies() {
  return document.cookie.split('; ').reduce((acc, cookie) => {
    const [cookieName, cookieValue] = cookie.split('=');
    acc[cookieName] = cookieValue;
    return acc;
  }, {})
}

class App extends React.Component {
  constructor(props) {
    super(props);
    const cookies = parseCookies();
    const isLogged = !!cookies['x-auth-token'];
    this.state = { isLogged };
  }

  logout = (history) => {
      userService.logout().then(() => {            
          this.setState({ isLogged: false});
          history.push('/');
          return null;
      });
  }

  login = (history, data) => {
    userService.login(data).then(() => {            
      this.setState({ isLogged: true});
      history.push('/');
      return null;
    });
  }

  render() {
    const { isLogged } = this.state;
    return (
      <BrowserRouter>
      <div className="App">
        <Loader local={true} isLoading={false} />
        <Navigation isLogged={isLogged} />
        <div className = "Container">
          <Aside isLogged={isLogged} />        
            <Switch>
              <Route path="/" exact render={render('Posts', Posts, { isLogged })} />
              <Route path="/create-post" exact render={render('Create Post', CreatePost, { isLogged })} />
              <Route path="/profile" exact render={render('Profile', Profile, { isLogged })} />
              <Route path="/login" exact render={render('Login', Login, {isLogged, login: this.login })} />
              <Route path="/register" exact render={render('Register', Register, { isLogged })} />
              <Route path="/logout" render={render('Logout', Logout, { isLogged, logout: this.logout })} />
              <Route path="*" exact render={render('Not Found', NotFound)} />
            </Switch>
        </div>
        <Footer isLogged={isLogged} />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
