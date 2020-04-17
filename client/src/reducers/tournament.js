import {
    GET_TOUR, GET_TOURS, TOUR_ERROR, UPDATE_PARTICIPANTS, DELETE_TOUR, ADD_TOUR,CLEAR_TOUR 
} from '../actions/types';

const initialState = {
    tournament: null,
    tours: [],
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_TOURS:
            return {
                ...state,
                tours: payload,
                loading: false
            };
        case GET_TOUR:
            return {
                ...state,
                tournament: payload,
                loading: false
            };
        case ADD_TOUR:
            return {
                ...state,
                tours: [payload, ...state.tours],
                loading: false
            };
        case DELETE_TOUR:
            return {
                ...state,
                tours: state.tours.filter(tournament => tournament._id !== payload),
                loading: false
            };
        case TOUR_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case UPDATE_PARTICIPANTS:
            return {
                ...state,
                tours: state.tours.map(tournament =>
                    tournament._id === payload.id ? { ...tournament, participants: payload.participants } : tournament
                ),
                loading: false
            };
        // case ADD_COMMENT:
        //     return {
        //         ...state,
        //         post: { ...state.post, comments: payload },
        //         loading: false
        //     };
        // case REMOVE_COMMENT:
        //     return {
        //         ...state,
        //         post: {
        //             ...state.post,
        //             comments: state.post.comments.filter(
        //                 comment => comment._id !== payload
        //             )
        //         },
        //         loading: false
        //     };
        case CLEAR_TOUR:
            return {
                ...state,
                tournament: null,
                loading: false
            };
        default:
            return state;
    }
}