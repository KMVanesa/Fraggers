import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addParticipants } from '../../actions/tournament';


const TournamentItem = ({
    addParticipants,
    auth,
    tournament: { _id, text, name, entry_fees, user, participants, date },
    showActions
}) => (
        <div className='post bg-white p-1 my-1'>
            <div>
                <p className='my-1'>{name}</p>
                <p className='my-1'>{text}</p>
                <p className='my-1'>{entry_fees}</p>
                <p className='post-date'>
                    Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                </p>

                {showActions && (
                    <Fragment>
                        <button
                            onClick={() => addParticipants(_id)}
                            type='button'
                            className='btn btn-light'>
                            <i className='las la-thumbs-up' />{' '}
                            <span>{participants.length > 0 && <span>{participants.length}</span>}</span>
                        </button>

                        <Link to={`/tournaments/${_id}`} className='btn btn-primary'>
                        </Link>
                    </Fragment>
                )}
            </div>
        </div>
    );

TournamentItem.defaultProps = {
    showActions: true
};

TournamentItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addParticipants: PropTypes.func.isRequired,
    showActions: PropTypes.bool
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { addParticipants }
)(TournamentItem);