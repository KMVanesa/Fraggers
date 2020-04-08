import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAchievements } from '../../actions/profile';

const AddAchievements = ({ addAchievements, history }) => {
    const [formData, setFormData] = useState({
        title:'',
        game:'',
        location:'',
        position:'',
        description:''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {
        title,
        game,
        location,
        position,
        description
    } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            <h1 className='large text-primary'>Add Your Achievements</h1>
            <small>* = required field</small>
            <form
                className='form'
                onSubmit={e => {
                    e.preventDefault();
                    addAchievements(formData, history);
                }}
            >
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='* Title'
                        name='title'
                        value={title}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='* CS:GO or LoL'
                        name='game'
                        value={game}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='* New York'
                        name='location'
                        value={location}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        name='position'
                        placeholder='* Position'
                        value={position}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <textarea
                        name='description'
                        cols='30'
                        rows='5'
                        placeholder='Achievement Description'
                        value={description}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type='submit' value="Submit" className='btn btn-primary my-1' />
                <Link className='btn btn-light my-1' to='/dashboard'>
                    Go Back
        </Link>
            </form>
        </Fragment>
    );
};

AddAchievements.propTypes = {
    addEducation: PropTypes.func.isRequired
};

export default connect(
    null,
    { addAchievements }
)(withRouter(AddAchievements));