import React , {Component} from 'react';
import {Link , withRouter} from 'react-router-dom';
import firebase from '../../firebase';

import './register.css';


class Register extends Component{

    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            name:''
        };

        this.register = this.register.bind(this);
        this.onRegister = this.onRegister.bind(this);
    }

    register(e){
        e.preventDefault();
        this.onRegister();
    }

    onRegister = async() => {
        try {
            const {email , password, name} = this.state;
            await firebase.register(name, email,password);
            this.props.history.replace('/dashboard');
        } catch (error) {
            console.log(error.message);
        }
    }

    render(){
        return(
            <div>
                <h1 className="register-h1">Novo Contribuidor</h1>
                <form onSubmit={this.register}  id="register">
                    <label>Nome:</label><br/>
                    <input type="text" value={this.state.name} autoFocus autoComplete="off"
                    placeholder="Ex: José Silva"
                    onChange={(e) => this.setState({name: e.target.value})} /> <br/>
                    <label>Email:</label><br/>
                    <input type="email" value={this.state.email} autoComplete="off"
                    placeholder="exemplo@exemplo.com"
                    onChange={(e) => this.setState({email: e.target.value})} /> <br/>
                    <label>Password</label><br/>
                    <input type="password" value={this.state.password} autoComplete="off"
                    placeholder="Escreva a sua password"
                    onChange={(e) => this.setState({password: e.target.value})} /> <br/>

                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        )
    }


}

export default withRouter(Register);