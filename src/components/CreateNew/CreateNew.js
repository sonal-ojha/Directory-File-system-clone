import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createNewItem } from '../../actions/createNewItem.action';

const DATE_REGEX = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
const FILE_SIZE_REGEX = /\d?\d?\d(kb|mb|KB|MB|gb|GB)/g;

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

  createItem = () => {
    const { name, creator, size, date, createSelectedItem } = this.state;
    const { createNewItem, handleClose, path } = this.props;
    const data = {};
    data.name = name.trim();
    data.creator = creator.trim();
    data.size = size.trim();
    data.date = date.trim();
    data.type = createSelectedItem;
    data.children = [];
    data.parent = path.join('/');
    createNewItem(data);
    handleClose();
  }

  handleCreate = () => {
    const { existingItems, path } = this.props;
    const { name, creator, size, date } = this.state;
    if (name === '' || creator === '' || size === '' || date === '') {
      this.setState({
        displayError: true
      });
    }
    else {
      if (name !== '' && existingItems && existingItems.length > 0) {
        let nameExists = false;
        if (path.length === 1) {
          nameExists = existingItems.findIndex(item => item.name === name.trim()) >= 0;
        } else if (path.length === 2) {
          const subDirectoryIdx = existingItems.findIndex(item => item.name === path[1]);
          nameExists = existingItems[subDirectoryIdx].children.findIndex(item => item.name === name.trim()) >= 0;
        }
        this.setState({
          displayError: nameExists,
          errMsg : 'Entered Name Already Exists!',
        });
        if (!nameExists) {
          this.createItem();
        }
      }
      else if (name.trim().length > 30) {
        this.setState({
          displayError: true,
          errMsg : '* Name should consist of Max 30 characters',
        })
      } else if (creator.trim().length > 30) {
        this.setState({
          displayError: true,
          errMsg : '* Creator should consist of Max 30 characters',
        })
      } else if (!FILE_SIZE_REGEX.test(size.trim())) {
        this.setState({
          displayError: true,
          errMsg : '* Size should be in 25kb or 25 gb or 25mb format. Max allowed size is 999',
        })
      } else if (!DATE_REGEX.test(date.trim())) {
        this.setState({
          displayError: true,
          errMsg : '* Date should be in dd/mm/yyyy format',
        })
      } else {
        this.createItem();
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
              <button onClick={this.handleCloseCreateItem} className="btn pointer">
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
            <input value={date} placeholder="Date dd/mm/yyyy" onChange={this.handleInput} name="date" className="createInput" autoComplete="false" /><br />
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
