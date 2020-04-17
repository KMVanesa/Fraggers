import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import TournamentForm from './TournamentForm';
import TournamentItem from './TournamentItem';
import { getTournaments } from '../../actions/tournament';

const Tournaments = ({ getTournaments, tournament: { tours, loading } }) => {
    useEffect(() => {
        getTournaments();
    }, [getTournaments]);
    // return (
        return loading ? (
            <Spinner />
        ) : (
        <Fragment>
            <h1 className='large text-primary'>Tournaments</h1>
            <TournamentForm />
            <p className='lead'>
                <i className='las la-user' /> Participate here
                </p>
            <div className='posts'>
                {tours.length>0?(tours.map(tournament => (
                        <TournamentItem key={tournament._id} tournament={tournament} />
                    ))):(<h4>No profiles found...</h4>)}
            </div>
        </Fragment>)
    // );
};

Tournaments.propTypes = {
    getTournaments: PropTypes.func.isRequired,
    tournament: PropTypes.object.isRequired
};

const mapStateToProps = state => (
    {
    tournament: state.tournament
});

export default connect(
    mapStateToProps,
    { getTournaments })(Tournaments);