import React, { Component } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Matches from './components/Matches';
import MatchesDetails from './components/MatchesDetails';
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
                    this.authToMyServer(guser.profileObj);
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
            for (let i = 0; i < res.data.length; i++) {
                const c = res.data[i];
                this.setBetMsg(c);
                if (i === 0) {
                    c.first = 1
                } else {
                    const p = res.data[i-1];
                    if (p.date === c.date) {
                        c.first = 0;
                    } else {
                        c.first = 1;
                    }
                }
            }
            this.setState({
                games: res.data
            });
        });
    };
    setBetMsg = (game) => {
        if (game.bet_for_away === '1') {
            game.msg = 'Apostaste por ' + game.away_team
        }
        if (game.bet_for_local === '1') {
            game.msg = 'Apostaste por ' + game.local_team
        }
        if (game.bet_for_draw === '1') {
            game.msg = 'Apostaste por el empate'
        }
    };
    responseGoogleSuccess = (response) => {
        localStorage.setItem('guser', JSON.stringify(response));
        this.setState({
            googleData: response,
            profile: response.profileObj,
            online: true
        });
        this.authToMyServer(response.profileObj);
    };
    authToMyServer = (profileObj) => {
        axios.post('https://bet-api.sps-pl.com/users/auth', profileObj)
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
        localStorage.setItem('userID', null);
        localStorage.setItem('token', null);
        this.setState({
            googleData: null,
            profile: null,
            online: false
        });
    };
    betFor = (data) => {
        data.user_id = localStorage.getItem('userId');
        let opt = {
            method: 'POST',
            url: 'https://bet-api.sps-pl.com/bets',
            data: data,
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        };
        axios(opt).then(res=>{
            this.getGames();
        });
    };
    render() {
        if (this.state.online) {
            return (
                <div className="App">
                    <Route path='/' render={(props)=><Login {...props} logOut={this.logOut} fail={this.responseGoogleFail} success={this.responseGoogleSuccess} online={this.state.online} user={this.state.profile} />}/>
                    <Route exact path='/' render={(props)=><Matches {...props} games={this.state.games}/>}/>
                    <Route path='/match/:date' render={(props)=><MatchesDetails {...props} games={this.state.games} betFor={this.betFor}/>}/>
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