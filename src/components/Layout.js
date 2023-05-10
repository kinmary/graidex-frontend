import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { withRouter } from '../utils/withRouter';
import Footer from './Footer';

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
        <Footer />
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
