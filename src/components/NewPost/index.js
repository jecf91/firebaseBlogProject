import React , { Component } from 'react';
import {Link , withRouter} from 'react-router-dom';

import firebase from '../../firebase';

import './NewPost.css';

class NewPost extends Component{

    constructor(props){
        super(props);
        this.state={
            image: null,
            url:'',
            text:'',
            title:'',
            alert:'',
            progress: 0
        }

        this.sendPost = this.sendPost.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    async componentDidMount(){
        if(!firebase.getCurrentUser()){
            this.props.history.replace('/');
            return null;
        }
    }

    handleFile = async (e) => {
        if(e.target.files[0]){
            const image = e.target.files[0];
            if(image.type === 'image/png' || image.type === 'image/jpeg'){
               await this.setState({image: image});
               this.handleUpload()
            }
            else{
                alert('Envie uma imagem do tipo png ou jpg');
                this.setState({image:null});
                return null;
            }
        }
        
    }

    handleUpload = async ( ) => {
        const { image } = this.state;
        const currentUid = firebase.getCurrentUid();
        const uploadTask = firebase.storage
        .ref(`images/${currentUid}/${image.name}`)
        .put(image);

        await uploadTask.on('state_changed',
         (snapshot)=> {
            //progress
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.setState({progress: progress});
        }, (error) => {
            console.log(error)
        }, () => {
            //success
            firebase.storage.ref(`images/${currentUid}`).child(image.name).getDownloadURL()
            .then( url => {
                this.setState({url : url});
            })
        })
    }

    sendPost = async (e) => {
        e.preventDefault();

        if(this.state.title !== '' 
            && this.state.image !== '' 
            && this.state.text !== ''
            && this.state.image !== null 
            && this.state.url !== ''){
            let posts = firebase.app.ref('posts');
            let key = posts.push().key;
            await posts.child(key).set({
                title: this.state.title,
                image: this.state.url,
                text: this.state.text,
                author: localStorage.nameUser
            })

            this.props.history.push('/dashboard');
        } else {
            this.setState({ alert : 'Preencha todos os campos!'});

        }
    }

    render(){
        return(
            <div>
               <header id="new">
                   <Link to="/dashboard">Voltar</Link>
               </header>
               <form onSubmit={this.sendPost} id="new-post">
                   <span>{this.state.alert}</span>
                   <input type="file" onChange={this.handleFile} />
                   {this.state.url !== '' ? <img src={this.state.url} width="250" height="150" alt="capa do post"/> :
                    <progress value={this.state.progress} max="100"/>
                   }
                   <label>Titulo:</label><br/>
                   <input type="text" placeholder="titulo do post" value={this.state.title}
                   onChange={ (e) => { this.setState({ title: e.target.value})}} />
                   <label>Texto:</label><br/>
                   <textarea type="text" placeholder="Insira o seu texto" value={this.state.text}
                   onChange={ (e) => { this.setState({ text: e.target.value})}} />
                   <button type="submit">Submeter</button>
               </form>
            </div>
        )
    }

}

export default withRouter(NewPost);