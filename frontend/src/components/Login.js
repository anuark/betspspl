import React, { Component } from 'react'
import { GoogleLogin } from 'react-google-login';
import icon from '../assets/gIcon.png';
import icon_table from '../assets/table.png';
import icon_calendar from '../assets/calendar.png';
import icon_exit from '../assets/exit.png';

class Login extends Component {
    goToScore = () => {
        this.props.history.push('/score');
    };
    goToCalendar = () => {
        this.props.history.push('/');
    };
    logOut = () => {
        this.props.history.push('/');
        this.props.logOut();
    };
    responseGoogleSuccess = (response) => {
        this.props.success(response);
    };
    responseGoogleFail = (response) => {
        this.props.fail(response);
    };
    render() {
        if (!this.props.online) {
            return (
                <div className="Login landing">
                    <h1>SPS-PL Bets</h1>
                    <h2>Russia 2018</h2>
                    <GoogleLogin
                        clientId="762731481783-s1s5vk32c17h2r9t1kmur47e95as24ea.apps.googleusercontent.com"
                        className="login-btn"
                        onSuccess={this.responseGoogleSuccess}
                        onFailure={this.responseGoogleFail}
                    ><img src={icon} alt='' />Iniciar con Google</GoogleLogin>
                </div>
            )
        } else {
            return (
                <div className="Login">
                    <div>
                        <img className="icon" src={this.props.user.imageUrl} alt="profile"/>¡Hola {this.props.user.givenName}!
                    </div>
                    <div className='pts'>
                        <div onClick={this.goToCalendar}><img src={icon_calendar} alt="calendar"/></div>
                        <div>{this.props.points} pts</div>
                        <div onClick={this.goToScore}><img src={icon_table} alt="table"/></div>
                        <div onClick={this.logOut}><img src={icon_exit} alt="exit"/></div>
                    </div>
                </div>
            )
        }
    }
}

export default Login