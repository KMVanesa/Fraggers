import React from 'react';
import PropTypes from 'prop-types';


const ProfileAchievements = ({
    achievement: { title, game, location, position, description }
}) => (
        <div>
            <h3 className="text-dark">Title:{"  "}{title}</h3>
            <p>
                <strong>Game: </strong> {game}
            </p>
            <p>
                <strong>Location: </strong> {location}
            </p>
            <p>
                <strong>Position: </strong> {position}
            </p>
            <p>
                <strong>Description: </strong> {description}
            </p>
        </div>
    );

ProfileAchievements.propTypes = {
    achievement: PropTypes.object.isRequired
};

export default ProfileAchievements;