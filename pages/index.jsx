import React from 'react';

export default class extends React.Component {
  static async getInitialProps() {
    // Do some stuff ehre
    return {};
  }

  render() {
    // TODO: Make hero its own component

    const heroBackground = {
      background: 'url(//static.ebates.com/images/help/help-center/hero-bg.jpg) repeat 0 0',
    };

    return (
      <section className="hero is-success" style={heroBackground}>
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Ebates
            </h1>
            <h2 className="subtitle">
              Primary subtitle
            </h2>
          </div>
        </div>
      </section>
    );
  }
}
