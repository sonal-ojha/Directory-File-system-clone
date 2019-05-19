import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import DisplayFolderItems from './components/DisplayFolderItems/DisplayFolderItem';
import { connect } from 'react-redux';

class App extends Component {
  state = {
    path: ['root'],
    displaySubItemList: '',
    filterData: [],
    searchText: ""
  }

  handlePath = (item) => {
    const updatedPath = [];
    updatedPath.push('root');
    updatedPath.push(item.name);
    this.setState({
      path : updatedPath
    });
  }

  handleSubPath = (item) => {
    const { path } = this.state;
    const updatedPath = [ ...path ];
    let updateItemName = '';
    if (path.length === 2) {
      if (item.parent.split('/')[1] !== undefined && path[1] === item.parent.split('/')[1]) {
        updateItemName = item.name;
      } else {
        updatedPath.pop();
        updateItemName = item.name;
      }
    } else if (path.length === 3) {
      if (item.parent.split('/')[2] !== undefined && path[2] === item.parent.split('/')[2]) {
        updateItemName = item.name;
      } else {
        updatedPath.pop();
        updateItemName = item.name;
      }
    }
    updatedPath.push(updateItemName)
    this.setState({
      path: updatedPath
    });
  }

  handleLevelUp = () => {
    const { path } = this.state;
    const updatedPath = [ ...path ];
    if (updatedPath.length > 1) {
      updatedPath.pop();
      this.setState({
        path: updatedPath
      });
    }
  }

  toggleDisplaySubItem = (data) => {
    const { displaySubItemList } = this.state;
    const value = displaySubItemList === data ? '' : data;
    this.setState({
      displaySubItemList: value
    })
  }

  displaySubItems = (data) => {
    const items = data && data.length > 0 && data.map((item, idx) => (
      <div key={idx} className="subItemList">
        {item.name}
      </div>
    ));
    return items;
  }

  handleLocalItemSearch = (value) => {
    const { rootNodes } = this.props;
    const { path } = this.state;
    let filterItems = [];
    if (path.length === 1) {
      filterItems = rootNodes.filter(item => item.name === value);
    } else if (path.length === 2) {
      const subIdx = rootNodes.findIndex(item => item.name === path[1]);
      if (subIdx !== undefined) {
        const filterSubItems = rootNodes[subIdx].children.filter(item => item.name === value);
        if (filterSubItems && filterSubItems.length > 0) {
          filterItems = [...rootNodes];
          filterItems[subIdx].children = filterSubItems;
        }
      }
    }
    this.setState({
      searchText: value,
      filterData: filterItems,
    })
  }

  displayideBarItems = (item, idx) => {
    const { displaySubItemList } = this.state;
    return (
      <div key={idx} onClick={() => this.handlePath(item)} className="sideBarItem">
        <div className="displayFlex justifySpaceBetween">
          {item.name}
          {item.children && item.children.length > 0 && (
            <button className="btn pointer" onClick={() => this.toggleDisplaySubItem(item.name)}>
              <i className="fa fa-chevron-down" aria-hidden="true"></i>
            </button>
          )}
        </div>
        <div className="subItemContainer">
          {displaySubItemList === item.name && this.displaySubItems(item.children)}
        </div>
      </div>
    );
  }

  render() {
    const { rootNodes } = this.props;
    const { path, filterData, searchText } = this.state;
    return (
      <div className="App">
        <div className="sidebar-container">
          <div className="sideBarItem">Root</div>
          {rootNodes && rootNodes.length > 0 && rootNodes.map((item, idx) => (
            this.displayideBarItems(item, idx)
          ))}
        </div>
        <div className="folder-container">
          <Header path={path} moveUp={this.handleLevelUp} handleLocalSearch={this.handleLocalItemSearch} />
          <DisplayFolderItems listItems={searchText ? filterData : rootNodes} path={path} handleSubPath={this.handleSubPath} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rootNodes: state.createItemReducer.root.children,
});

export default connect(mapStateToProps)(App);
