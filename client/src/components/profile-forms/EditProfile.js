import React, { useState, Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProfile, getCurrentProfile } from '../../actions/profile'
import { Link, withRouter } from 'react-router-dom'

const initialState = {
    organization: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    ign: '',
    bio: '',
    twitter: '',
    facebook: '',
    discord: '',
    youtube: '',
    instagram: ''
};

const EditProfile = ({ profile: { profile, loading }, createProfile, history, getCurrentProfile }) => {
    const [formData, setFormData] = useState({
        organization: '',
        website: '',
        ign: '',
        location: '',
        status: '',
        skills: '',
        bio: '',
        facebook: '',
        youtube: '',
        instagram: '',
        twitter: '',
        discord: ''
    })

    const [displaySocialInputs, toggleSocialInputs] = useState(false)

    useEffect(() => {
        if (!profile) getCurrentProfile();
        if (!loading && profile) {
            const profileData = { ...initialState };
            for (const key in profile) {
                if (key in profileData) profileData[key] = profile[key];
            }
            for (const key in profile.social) {
                if (key in profileData) profileData[key] = profile.social[key];
            }
            setFormData(profileData);
        }
    }, [loading]);
    const {
        organization,
        website,
        location,
        bio,
        status,
        ign,
        skills,
        youtube,
        facebook,
        instagram,
        twitter,
        discord
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history,true)
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Create Your Profile
            </h1>
            <p className="lead">
                <i className="las la-user"></i> Let's get some information to make your
        profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <select name="status" value={status} onChange={e => onChange(e)}>
                        <option value="0">* Select Status</option>
                        <option value="E-Sports Player">E-Sports Player</option>
                        <option value="Social Media Influencer">Social Media Influencer</option>
                        <option value="Coach">Coach</option>
                        <option value="Caster">Caster</option>
                        <option value="Match Analyst">Match Analyst</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">Give us an idea of where you are at in your career</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Organization" name="organization" value={organization} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Could be your own Organization or one you work for</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" value={website} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Could be your own or a Organization website</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >City & state suggested (eg. Boston, MA)</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Please use comma separated values (eg.IGL,Sniper,Assaulter)</small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="IGN"
                        name="ign"
                        value={ign} onChange={e => onChange(e)}
                    />
                    <small className="form-text">
                        If you want your latest stats displayed, include your ign
                        </small>
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                    <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
                        Toggle Social Network Links
                    </button>
                    <span>Optional</span>
                </div>

                {displaySocialInputs &&
                    <Fragment>
                        <div className="form-group social-input">
                            <i className="lab la-twitter la-2x"></i>
                            <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="lab la-facebook la-2x"></i>
                            <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="lab la-youtube la-2x"></i>
                            <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="lab la-discord la-2x"></i>
                            <input type="text" placeholder="Discord URL" name="discord" value={discord} onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="lab la-instagram la-2x"></i>
                            <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)} />
                        </div>
                    </Fragment>}


                <input type="submit" value="Submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,

}
const mapStateToProps = state => ({
    profile: state.profile
})



export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile))
