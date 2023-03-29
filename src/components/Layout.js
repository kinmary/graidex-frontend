import React, { Component } from 'react';
import Login from './Login/Login';
import { connect } from 'react-redux';
import Signup from './Login/Signup';
import Header from './TeacherSide/Header';
import Dashboard from './TeacherSide/Dashboard/Dashboard';
import EditProfile from './TeacherSide/EditProfile/EditProfile';
import { withRouter } from '../utils/withRouter';

class Layout extends Component {
    //TODO: add reducer with isAuth
    //TODO:rosponsive login and signup
    static Content = ({ children }) => 
    <div >
      {children}
    </div>;

  render () {
    return (
      <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent:"center", }}>
        <Header />
        {this.props.children}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    main: state.Main
  };
}

 
export default withRouter(connect(
  mapStateToProps,
  {  }
)(Layout));
