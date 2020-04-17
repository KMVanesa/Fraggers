import axios from 'axios';
import { setAlert } from './alert';
import { GET_TOUR, GET_TOURS, TOUR_ERROR, UPDATE_PARTICIPANTS, DELETE_TOUR, ADD_TOUR,CLEAR_TOUR } from './types';

// Get TOURNAMENTS
export const getTournaments = () => async dispatch => {
    dispatch({ type: CLEAR_TOUR });
    console.log('kmv1')
    try {
        const res = await axios.get('/api/tournaments');
        console.log('kmv2')
        dispatch({
            type: GET_TOURS,
            payload: res.data
        });
        console.log(res.data);
    } catch (err) {
        dispatch({
            type: TOUR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// Add PARTICIPANTS
export const addParticipants = id => async dispatch => {
    try {
        const res = await axios.put(`/api/tournaments/participant/${id}`);
        console.log("hello")
        dispatch({
            type: UPDATE_PARTICIPANTS,
            payload: { id, participants: res.data }
        });
    } catch (err) {
        dispatch({
            type: TOUR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add TOURNAMENTS
export const addTournament = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('/api/tournaments', formData, config);

        dispatch({
            type: ADD_TOUR,
            payload: res.data
        });

        dispatch(setAlert('Tournament Created', 'success'));
    } catch (err) {
        dispatch({
            type: TOUR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get TOURNAMENT
export const getTournament = id => async dispatch => {
    
    try {
        const res = await axios.get(`/api/tournaments/${id}`);

        dispatch({
            type: GET_TOUR,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: TOUR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
