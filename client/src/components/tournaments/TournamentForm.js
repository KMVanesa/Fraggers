import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTournament } from '../../actions/tournament';
import { Link } from 'react-router-dom';

const TournamentForm = () => {

    return (
        <Link to="/tournamentform" className='btn btn-primary'>Create 
        Tournament</Link>
    );
};



export default connect(
    null,
    { }
)(TournamentForm);