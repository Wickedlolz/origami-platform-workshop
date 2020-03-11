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

function render(title, Cmp) {
  return function () {
    return <Main title={title}><Cmp /></Main>
  }
}

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Loader local={true} isLoading={false} />
      <Navigation />
      <div className = "Container">
        <Aside />        
          <Switch>
            <Route path="/" exact render={render('Posts', Posts)} />
            <Route path="/create-post" exact render={render('Create Post', CreatePost)} />
            <Route path="/profile" exact render={render('Profile', Profile)} />
            <Route path="/login" exact render={render('Login', Login)} />
            <Route path="/register" exact render={render('Register', Register)} />
            <Route path="*" exact render={render('Not Found', NotFound)} />
          </Switch>
      </div>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
