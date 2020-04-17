import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience.js';
import { getProfileById } from '../../actions/profile';
import ProfileAchievements from './ProfileAchievements';

const Profile = ({
    getProfileById,
    profile: { profile, loading },
    auth,
    match
}) => {
    const nullProfile = !profile;
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id, nullProfile]);
    let history = useHistory();
    return (
        <Fragment>
            {profile === null || loading ? (
                <Spinner />
            ) : (
                    <Fragment>
                        <button className="btn" onClick={() => history.goBack()}>Back</button>
                        {auth.isAuthenticated &&
                            auth.loading === false &&
                            auth.user._id === profile.user._id && (
                                <Link to="/edit-profile" className="btn btn-dark">
                                    Edit Profile
                                </Link>
                            )}
                        <div className="profile-grid my-1">
                            <ProfileTop profile={profile} />
                            <ProfileAbout profile={profile} />
                            <div className="profile-exp bg-white p-2">
                                <h2 className="text-primary">Experience</h2>
                                {profile.experience.length > 0 ? (
                                    <Fragment>
                                        {profile.experience.map(experience => (
                                            <ProfileExperience
                                                key={experience._id}
                                                experience={experience}
                                            />
                                        ))}
                                    </Fragment>
                                ) : (
                                        <h4>No experience credentials</h4>
                                    )}
                            </div>

                            <div className="profile-edu bg-white p-2">
                                <h2 className="text-primary">Achievements</h2>
                                {profile.achievements.length > 0 ? (
                                    <Fragment>
                                        {profile.achievements.map(achievement => (
                                            <ProfileAchievements
                                                key={achievement._id}
                                                achievement={achievement}
                                            />
                                        ))}
                                    </Fragment>
                                ) : (
                                        <h4>No achievement credentials</h4>
                                    )}
                            </div>


                        </div>
                    </Fragment>
                )}
        </Fragment>
    );
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);