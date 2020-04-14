import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import logo from '../../img/fraggers.png'


const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

    

    const authLinks = (

        <ul>
            {/* <li><Link to="/profiles"><i className="las la-database"></i>{'  '}<span className="hide-sm"> </span></Link></li> */}
            {/* <li><Link to="/posts "><i className="las la-pen-square"></i>{'  '}<span className="hide-sm"> Latest Posts</span></Link></li> */}
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/dashboard"><i className="las la-user la-lg"></i>{'  '}<span className="hide-sm"> Dashboard</span></Link></li>
            <li><a onClick={logout} href="#!"><i className="las la-sign-out-alt la-lg"></i>{'  '}<span className="hide-sm"> Logout</span></a></li>
        </ul>
    );
    const guestLinks = (
        <ul>
            <li><Link to="/register"><i className="las la-user-plus la-lg"></i>{'  '}<span className="hide-sm"> Register</span></Link></li>
            <li><Link to="/login"><i className="las la-sign-in-alt la-lg"></i>{'  '}<span className="hide-sm"> Login</span></Link></li>
        </ul>
    );


    return (
        <nav className="navbar bg-new">

            <ul>
                <li>
                    <Link to="/"><img src={logo} style={{ width: '150px', margin: 'auto', display: 'inline' }} alt='Logo'></img></Link>
                </li>
            </ul>




            {/* <Link to="/"><i className="las la-robot la-lg" ></i> Fraggers</Link> */}


            {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)
