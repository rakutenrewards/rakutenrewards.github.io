import React from 'react';
import axios from 'axios';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    axios.get('https://api.github.com/users/ebates-inc/repos').then((data) => {
      console.log(data);
    });
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
              Open Source @ Ebates
            </h1>
            <h2 className="subtitle">
              A Rakuten company
            </h2>
          </div>
        </div>
      </section>
    );
  }
}
