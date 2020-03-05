import React , { Component } from 'react';
import {link , withRouter, Link} from 'react-router-dom';
import firebase from '../../firebase';

import './dashboard.css';

class Dashboard extends Component{

    constructor(props){
        super(props);
        this.state={
            name: localStorage.nameUser
        }

        this.logout = this.logout.bind(this);
    }

    async componentDidMount(){
        if(!firebase.getCurrentUser()){
            this.props.history.replace('/login');
            return null;
        }

        firebase.getUserName((info)=> {
            localStorage.nameUser = info.val().name;
            this.setState({name: localStorage.nameUser});
        })
    }

    logout = async () => {
        await firebase.logout()
        .catch((error) => {
            console.log(error);
        });
        localStorage.removeItem('nameUSer');
        this.props.history.push('/');
    }

    render(){
        return(
            <div id="dashboard">
                <div className="user-info">
                <h1>Olá, {this.state.name}</h1>
                <Link to="/dashboard/new">Novo Post</Link>
                </div>
                <p>Logged with: {firebase.getCurrentUser()} </p>
                <button onClick={()=> this.logout()}>sign out</button>
            </div>
        )
    }
}

export default withRouter(Dashboard);