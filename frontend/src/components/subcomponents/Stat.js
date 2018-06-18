import React, { Component } from 'react';
import up from '../../assets/up.png';
import down from '../../assets/down.png';
import same from '../../assets/same.png';

class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            you: false
        };
    };
    componentDidMount = () => {
        let uId = localStorage.getItem('userId');
        if (parseInt(uId, 10) === this.props.id) {
            this.setState({
                you: true
            });
        }
    };
    goToProfile = (e) => {
        this.props.history.push('/profile/'+this.props.id);
    };
    render() {
        return (
            <div className="Match table">
                <div className="teams">
                    <div className={this.state.you ? "col text-center col-1 text-bold" : "col text-center col-1"}>
                        {this.props.num}
                    </div>
                    <div className="col col-1 text-center">
                        <img className='pos' src={this.props.pos === 0 ? same : (this.props.pos === 1 ? up : down)} alt='pos' />
                    </div>
                    <div onClick={this.goToProfile} className={this.state.you ? "row center-center col-6 text-bold" : "row center-center col-6"}>
                        <img className='userImage' src={this.props.img} alt='jugador' />
                        {this.state.you ? (this.props.name + ' (tu)') : this.props.name}
                    </div>
                    <div className='col col-2 text-center text-bold'>
                        {this.props.points} pts
                    </div>
                </div>
            </div>
        )
    }
}

export default Stats