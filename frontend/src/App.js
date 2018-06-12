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
        axios.get('https://bet-api.sps-pl.com/games')
            .then(res => {
                this.setState({
                    games: res.data
                });
            });
        let user = JSON.parse(localStorage.getItem('user'));
        if ( user !== null && user !== undefined ) {
            axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+user.tokenId)
                .then(res => {
                    if (res.error_description === undefined) {
                        this.setState({
                            googleData: user,
                            profile: user.profileObj,
                            online: true
                        });
                    }
                });
        }
    };
    responseGoogleSuccess = (response) => {
        localStorage.setItem('user', JSON.stringify(response));
        this.setState({
            googleData: response,
            profile: response.profileObj,
            online: true
        });
        axios.post('https://bet-api.sps-pl.com/users/auth', response.profileObj)
            .then( res => {
                console.log(res.data);
            });
    };
    responseGoogleFail = (response) => {
        alert(response.error);
        localStorage.setItem('user', null);
        console.error(response.error);
    };
    logOut = () => {
        localStorage.setItem('user', null);
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