import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
    profile: {
        user: { _id, name, avatar },
        status,
        organization,
        location,
        skills
    }
}) => {
    return (
        <div className='profile bg-light'>
            <img src={avatar} alt='' className='round-img' />
            <div>
                <h2>{name}</h2>
                <p>
                    {status} {organization && <span> at {organization}</span>}
                </p>
                <p className='my-1'>{location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`} className='btn btn-primary'>
                    View Profile
        </Link>
            </div>
            <ul>

                <li className='text-primary'>
                    <i className="las la-angle-right"></i>Roles in the team:{skills}
                </li>

            </ul>
        </div>
    );
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileItem;