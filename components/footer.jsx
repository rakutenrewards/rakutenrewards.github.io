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
            <a href="https://www.rakuten.com" target="_blank" rel="noopener noreferrer" style={footerLink}>Rakuten.com</a>
          </div>
          <div className="column">
            <a href="https://www.rakuten.com/our-company" target="_blank" rel="noopener noreferrer" style={footerLink}>About Rakuten</a>
          </div>
          <div className="column">
            <a href="https://www.rakuten.com/terms_and_conditions" target="_blank" rel="noopener noreferrer" style={footerLink}>Terms & Conditions</a>
          </div>
          <div className="column">
            <a href="https://www.rakuten.com/privacy_policy" target="_blank" rel="noopener noreferrer" style={footerLink}>Privacy Policy</a>
          </div>
          <div className="column">
            <a href="https://www.rakuten.com/help/other-questions" target="_blank" rel="noopener noreferrer" style={footerLink}>Contact Us</a>
          </div>
          <div className="column is-1" />
          <div className="column">
            &copy; 2019 Rakuten Inc.
          </div>
        </div>
      </div>
    </div>
  );
};
