import React, { Component } from 'react';
import Match from './subcomponents/Match';

class Matches extends Component {
    goToMatch = (date) => {
        this.props.history.push('/match/'+date);
    };
    render() {
        const games = this.props.games;
        const listGames = games.map((game, index) =>
            <div key={game.id}>
                {game.first ? <div className='info-date'>{game.date}</div> : ''}
                <Match goTo={this.goToMatch} id={game.id} info={game}/>
            </div>
        )
        return (
            <div className="Matches content">
                {listGames}
            </div>
        )
    }
}

export default Matches