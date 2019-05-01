import React from 'react';
import './header.css';

class Header extends React.PureComponent {
  handleMoveUp = () => {
    const { moveUp } = this.props;
    moveUp();
  }
  render() {
    const { path } = this.props;
    return (
      <div className="header displayFlex justifySpaceBetween">
        <div className="displayFlex justifyLeft left-60">
          <button className="arrow-btn" onClick={this.handleMoveUp}>
            <i className="fa fa-arrow-up" aria-hidden="true"></i>
          </button>
          <div className="pathDisplay">
            {path && path.join(' / ')}
          </div>
        </div>
        <input type="text" placeholder="Search for Anything" className="searchBar" />
      </div>
    );
  }
}

export default Header;
