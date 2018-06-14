import React, { Component } from 'react';
import trophy from '../../assets/trophy.png';
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
            winners: []
        };
    };
    componentDidMount = () => {
        this.getWinners();
    };
    getWinners = () => {
        let opt = {
            method: 'GET',
            url: 'https://bet-api.sps-pl.com/games/'+this.props.info.id+'/winners',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        };
        axios(opt).then(res => {
            this.setState({
                winners: res.data
            });
        });
    };
    setActive = (e) => {
        if (this.props.info.status === 'to be played') {
            let id = e.target.getAttribute('id');
            let data = {
                game_id: this.props.info.id
            };
            switch (id) {
                case 'home':
                    data.bet_for_local = 1;
                    data.bet_for_away = 0;
                    data.bet_for_draw = 0;
                    break;
                case 'tie':
                    data.bet_for_draw = 1;
                    data.bet_for_away = 0;
                    data.bet_for_local = 0;
                    break;
                case 'away':
                    data.bet_for_away = 1;
                    data.bet_for_local = 0;
                    data.bet_for_draw = 0;
                    break;
                default:
                    break;
            }
            this.props.betFor(data);
        }
    };
    render() {
        const info = this.props.info;
        const winners = this.state.winners;
        const listWinners = winners.map((u, i) =>
            <img className='winner-icon' alt='winner' src={u.google_img_path}/>
        );
        if (info !== null) {
            return (
                <div className="MatchDetails">
                    <div className="info">{info.msg}<img className='status-icon' alt='status' src={info.ico}/></div>
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
                        <div className="col col-1 as-center text-center text-bold">
                            {info.status !== 'to be played' ? info.result : ''}
                        </div>
                        <div className="col col-1 text-center">
                            {info.away_team}
                        </div>
                    </div>
                    {
                        info.status === 'to be played' ?
                            <div className="teams">
                                <div id='home' onClick={this.setActive} className={info.bet_for_local === '1' ? 'col col-1 button active' : 'col col-1 button'}></div>
                                <div id='tie' onClick={this.setActive} className={info.bet_for_draw === '1' ? 'col col-1 button active' : 'col col-1 button'}></div>
                                <div id='away' onClick={this.setActive} className={info.bet_for_away === '1' ? 'col col-1 button active' : 'col col-1 button'}></div>
                            </div>
                        :
                            <div className="teams">
                                <div id='home' className={info.bet_for_local === '1' ? 'col col-1 button disabled active' : 'col col-1 disabled button'}></div>
                                <div id='tie' className={info.bet_for_draw === '1' ? 'col col-1 button disabled active' : 'col col-1 disabled button'}></div>
                                <div id='away' className={info.bet_for_away === '1' ? 'col col-1 button disabled active' : 'col col-1 disabled button'}></div>
                            </div>
                    }
                    {
                        info.status === 'played' ?
                            <div>
                                <div className="info">Ganadores<img className='info-icon' alt='trophy' src={trophy}/></div>
                                <div className="info winners">
                                    {listWinners}
                                </div>
                            </div>
                        :
                            null
                    }
                    
                </div>
            )
        } else {
            return(null);
        }
    }
}

export default MatchDetails