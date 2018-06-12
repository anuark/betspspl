import React, { Component } from 'react';
import Match from './subcomponents/Match';
import MatchPlayed from './subcomponents/MatchPlayed';

class Matches extends Component {
    render() {
        return (
            <div className="Matches">
                <Match />
                <MatchPlayed />
            </div>
        )
    }
}

export default Matches