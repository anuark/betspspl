import React, { Component } from 'react';
import rusFlag from '../../assets/flags/rus.png';
import ksaFlag from '../../assets/flags/ksa.png';

class MatchPlayed extends Component {
    goToMatch = () => {
        this.props.goTo(this.props.id);
    };
    render() {
        const info = this.props.info;
        return (
            <div className="Match">
                <div className="info">El partido ya finalizo</div>
                <div className="teams">
                    <div className="col col-1 as-center text-center text-bold">
                        {info.id}.
                    </div>
                    <div className="col col-6">
                        <div>
                            <img className="flag" src={rusFlag} alt="home" /> {info.local_team}
                        </div>
                        <div>
                            <img className="flag" src={ksaFlag} alt="away" /> {info.away_team}
                        </div>
                    </div>
                    <div className='col col-1 info score' >
                        <div>{info.result.split(':')[0]}</div>
                        <div>{info.result.split(':')[1]}</div>
                    </div>
                    <div className='col col-2 info date' >
                        {info.date}
                    </div>
                </div>
            </div>
        )
    }
}

export default MatchPlayed