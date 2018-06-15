import React, { Component } from 'react';
import arg from '../../assets/flags/arg.png';
import aus from '../../assets/flags/aus.png';
import bel from '../../assets/flags/bel.png';
import bra from '../../assets/flags/bra.png';
import col from '../../assets/flags/col.png';
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
    'Sweden': swe,
    'Switzerland': sui,
    'Tunisia': tun,
    'Uruguay': uru
}

class Match extends Component {
    goToMatch = () => {
        this.props.goTo(this.props.info.date);
    };
    render() {
        const info = this.props.info;
        return (
            <div className="Match" onClick={this.goToMatch}>
                <div className="info">{info.msg}<img className='status-icon' alt='status' src={info.ico}/></div>
                <div className="teams">
                    <div className="col col-1 as-center text-center info">
                        {info.id}.
                    </div>
                    <div className="col col-6">
                        <div>
                            <img className="flag" src={flag[info.local_team]} alt="home" /> {info.local_team_es}
                        </div>
                        <div>
                            <img className="flag" src={flag[info.away_team]} alt="away" /> {info.away_team_es}
                        </div>
                    </div>
                    <div className='col col-1 info score'>
                        <div>{(info.status !== 'to be played' && info.result !== null) ? info.result.split(':')[0] : ''}</div>
                        <div>{(info.status !== 'to be played' && info.result !== null) ? info.result.split(':')[1] : ''}</div>
                    </div>
                    <div className='col col-2 info date' >
                        {info.date} {info.time}
                    </div>
                </div>
            </div>
        )
    }
}

export default Match