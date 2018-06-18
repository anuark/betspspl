import React, { Component } from 'react';
import axios from 'axios';
import Stat from './subcomponents/Stat';

class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stats: []
        };
    };
    componentDidMount = () => {
        let opt = {
            method: 'GET',
            url: 'https://bet-api.sps-pl.com/score-board',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        };
        axios(opt).then(res=>{
            this.setState({
                stats: res.data
            });
        });
    };
    render() {
        const stats = this.state.stats;
        const listPlayers = stats.map((u, i) =>
            <Stat key={u.user_id} id={u.user_id} num={i+1} name={u.username} points={u.points} pos={u.pos} />
        );
        return (
            <div className="Matches content">
                {listPlayers}
            </div>
        )
    }
}

export default Stats