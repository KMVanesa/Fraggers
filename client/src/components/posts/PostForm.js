import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
    const [setForm, setText] = useState({
        text:"",
        image:""
    });

    const{
        text,
        image
    }=setForm;

    
    

    const onChange = e => setText({ [e.target.name]: e.target.value })

    

    const onSubmit = e => {
        e.preventDefault();
        addPost(setForm)
    }

    return (
        <div className='post-form'>
            <div className='bg-primary p'>
                <h3>Say Something...</h3>
            </div>
            <form
                className='form my-1'
                onSubmit={e => onSubmit(e)}
            >
                <textarea
                    name='text'
                    cols='30'
                    rows='5'
                    placeholder='Create a post'
                    value={text}
                    onChange={e => onChange(e)}
                    required
                />
                <input type='file' name='image' className='btn btn-light my-1' id='single' value={image} onChange={e => onChange(e)} /> 
                <input type='submit' className='btn btn-dark my-1' value='Submit' />
            </form>
        </div>
    );
};

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
};

export default connect(
    null,
    { addPost }
)(PostForm);