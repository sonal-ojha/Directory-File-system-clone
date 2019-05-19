import React from 'react';
import './header.css';
import PropTypes from 'prop-types';

class Header extends React.PureComponent {
  handleMoveUp = () => {
    const { moveUp } = this.props;
    moveUp();
  }

  handleSearch = (e) => {
    const { handleLocalSearch } = this.props;
    handleLocalSearch(e.target.value);
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
        <input type="text" placeholder="Search for Anything" className="searchBar" onChange={this.handleSearch}/>
      </div>
    );
  }
}

Header.propTypes = {
  moveUp: PropTypes.func.isRequired,
  handleLocalSearch: PropTypes.func.isRequired,
}

export default Header;
