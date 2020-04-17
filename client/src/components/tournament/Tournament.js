import React, { Fragment, useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import { addParticipants } from '../../actions/tournament';
import { getTournament } from '../../actions/tournament';

import { useHistory } from 'react-router-dom';
import Participants from './Participants';

const Tournament = ({ addParticipants, getTournament, auth, tournament: { tournament, loading }, match }) => {
    useEffect(() => {
        getTournament(match.params.id);
    }, [getTournament, match.params.id]);

    let history = useHistory();
    const [display, toggle] = useState(false)

    return loading || tournament === null ? (
        <Spinner />
    ) : (
            <Fragment>
                <button className="btn" onClick={() => history.goBack()}>Back</button>


                <div className='tour bg-white p-1 my-1'>
                    <div>
                        <ul>
                            <li><h1>{tournament.name}</h1></li>
                            <li>Game:{tournament.game}</li>
                            <li>Prize Pool:{tournament.pricepool}</li>
                            <li>Entry Fees:{tournament.entry_fees}</li>
                            <li>Description:{tournament.text}</li>
                            {tournament.user === auth.user._id ? (
                                <div className="comments">
                                    {tournament.participants.map(participant => (
                                        <Participants key={participant._id} participant={participant} />
                                    ))}
                                </div>
                            ) : <Fragment>
                                    {(tournament.participants.find(participant => participant.user === auth.user._id) == null) ? (<button
                                        onClick={() => { addParticipants(tournament._id); toggle(!display)}}
                                        type='button'
                                        className='btn btn-light'>
                                        Participate
                                    </button>) : (<h1>You have already participated</h1>)
                                    }
                                    {display && <h1>  participated</h1>}
                                </Fragment>}
                        </ul>
                    </div>
                </div>

            </Fragment>
        );
};

Tournament.propTypes = {
    getTournament: PropTypes.func.isRequired,
    tournament: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addParticipants: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    tournament: state.tournament,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getTournament, addParticipants })(Tournament);