/* eslint-disable react/no-did-mount-set-state */
/* global localStorage */
import React from 'react';
import axios from 'axios';
import GranimCanvas from 'react-granim-canvas';
import '../styles/main.scss';

export default class extends React.Component {
  // initialize state
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      repos: [],
    };
  }

  async componentDidMount() {
    const repoToDataStruct = (repo) => {
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
      return struct;
    };

    // try to fetech repos from github
    let repos = [];
    try {
      const request = await axios.get('https://api.github.com/users/rakutenrewards/repos');
      // extract the required information
      request.data.filter(repo => !repo.fork).forEach((repo) => {
        const struct = repoToDataStruct(repo);
        repos.push(struct);
      });

      const requestGql = await axios.get('https://api.github.com/repos/ekampf/gql');
      repos.push(repoToDataStruct(requestGql.data));

      // set the localstorage to the repos in case the request fails next time
      localStorage.setItem('repos', JSON.stringify(repos));
    } catch (err) {
      // something went wrong
      // console.log('GitHub API fetch failed, getting repos from local storage');
      // console.error(err);
      // attempt to fetch the repos out of the localstorage
      repos = JSON.parse(localStorage.getItem('repos')) || [];
    }

    // update the state to the repos
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        repos,
        loading: false,
      };
      return newState;
    });
  }

  render() {
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

    const loading = (
      <div className="has-text-centered" style={{ width: '100%' }}>
        <button className="button is-loading repos-spinner is-large" style={{ border: '0px' }}>Loading</button>
      </div>
    );

    const states = {
      'default-state': {
        gradients: [
          ['#FE9C7B', '#A30593'],
          ['#311293', '#20A1E6'],
        ],
        transitionSpeed: 4000,
      },
    };

    return (
      <div>
        {/* set the background of the hero */}
        <section className="hero">
          <GranimCanvas states={states} />
          <div className="hero-body has-text-centered">
            <div className="container">
              <h1 className="title">
                Open Source @ Rakuten Rewards
              </h1>
              <h2 className="subtitle is-size-4">
                Rakuten Rewards is built on top of many open source technologies.
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
              { (this.state.loading) ? loading : repoCards}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
