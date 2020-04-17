import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';

import { getTournaments } from '../../actions/tournament';
import TournamentItem from './TournamentItem';
import Participated from './Participated';


const MyTournaments = ({ getTournaments, tournament: { tours, loading } }) => {
    useEffect(() => {
        getTournaments();
    }, [getTournaments]);



    // return (
    return loading ? (
        <Spinner />
    ) : (
            <Fragment>
                <h1 className='large text-primary'>Owned Tournaments</h1>
                

                <div className='posts'>
                    {tours.length > 0 ? (tours.map(tournament => (
                        <TournamentItem key={tournament._id} tournament={tournament} />
                    ))) : (<h4>No profiles found...</h4>)}
                </div>
                <h1 className='large text-primary'>Participated Tournaments</h1>
                <div className='posts'>
                    {tours.length > 0 ? (tours.map(tournament => (
                        <Participated key={tournament._id} tournament={tournament} />
                    ))) : (<h4>No profiles found...</h4>)}
                </div>
            </Fragment>)
    // );
};

MyTournaments.propTypes = {
    getTournaments: PropTypes.func.isRequired,
    tournament: PropTypes.object.isRequired
};

const mapStateToProps = state => (
    {
        tournament: state.tournament
    });

export default connect(
    mapStateToProps,
    { getTournaments })(MyTournaments);