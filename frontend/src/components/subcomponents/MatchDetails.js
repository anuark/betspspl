import React, { Component } from 'react';
import arg from '../../assets/flags/arg.png';
import aus from '../../assets/flags/aus.png';
import bel from '../../assets/flags/bel.png';
import bra from '../../assets/flags/bra.png';
import col from '../../assets/flags/ksa.png';
import crc from '../../assets/flags/crc.png';
import cro from '../../assets/flags/cro.png';
import den from '../../assets/flags/den.png';
import egy from '../../assets/flags/egy.png';
import eng from '../../assets/flags/eng.png';
import esp from '../../assets/flags/esp.png';
import fra from '../../assets/flags/fra.png';
import ger from '../../assets/flags/ger.png';
import irn from '../../assets/flags/irn.png';
import isl from '../../assets/flags/isl.png';
import jpn from '../../assets/flags/jpn.png';
import kor from '../../assets/flags/kor.png';
import ksa from '../../assets/flags/ksa.png';
import mar from '../../assets/flags/mar.png';
import mex from '../../assets/flags/mex.png';
import nga from '../../assets/flags/nga.png';
import pan from '../../assets/flags/pan.png';
import per from '../../assets/flags/per.png';
import pol from '../../assets/flags/pol.png';
import por from '../../assets/flags/por.png';
import rus from '../../assets/flags/rus.png';
import sen from '../../assets/flags/sen.png';
import srb from '../../assets/flags/srb.png';
import sui from '../../assets/flags/sui.png';
import swe from '../../assets/flags/swe.png';
import tun from '../../assets/flags/tun.png';
import uru from '../../assets/flags/uru.png';

const flag = {
    'Argentina': arg,
    'Australia': aus,
    'Belgium': bel,
    'Brazil': bra,
    'Colombia': col,
    'Costa Rica': crc,
    'Croatia': cro,
    'Denmark': den,
    'Egypt': egy,
    'England': eng,
    'Spain': esp,
    'France': fra,
    'Germany': ger,
    'Iran': irn,
    'Iceland': isl,
    'Japan': jpn,
    'South Korea': kor,
    'Saudi Arabia': ksa,
    'Morocco': mar,
    'Mexico': mex,
    'Nigeria': nga,
    'Panama': pan,
    'Peru': per,
    'Poland': pol,
    'Portugal': por,
    'Russia': rus,
    'Senegal': sen,
    'Serbia': srb,
    'Sweden': sui,
    'Switzerland': swe,
    'Tunisia': tun,
    'Uruguay': uru
}

class MatchDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classHome: 'col col-1 button',
            classAway: 'col col-1 button',
            classTie: 'col col-1 button',
            msg: 'No has apostado'
        };
    };
    componentDidMount = () => {
        if (this.props.info.bet_for_away) {
            this.setState({
                classHome: 'col col-1 button',
                classAway: 'col col-1 button active',
                classTie: 'col col-1 button',
                msg: 'Apostaste por '+this.props.info.away_team
            });
        }
        if (this.props.info.bet_for_local) {
            this.setState({
                classHome: 'col col-1 button active',
                classAway: 'col col-1 button',
                classTie: 'col col-1 button',
                msg: 'Apostaste por '+this.props.info.home_team
            });
        }
        if (this.props.info.bet_for_draw) {
            this.setState({
                classHome: 'col col-1 button',
                classAway: 'col col-1 button',
                classTie: 'col col-1 button active',
                msg: 'Apostaste por el empate'
            });
        }
    };
    setActive = (e) => {
        let id = e.target.getAttribute('id');
        let data = {
            game_id: this.props.info.id
        };
        switch (id) {
            case 'home':
                data.bet_for_local = 1;
                data.bet_for_away = 0;
                data.bet_for_draw = 0;
                this.setState({
                    classHome: 'col col-1 button active',
                    classAway: 'col col-1 button',
                    classTie: 'col col-1 button',
                    msg: 'Apostaste por '+this.props.info.home_team
                });
                break;
            case 'tie':
                data.bet_for_draw = 1;
                data.bet_for_away = 0;
                data.bet_for_local = 0;
                this.setState({
                    classHome: 'col col-1 button',
                    classAway: 'col col-1 button',
                    classTie: 'col col-1 button active',
                    msg: 'Apostaste por el empate'
                });
                break;
            case 'away':
                data.bet_for_away = 1;
                data.bet_for_local = 0;
                data.bet_for_draw = 0;
                this.setState({
                    classHome: 'col col-1 button',
                    classAway: 'col col-1 button active',
                    classTie: 'col col-1 button',
                    msg: 'Apostaste por '+this.props.info.away_team
                });
                break;
            default:
                break;
        }
        this.props.betFor(data);
    };
    render() {
        const info = this.props.info;
        if (info !== null) {
            return (
                <div className="MatchDetails">
                    <div className="info">{this.state.msg}</div>
                    <div className="teams">
                        <div className="col col-1 text-center">
                            <img className="flag" src={flag[info.local_team]} alt="home" />
                        </div>
                        <div className="col col-1 as-center text-center">
                            Empate
                    </div>
                        <div className="col col-1 text-center">
                            <img className="flag" src={flag[info.away_team]} alt="home" />
                        </div>
                    </div>
                    <div className="teams">
                        <div className="col col-1 text-center">
                            {info.local_team}
                        </div>
                        <div className="col col-1 as-center text-center">

                        </div>
                        <div className="col col-1 text-center">
                            {info.away_team}
                        </div>
                    </div>
                    <div className="teams">
                        <div id='home' onClick={this.setActive} className={this.state.classHome}></div>
                        <div id='tie' onClick={this.setActive} className={this.state.classTie}></div>
                        <div id='away' onClick={this.setActive} className={this.state.classAway}></div>
                    </div>
                </div>
            )
        } else {
            return(null);
        }
    }
}

export default MatchDetails