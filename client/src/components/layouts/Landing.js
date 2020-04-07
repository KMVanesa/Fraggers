
import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import logo from '../../img/logo2.png'

const Landing = ({isAuthenticated}) => {

    if(isAuthenticated){
        return <Redirect to="/dashboard" />
    }


    return (
        <section className="landing">
        <div className="dark-overlay">
            <div className="landing-inner">
                <h1 className="x-large"><img src={logo} style={{ width: '400px', margin: 'auto',display:'inline' }} alt='Logo'></img></h1>
                <p className="lead">
                    Create a e-sports profile/portfolio, share posts and get connected with other players.
                </p>
                <div className="buttons">
                    <Link to="/register" className="btn btn-primary">Sign Up</Link>
                    <Link to="/login" className="btn btn-light">Login</Link>
                </div>
            </div>
        </div>
    </section>
    )
}

Landing.protoTypes={
    isAuthenticated:PropTypes.bool,
}

const mapsStateToProps= state=>({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapsStateToProps)(Landing)

