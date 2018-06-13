import React, { Component } from 'react';
import MatchDetails from './subcomponents/MatchDetails';
import backIcon from '../assets/back.png';

class Matches extends Component {
    componentDidMount = () => {
        window.scrollTo(0, 0);
    };
    goBack = () => {
        this.props.history.push('/');
    };
    betFor = (data) => {
        this.props.betFor(data);
    };
    render() {
        const games = this.props.games;
        const dateGames = [];
        for (let i = 0; i < games.length; i++) {
            if (games[i].date === this.props.match.params.date) {
                dateGames.push(games[i]);
            }
        }
        const listGames = dateGames.map((game, index) =>
            <div key={game.id}>
                <MatchDetails id={game.id} info={game} betFor={this.betFor}/>
            </div>
        )
        return (
            <div className="Matches content">
                <div className='info-date'><img onClick={this.goBack} className='back-image' src={backIcon} alt='back' /> {this.props.match.params.date}</div>
                {listGames}
            </div>
        )
    }
}

export default Matches