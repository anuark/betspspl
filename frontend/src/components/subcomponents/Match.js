import React, { Component } from 'react';
import radio from '../../assets/notchecked.png';
import radioOn from '../../assets/checked.png';
import rusFlag from '../../assets/flags/rus.png';
import ksaFlag from '../../assets/flags/ksa.png';

class Match extends Component {
    render() {
        return (
            <div className="Match">
                <div className="info">Group A Match 1 of 3</div>
                <div className="teams">
                    <div className="col col-2">
                        <div className="col-1 radio">
                            <img src={radio} alt="homeOn" />
                        </div>
                        <div className="col-1 radio">
                            <img src={radio} alt="homeOn" />
                        </div>
                    </div>
                    <div className="col col-6">
                        <div>
                            <img className="flag" src={rusFlag} alt="home" /> Russia
                        </div>
                        <div>
                            <img className="flag" src={ksaFlag} alt="away" /> Saudi Arabia
                        </div>
                    </div>
                    <div className='col col-1 info score' >

                    </div>
                    <div className='col col-2 info date' >
                        6/14 9am
                    </div>
                </div>
            </div>
        )
    }
}

export default Match