
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


const About = ({ isAuthenticated }) => {

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }


    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">About US</h1>
                    <p className="lead">
                        Fraggers is a platform for the Gamers and Gaming organizations that operates via a Website. It acts as a bridge to build connections between the players and also the organizations. We provide different kinds of account i.e  for Organization,for personalizing users (Participators) , for YouTube Influencer etc. The personal account consists of his/her gaming portfolio which includes the achievements, statistics, game play videos and all other records. Any organization can organize an event and advertise on the website and the player can enroll in the event. It can prove a good opportunity for the players to show their skills.
                    </p>
                    <footer class="page-footer font-small">
                        <div class="footer-copyright text-center py-3" >© 2020 Copyright:
                    <Link to="/" >www.Fraggers.gg</Link>
                        </div>
                    </footer>
                </div>

            </div>

        </section>
    )
}

About.protoTypes = {
    isAuthenticated: PropTypes.bool,
}

const mapsStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapsStateToProps)(About)

