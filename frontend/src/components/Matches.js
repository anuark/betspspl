import React, { Component } from 'react';
import Match from './subcomponents/Match';

class Matches extends Component {
    goToMatch = (id) => {
        this.props.history.push('/match/'+id);
        this.props.setMatchDetails(id);
    };
    render() {
        const games = this.props.games;
        const listGames = games.map((game, index) =>
            <Match key={game.id} goTo={this.goToMatch} id={game.id} info={game}/>
        )
        return (
            <div className="Matches">
                {listGames}
            </div>
        )
    }
}

export default Matches