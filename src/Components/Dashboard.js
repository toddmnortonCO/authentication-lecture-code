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
                
            </section>
        </main>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {clearUser})(Dashboard);