import React, { Component } from 'react';
import Match from './subcomponents/Match';

class Matches extends Component {
    componentDidMount = () => {
        window.scrollTo(0, 0);
        this.props.refresh(this.props.games);
    };
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
        if (games.length === 0) {
            return (
                <div className="Matches content">
                    <div className='info-date'>Cargando...</div>
                </div>
            );
        } else {
            return (
                <div className="Matches content">
                    {listGames}
                </div>
            );
        }
    }
}

export default Matches