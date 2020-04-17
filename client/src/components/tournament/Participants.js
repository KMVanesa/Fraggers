import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Participants = ({
    participant: { name, avatar, user, date },

}) => (
        <div className='post bg-white p-1 my-1'>
            <div>
                <h1>Participants</h1>
                <Link to={`/profile/${user}`}>
                    <img className='round-img' src={avatar} alt='' />
                    <h4>{name}</h4>
                </Link>
                <p className='post-date'>
                    Registered on <Moment format='YYYY/MM/DD'>{date}</Moment>
                </p>

            </div>
        </div>
    );

Participants.propTypes = {
    participant: PropTypes.object.isRequired,
};


export default Participants;