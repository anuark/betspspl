import React, { Component } from 'react'
import { GoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom';
import icon from '../assets/gIcon.png';
import icon_table from '../assets/table.png';
import icon_calendar from '../assets/calendar.png';

class Login extends Component {
    responseGoogleSuccess = (response) => {
        this.props.success(response);
    };
    responseGoogleFail = (response) => {
        this.props.fail(response);
    };
    render() {
        if (!this.props.online) {
            return (
                <div className="Login">
                    <GoogleLogin
                        clientId="762731481783-s1s5vk32c17h2r9t1kmur47e95as24ea.apps.googleusercontent.com"
                        className="login-btn"
                        onSuccess={this.responseGoogleSuccess}
                        onFailure={this.responseGoogleFail}
                    ><img src={icon} alt=''/>Iniciar con Google</GoogleLogin>
                </div>
            )
        } else {
            return (
                <div className="Login">
                    <div>
                        <img className="icon" src={this.props.user.imageUrl} alt="profile"/>¡Hola {this.props.user.givenName}!
                    </div>
                    <div className='pts'>
                        <div><Link to='/'><img src={icon_calendar} alt="calendar"/></Link></div>
                        <div>0 pts</div>
                        <div><Link to='/score'><img src={icon_table} alt="table"/></Link></div>
                    </div>
                </div>
            )
        }
    }
}

export default Login