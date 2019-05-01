import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import DisplayFolderItems from './components/DisplayFolderItems/DisplayFolderItem';
import { connect } from 'react-redux';

class App extends Component {
  state = {
    path: ['root'],
  }

  handlePath = (pathName) => {
    const updatedPath = [];
    updatedPath.push('root');
    updatedPath.push(pathName);
    this.setState({
      path : updatedPath
    });
  }

  handleSubPath = () => {

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

  render() {
    const { rootNodes } = this.props;
    const { path } = this.state;
    return (
      <div className="App">
        <div className="sidebar-container">
          <div className="sideBarItem">Root</div>
          {rootNodes && rootNodes.length > 0 && rootNodes.map((item, idx) => (
            <div key={idx} onClick={() => this.handlePath(item.name)} className="sideBarItem">
                {item.name}
            </div>
          ))}
        </div>
        <div className="folder-container">
          <Header path={path} moveUp={this.handleLevelUp} />
          <DisplayFolderItems listItems={rootNodes} path={path} handleSubPath={this.handleSubPath} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rootNodes: state.createItemReducer.root.children,
});

export default connect(mapStateToProps)(App);
