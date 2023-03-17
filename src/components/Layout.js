import React, { Component } from 'react';
import Login from './Login/Login';
import { connect } from 'react-redux';
import Signup from './Login/Signup';
class Layout extends Component {
    //add reducer with isAuthenticated 
    constructor(props){
        super(props);
        this.state = {
            isAuth: false,
        }
    }

    render() {
        const { isNewUser } = this.props.auth;
        return (
            <>
                { this.state.isAuth === false && (isNewUser ? <Signup /> : <Login />)}
            </>
        );
    }
}
function mapStateToProps(state) {
    return {
      auth: state.auth,
    };
  }
  export default connect(mapStateToProps, { })(Layout);
  
