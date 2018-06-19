/* global localStorage */
import React from 'react';
import axios from 'axios';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
    };
  }
  async componentWillMount() {
    let repos = [];
    try {
      const request = await axios.get('https://api.github.com/users/ebates-inc/repos');
      request.data.forEach((repo) => {
        const struct = {
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          license: repo.license.spdx_id,
        };
        repos.push(struct);
      });

      localStorage.setItem('repos', JSON.stringify(repos));
    } catch (err) {
      console.log('GitHub API fetch failed, getting repos from local storage');
      repos = JSON.parse(localStorage.getItem('repos'));
    }

    this.setState((prevState) => {
      const newState = Object.assign({}, prevState, { repos });
      return newState;
    });
  }

  render() {
    // TODO: Make hero its own component

    const heroBackground = {
      background: 'url(//static.ebates.com/images/help/help-center/hero-bg.jpg) repeat 0 0',
    };

    const repoCards = this.state.repos.map((repo) => {
      let language;
      let license;
      if (repo.language) {
        language = <span className="subtitle is-6"> <i className="fas fa-code" />&nbsp;{ repo.language }&nbsp;&nbsp;</span>;
      }
      if (repo.license) {
        license = <span className="subtitle is-6"> <i className="fas fa-balance-scale" />&nbsp;{ repo.license }&nbsp;&nbsp;</span>;
      }
      return (
        <div className="column is-one-third">
          <a href={repo.url} target="_blank" rel="noopener noreferrer">
            <div className="card" style={{ height: '100%', display: 'flex', 'flex-direction': 'column' }}>
              <div className="card-content">
                <p className="title is-size-4">
                  { repo.name }
                </p>
                <p className="subtitle is-size-6">
                  { repo.description }
                </p>
                { language } { license }
              </div>
              <footer className="card-footer" style={{ 'margin-top': 'auto' }}>
                <p className="card-footer-item">
                  <span>
                    <a href={repo.url} target="_blank" rel="noopener noreferrer">View on GitHub</a>
                  </span>
                </p>
                <p className="card-footer-item columns">
                  <div className="column has-text-right">
                    <i className="fas fa-star" />
                    &nbsp;{ repo.stars }
                  </div>
                  <div className="column">
                    <i className="fas fa-code-branch" />
                    &nbsp;{ repo.forks }
                  </div>
                </p>
              </footer>
            </div>
          </a>
        </div>
      );
    });

    return (
      <div>
        <section className="hero is-success" style={heroBackground}>
          <div className="hero-body has-text-centered">
            <div className="container">
              <h1 className="title">
                Open Source @ Ebates
              </h1>
              <h2 className="subtitle is-size-4">
                Ebates is built on top of many open source technologies.
                Here are some of the tools and libraries we have developed to give back to the community.
              </h2>
              {/* <h2 className="subtitle">
                We are hiring, lets build stuff together.&nbsp;&nbsp;
                <a className="has-text-warning is-small" href="https://www.ebates.com/careers">Join us</a>
              </h2> */}
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns is-multiline">
              {repoCards}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
