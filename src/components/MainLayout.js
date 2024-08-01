import React from 'react';
import PropTypes from 'prop-types';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Siderbar from './layout/Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="App">
      <Header />
      <div className="main-layout">
        <Siderbar />
        <main className="content">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
