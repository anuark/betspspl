import React, { Component } from 'react';
import alarm from './assets/not-played.png';
import wow from './assets/bet.png';
import soccer from './assets/playing.png';
import happy from './assets/won.png';
import cry from './assets/lost.png';
import axios from 'axios';
import Login from './components/Login';
import Matches from './components/Matches';
import MatchesDetails from './components/MatchesDetails';
import Stats from './components/Stats';
import Profile from './components/Profile';
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
            games: [],
            points: 0
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
            this.refreshDev(res.data);
        });
    };
    refreshDev = (data) => {
        for (let i = 0; i <data.length; i++) {
            const c =data[i];
            this.setBetMsg(c);
            if (i === 0) {
                c.first = 1
            } else {
                const p =data[i-1];
                if (p.date === c.date) {
                    c.first = 0;
                } else {
                    c.first = 1;
                }
            }
        }
        this.setState({
            games: data
        });
    };
    setBetMsg = (game) => {
        if (game.status === 'to be played') {
            if (game.bet_for_away === '1') {
                game.ico = wow;
                game.msg = 'Apostaste por ' + game.away_team;
            } else if (game.bet_for_local === '1') {
                game.ico = wow;
                game.msg = 'Apostaste por ' + game.local_team;
            } else if (game.bet_for_draw === '1') {
                game.ico = wow;
                game.msg = 'Apostaste por el empate';
            } else {
                game.ico = alarm;
                game.msg = 'No has hecho apuesta';
            }
        } else if (game.status === 'playing') {
            game.ico = soccer;
        } else if (game.status === 'played') {
            if (game.asserted === '1') {
                game.ico = happy;
            } else {
                game.ico = cry;
            }
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
                this.setState({
                    points: res.data.points
                });
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
        const gameData = this.state.games.slice();
        for (let i = 0; i < gameData.length; i++) {
            const c = gameData[i];
            if (c.id === data.game_id) {
                c.bet_for_away = data.bet_for_away.toString();
                c.bet_for_local = data.bet_for_local.toString();
                c.bet_for_draw = data.bet_for_draw.toString();
            }
        }
        this.refreshDev(gameData);
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
                    <Route path='/' render={(props)=><Login {...props} points={this.state.points} logOut={this.logOut} fail={this.responseGoogleFail} success={this.responseGoogleSuccess} online={this.state.online} user={this.state.profile} />}/>
                    <Route exact path='/' render={(props)=><Matches {...props} refresh={this.getGames} games={this.state.games}/>}/>
                    <Route path='/match/:date' render={(props)=><MatchesDetails {...props} refresh={this.getGames} games={this.state.games} betFor={this.betFor}/>}/>
                    <Route exact path='/score' render={(props)=><Stats {...props} />} />
                    <Route path='/profile/:id' render={(props)=><Profile {...props} />} />
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