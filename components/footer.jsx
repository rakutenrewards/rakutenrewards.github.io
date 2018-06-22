import React from 'react';

export default () => {
  const footerStyle = {
    background: '#333333',
    color: '#aaaaaa',
    padding: '2.5rem 1.5rem',
    fontWeight: 'bold',
  };

  const footerLink = {
    color: '#dddddd',
  };

  return (
    <div className="footer" style={footerStyle}>
      <div className="container">
        <div className="columns has-text-centered">
          <div className="column">
            <a href="https://www.ebates.com" target="_blank" rel="noopener noreferrer" style={footerLink}>Ebates.com</a>
          </div>
          <div className="column">
            <a href="https://www.ebates.com/help/article/company-information-115009254588" target="_blank" rel="noopener noreferrer" style={footerLink}>About Ebates</a>
          </div>
          <div className="column">
            <a href="https://www.ebates.com/help/article/terms-conditions-115009325528" target="_blank" rel="noopener noreferrer" style={footerLink}>Terms & Conditions</a>
          </div>
          <div className="column">
            <a href="https://www.ebates.com/help/article/privacy-policy-115009657667" target="_blank" rel="noopener noreferrer" style={footerLink}>Privacy Policy</a>
          </div>
          <div className="column">
            <a href="https://www.ebates.com/help/other-questions" target="_blank" rel="noopener noreferrer" style={footerLink}>Contact Us</a>
          </div>
          <div className="column is-1" />
          <div className="column">
            &copy; 2018 Ebates Inc.
          </div>
        </div>
      </div>
    </div>
  );
};
