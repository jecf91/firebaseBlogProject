import React , { Component } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import firebase from './firebase';

import Header from './components/Header';
import Home from './components/home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import NewPost from './components/NewPost';

import './global.css';

class App extends Component{

  state = {
    firebaseInitialized: false
  }

  componentDidMount(){
    firebase.isInizialized().then(result => {
      //return user
      this.setState({firebaseInitialized: result});
    })
  }

  render(){
    return this.state.firebaseInitialized !== false ? (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard/new" component={NewPost} />
        </Switch>
      </BrowserRouter>
    ) : ( <h1>Loading...</h1> );
  }
}

export default App;
