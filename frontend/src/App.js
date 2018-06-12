import React, { Component } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Matches from './components/Matches';
import MatchDetails from './components/MatchDetails';
import { Route } from 'react-router-dom';
import './css/App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            googleData: null,
            profile: null,
            online: false,
            matchInfo: null,
            games: []
        };
    };
    componentDidMount = () => {
        let guser = JSON.parse(localStorage.getItem('guser'));
        if ( guser !== null && guser !== undefined ) {
            axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+guser.tokenId)
                .then(res => {
                    if (res.error_description === undefined) {
                        this.setState({
                            googleData: guser,
                            profile: guser.profileObj,
                            online: true
                        });
                    }
                    this.getGames();
                });
        }
    };
    getGames = () => {
        let opt = {
            method: 'GET',
            url: 'https://bet-api.sps-pl.com/games',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        };
        axios(opt).then(res => {
            this.setState({
                games: res.data
            });
        });
    };
    responseGoogleSuccess = (response) => {
        localStorage.setItem('guser', JSON.stringify(response));
        this.setState({
            googleData: response,
            profile: response.profileObj,
            online: true
        });
        axios.post('https://bet-api.sps-pl.com/users/auth', response.profileObj)
            .then( res => {
                localStorage.setItem('userId', res.data.id);
                localStorage.setItem('token', res.data.auth_key);
                this.getGames();
            });
    };
    responseGoogleFail = (response) => {
        alert(response.error);
        localStorage.setItem('guser', null);
        console.error(response.error);
    };
    logOut = () => {
        localStorage.setItem('guser', null);
        this.setState({
            googleData: null,
            profile: null,
            online: false
        });
    };
    betFor = () => {

    };
    setMatchDetails = (id) => {
        this.state.games.forEach(game => {
            if (game.id === id) {
                this.setState({
                    matchInfo: game
                });
            }
        });
    };
    render() {
        if (this.state.online) {
            return (
                <div className="App">
                    <Route path='/' render={(props)=><Login {...props} logOut={this.logOut} fail={this.responseGoogleFail} success={this.responseGoogleSuccess} online={this.state.online} user={this.state.profile} />}/>
                    <Route exact path='/' render={(props)=><Matches {...props} setMatchDetails={this.setMatchDetails} games={this.state.games}/>}/>
                    <Route path='/match/:id' render={(props)=><MatchDetails {...props} info={this.state.matchInfo} betForFunction={this.props.betFor}/>}/>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <Route path='/' render={(props)=><Login {...props} fail={this.responseGoogleFail} success={this.responseGoogleSuccess} online={this.state.online} user={this.state.profile} />}/>
                </div>
            );
        }
    }
}

export default App;