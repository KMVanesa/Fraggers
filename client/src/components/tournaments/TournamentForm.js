import React from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

const TournamentForm = () => {

    return (
        <Link to="/add-tournament" className='btn btn-primary'>Create 
        Tournament</Link>
    );
};



export default connect(
    null,
    { }
)(TournamentForm);