import React from 'react';
import {connect} from 'react-redux';
import {clearUser} from '../redux/reducer';

const Dashboard = props => {
    console.log(props)

    const logout = () => {
        //code here
    }

    return (
        <main className='dashboard'>
            <section className='user-info'>
                <h3>{props.user.email}</h3>
            </section>
        </main>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {clearUser})(Dashboard);