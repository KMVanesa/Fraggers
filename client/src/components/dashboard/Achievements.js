import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { deleteAchievement } from '../../actions/profile';

const Achievements = ({ achievement, deleteAchievement }) => {

    const achievements = achievement.map(ach => (
        <tr key={ach._id}>
            <td>{ach.title}</td>
            <td className="hide-sm">{ach.game}</td>
            <td className="hide-sm">{ach.position}</td>
            <td>
                <button
                    onClick={() => deleteAchievement(ach._id)}
                    className="btn btn-danger">
                    Delete
        </button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className="my-2">Achievement Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th className="hide-sm">Game</th>
                        <th className="hide-sm">Position</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{achievements}</tbody>
            </table>
        </Fragment>
    );
};


Achievements.propTypes = {
    achievement:PropTypes.array.isRequired,
    deleteAchievement:PropTypes.func.isRequired,
}

export default connect(
    null,
    { deleteAchievement }
)(Achievements);
