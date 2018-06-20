/* eslint-disable react/no-did-mount-set-state */
/* global localStorage */
import React from 'react';
import axios from 'axios';
import '../styles/main.scss';

export default class extends React.Component {
  // initialize state
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
    };
  }

  async componentDidMount() {
    // try to fetech repos from github
    let repos = [];
    try {
      const request = await axios.get('https://api.github.com/users/ebates-inc/repos');
      // extract the required information
      request.data.forEach((repo) => {
        const struct = {
          key: repo.name,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          license: (repo.license) ? repo.license.spdx_id : null,
        };
        repos.push(struct);
      });

      // set the localstorage to the repos in case the request fails next time
      localStorage.setItem('repos', JSON.stringify(repos));
    } catch (err) {
      // something went wrong
      console.log('GitHub API fetch failed, getting repos from local storage');
      console.error(err);
      // attempt to fetch the repos out of the localstorage
      repos = JSON.parse(localStorage.getItem('repos')) || [];
    }

    // update the state to the repos
    this.setState((prevState) => {
      const newState = Object.assign({}, prevState, { repos });
      return newState;
    });
  }

  render() {
    // set the url to ebates background
    const heroBackground = {
      background: 'url(/static/images/hero-bg.jpg) repeat 0 0',
    };

    // iterate over the repos and generate a card for each one
    let repoCards;
    if (this.state.repos) {
      repoCards = this.state.repos.map((repo) => {
        let language;
        let license;
        if (repo.language) {
          language = <span className="subtitle is-6"> <i className="fas fa-code" />&nbsp;{ repo.language }&nbsp;&nbsp;</span>;
        }
        if (repo.license) {
          license = <span className="subtitle is-6"> <i className="fas fa-balance-scale" />&nbsp;{ repo.license }&nbsp;&nbsp;</span>;
        }
        return (
          <div className="column is-one-third" key={repo.key}>
            <a href={repo.url} target="_blank" rel="noopener noreferrer">
              <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="card-content">
                  <p className="title is-size-4">
                    { repo.name }
                  </p>
                  <p className="subtitle is-size-6">
                    { repo.description }
                  </p>
                  { language } { license }
                </div>
                <footer className="card-footer" style={{ marginTop: 'auto' }}>
                  <p className="card-footer-item">
                    <span>
                      <span className="has-text-link">View on GitHub</span>
                    </span>
                  </p>
                  <p className="card-footer-item columns">
                    <span className="column has-text-right">
                      <i className="fas fa-star" />
                      &nbsp;{ repo.stars }
                    </span>
                    <span className="column">
                      <i className="fas fa-code-branch" />
                      &nbsp;{ repo.forks }
                    </span>
                  </p>
                </footer>
              </div>
            </a>
          </div>
        );
      });
    }

    return (
      <div>
        {/* set the background of the hero */}
        <section className="hero is-success" style={heroBackground}>
          <div className="hero-body has-text-centered">
            <div className="container">
              <h1 className="title">
                Open Source @ Ebates
              </h1>
              <h2 className="subtitle is-size-4">
                Ebates is built on top of many open source technologies.
                Here are some of the tools and libraries we have developed
                to give back to the community.
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
              {/* show the repo cards */}
              {repoCards}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
