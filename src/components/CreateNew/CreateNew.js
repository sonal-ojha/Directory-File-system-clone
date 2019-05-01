import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createNewItem } from '../../actions/createNewItem.action';

class CreateNew extends Component {
  state={
    createSelectedItem: 'file',
    name: '',
    creator: '',
    size: '',
    date: '',
    displayError: false,
    errMsg: '* Please enter all the fields!',
  }

  updateSelectedItem = (value) => {
    this.setState({
      createSelectedItem: value
    })
  }

  handleInput = (e) => {
    const type = e.target.name;
    this.setState({
      [type]: e.target.value,
    });
  }

  handleCloseCreateItem = () => {
    const { handleClose } = this.props;
    handleClose();
  }

  handleCreate = () => {
    const { createNewItem, handleClose, existingItems, path } = this.props;
    const { name, creator, size, date, createSelectedItem } = this.state;
    if (name === '' || creator === '' || size === '' || date === '') {
      this.setState({
        displayError: true
      });
    }
    else {
      if (name !== '' && existingItems && existingItems.length > 0 && existingItems.findIndex(item => item.name === name) >= 0) {
        this.setState({
          displayError: true,
          errMsg : 'Entered Name Already Exists!',
        })
      } else {
        const data = {};
        data.name = name;
        data.creator = creator;
        data.size = size;
        data.date = date;
        data.type = createSelectedItem;
        data.children = [];
        data.parent = path.join('/');
        createNewItem(data);
        handleClose();
      }
    }
  }
  render() {
    const { name, creator, size, date, displayError, createSelectedItem, errMsg } = this.state;
    return (
      <div className="backgroundBlur createNew">
        <div className="createNewContainer">
            <div className="displayFlex justifySpaceBetween textAlignCenter create-header">
              <div>Create New</div>
              <button onClick={this.handleCloseCreateItem} className="btn">
                <i className="fa fa-times fa-2x" aria-hidden="true"></i>
              </button>
            </div>
            <div className="tabContainer displayFlex textAlignCenter m-b-20">
              <div onClick={() => this.updateSelectedItem('file')} className={createSelectedItem === 'file' ? "tabItem file activeItem" : "tabItem file"}>File</div>
              <div onClick={() => this.updateSelectedItem('folder')} className={createSelectedItem === 'folder' ? "tabItem activeItem" : "tabItem"}>Folder</div>
            </div>
            <input value={name} placeholder="Name" onChange={this.handleInput} name="name" className="createInput" autoComplete="false" /><br />
            <input value={creator} placeholder="Creator" onChange={this.handleInput} name="creator" className="createInput" autoComplete="false" /><br />
            <input value={size} placeholder="Size" onChange={this.handleInput} name="size" className="createInput" autoComplete="false" /><br />
            <input value={date} placeholder="Date" onChange={this.handleInput} name="date" className="createInput" autoComplete="false" /><br />
            <button onClick={this.handleCreate} className="createBtn activeItem">Create</button>
            {displayError && <div className="error m-t-20">{errMsg}</div>}
        </div>
      </div>
    );
  }
}

CreateNew.propTypes = {
  handleClose: PropTypes.func.isRequired,
  createNewItem: PropTypes.func.isRequired,
  existingItems: PropTypes.array.isRequired,
  path: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  existingItems: state.createItemReducer.root.children,
});

const mapDispatchToProps = dispatch => ({
  createNewItem : (data) => {
    dispatch(createNewItem(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNew);
