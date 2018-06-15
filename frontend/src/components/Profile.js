import React, { Component } from 'react';
import axios from 'axios';
import backIcon from '../assets/back.png';

class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null
        };
    };
    componentDidMount = () => {
      this.getProfile();
    };
    goBack = () => {
        this.props.history.goBack();
    };
    getProfile = () => {
        const id = parseInt(this.props.match.params.id, 10);
        let opt = {
            method: 'GET',
            url: 'https://bet-api.sps-pl.com/users',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        };
        axios(opt).then(res => {
            for (let i = 0; i < res.data.length; i++) {
                const u = res.data[i];
                if (u.id === id) {
                    this.setState({
                        profile: u
                    });
                }
            }
        });
    };
    render() {
        const user = this.state.profile;
        if (user !== null) {
            return (
                <div className="Matches content">
                    <div onClick={this.goBack} className='info-date'><img className='back-image' src={backIcon} alt='back' /> Regresar</div>
                    <div className="MatchDetails table">
                        <div className="teams">
                            <div className="col col-2 text-center">
                                <img className='profile-pic as-center' src={user.google_img_path} alt='user' />
                            </div>
                            <h3 className="col col-6 center-center">
                                {user.username}
                            </h3>
                            <div className='col col-2 center-center'>
                                {user.points} pts
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="Matches content">
                    <div className='info-date'>Cargando...</div>
                </div>
            );
        }
    }
}

export default Stats