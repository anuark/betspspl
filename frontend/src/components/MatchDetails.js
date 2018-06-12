import React, { Component } from 'react';
import rusFlag from '../assets/flags/rus.png';
import backIcon from '../assets/back.png';
import ksaFlag from '../assets/flags/ksa.png';

class MatchDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classHome: 'col col-1 button',
            classAway: 'col col-1 button',
            classTie: 'col col-1 button',
        };
    };
    componentDidMount = () => {
        if (this.props.info === null) {
            this.props.history.go('/');
        }
    };
    goToMatch = (id) => {
        this.props.history.push('/match/'+id);
    };
    goBack = (id) => {
        this.props.history.push('/');
    };
    setActive = (e) => {
        let id = e.target.getAttribute('id');
        let data = {
            game_id: this.props.info.id
        };
        switch (id) {
            case 'home':
                data.bet_for_local = 1;
                this.setState({
                    classHome: 'col col-1 button active',
                    classAway: 'col col-1 button',
                    classTie: 'col col-1 button'
                });
                break;
            case 'tie':
                data.bet_for_tie = 1;
                this.setState({
                    classHome: 'col col-1 button',
                    classAway: 'col col-1 button',
                    classTie: 'col col-1 button active'
                });
                break;
            case 'away':
                data.bet_for_away = 1;
                this.setState({
                    classHome: 'col col-1 button',
                    classAway: 'col col-1 button active',
                    classTie: 'col col-1 button'
                });
                break;
            default:
                break;
        }
        this.props.betForFunction(data);
    };
    render() {
        const info = this.props.info;
        if (info !== null) {
            return (
                <div className="MatchDetails content">
                    <div className="info"><img onClick={this.goBack} className='back-image' src={backIcon} alt='back' /> {this.props.betFor}</div>
                    <div className="teams">
                        <div className="col col-1 text-center">
                            <img className="flag" src={rusFlag} alt="home" />
                        </div>
                        <div className="col col-1 as-center text-center">
                            Empate
                    </div>
                        <div className="col col-1 text-center">
                            <img className="flag" src={ksaFlag} alt="home" />
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