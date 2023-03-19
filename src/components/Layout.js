import React, { Component } from 'react';
import Login from './Login/Login';
import { connect } from 'react-redux';
import Signup from './Login/Signup';
import Header from './TeacherSide/Header';
import Dashboard from './TeacherSide/Dashboard/Dashboard';
import EditProfile from './TeacherSide/EditProfile/EditProfile';
class Layout extends Component {
    //TODO: add reducer with isAuth
    constructor(props){
        super(props);
        this.state = {
            isAuth: true,
        }
    }

    render() {
        const { isNewUser } = this.props.auth;
        return (
            <>
                { this.state.isAuth ? <EditProfile /> : (isNewUser ? <Signup /> : <Login />)}
            </>
        );
        // if (!this.state.isAuth) {
        //     return (this.props.auth.isNewUser ? <Signup /> : <Login />);
        //   } else {
        //     return (
        //       <>  
        //        <Header />
        //         <Routes>
        //           <Route  path="/home" element={<Dashboard />} />
                  
        //         </Routes >
        //       </>
                 
        //     );
        //   }
    }

}
function mapStateToProps(state) {
    return {
      auth: state.auth,
    };
  }
  export default connect(mapStateToProps, { })(Layout);
  
