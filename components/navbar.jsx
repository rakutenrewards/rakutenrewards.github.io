/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.toggleNavigation = this.toggleNavigation.bind(this);
  }

  toggleNavigation() {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  }

  render() {
    return (
      <div>
        <nav className="navbar is-white has-shadow">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                <img src="/static/images/ebates-rakuten.svg" alt="Ebates Open Source" width="112" height="28" />
              </a>
              <div
                className={[
                  'navbar-burger',
                  'burger',
                  (this.state.show ? 'is-active' : ''),
                ].join(' ')}
                data-target="navigation"
                onClick={this.toggleNavigation}
                onKeyDown={this.toggleNavigation}
                role="navigation"
              >
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className={['navbar-menu', (this.state.show ? 'is-active' : '')].join(' ')} id="navigation">
              <div className="navbar-end">
                <a className="navbar-item" href="/">
                  Home
                </a>
                <a className="navbar-item" href="https://github.com/ebates-inc">
                  GitHub
                </a>
                <a className="navbar-item" href="https://www.ebates.com/">
                  Ebates.com
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
