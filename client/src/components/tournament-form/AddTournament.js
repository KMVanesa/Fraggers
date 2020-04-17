import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { addTournament } from '../../actions/tournament'

const CreateProfile = ({ addTournament }) => {
    const [formData, setFormData] = useState({
        text: '',
        name: '',
        game: '',
        pricepool: '',
        from: '',
        to: '',
        entry_fees: '',
    })

    const {
        text,
        name,
        game,
        pricepool,
        from,
        to,
        entry_fees,
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        addTournament(formData)
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Host a Tournament
            </h1>
            <p className="lead">
                <i className="las la-user"></i> Let's get some information about tournament
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Title of your Tournament</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Game" name="game" value={game} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Which Game? Example CS:GO,LoL</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Price Pool" name="pricepool" value={pricepool} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Amount You are willing as Prize</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Entry Fees" name="entry_fees" value={entry_fees} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Could be Free or anything less than Prize Pool</small>
                </div>
                <div className='form-group'>
                    <h4>From Date</h4>
                    <input
                        type='date'
                        name='from'
                        value={from}
                        onChange={e => onChange(e)}
                    />
                </div>
                
                <div className='form-group'>
                    <h4>To Date</h4>
                    <input
                        type='date'
                        name='to'
                        value={to}
                        onChange={e => onChange(e)}
                        
                    />
                </div>
                <div className='form-group'>
                    <textarea
                        name='text'
                        cols='30'
                        rows='5'
                        placeholder='Description'
                        value={text}
                        onChange={e => onChange(e)}
                    />
                </div>

                <input type="submit" value="Submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/tournaments">Go Back</Link>
            </form>
        </Fragment>
    )
}

CreateProfile.propTypes = {
    addTournament: PropTypes.func.isRequired,
}



export default connect(null, { addTournament })(withRouter(CreateProfile))
