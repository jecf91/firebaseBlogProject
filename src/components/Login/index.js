import React , {Component} from 'react';
import {Link , withRouter} from 'react-router-dom';
import firebase from '../../firebase';

import './login.css'


class Login extends Component{

    constructor(props){
        super(props);
        this.state={
            email:'',
            password:''
        };

        this.login = this.login.bind(this);
        this.enter = this.enter.bind(this);

    }

    componentDidMount(){
        //check if user logged in
        if(firebase.getCurrentUser()){
            return this.props.history.replace('dashboard');
        }
    }

    login(e){
        e.preventDefault();
        this.enter();
    }

    enter = async () => {
        const  { email , password } = this.state;
        
        try {
            await firebase.login(email,password)
            .catch((err) =>{
                if(err.code){
                    alert('Error: ' + err.code);
                    return null;
                }
            });

            this.props.history.replace('/dashboard');
        } catch (error) {
            console.log(error.message);
        }
        
    }

    render(){
        return(
            <div>
                <form onSubmit={this.login} id="login">
                    <label>Email:</label> <br/>
                    <input type="email" autoComplete="off" autoFocus value={this.state.email}
                    onChange={ (e) => this.setState({email: e.target.value})} placeholder="a@a.com"/> <br/>
                    <label>Password:</label> <br/>
                    <input type="password" autoComplete="off" value={this.state.password}
                    onChange={ (e) => this.setState({password: e.target.value})} placeholder="digite a sua senha"/> <br/>
                    <button type="submit">Login</button>
                    <Link to="/register">Registar</Link>
                </form>
            </div>
        )
    }


}

export default withRouter(Login);