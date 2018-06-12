import React, { Component } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Matches from './components/Matches';
import { Route } from 'react-router-dom';
import './css/App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            googleData: null,
            name: '',
            online: false
        };
    };
    componentDidMount = () => {
        axios.get(`https://www.google.hn/search?ei=2v8eW7XHH8_s5gKS6qvIBA&q=fifa+world+cup+2018&oq=fifa+world+cup+2018&gs_l=psy-ab.3...25497.28610.0.28899.0.0.0.0.0.0.0.0..0.0....0...1.1.64.psy-ab..0.0.0....0.dDWPAKs98CU#sie=lg;/m/06qjc4;2;/m/030q7;mt;fp;1`)
            .then(res => {
                console.log(res.data);
            })
    };
    responseGoogleSuccess = (response) => {
        console.log(response);
        this.setState({
            googleData: response,
            profile: response.profileObj,
            online: true
        });
    };
    responseGoogleFail = (response) => {
        alert(response.error);
        console.error(response.error);
    };
    render() {
        return (
            <div className="App">
                <Login fail={this.responseGoogleFail} success={this.responseGoogleSuccess} online={this.state.online} user={this.state.profile}/>
                <Route exact path='/' component={Matches} />
            </div>
        );
    }
}

export default App;