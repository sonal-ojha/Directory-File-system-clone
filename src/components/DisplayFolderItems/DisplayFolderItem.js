import React, { Component } from 'react';
import './displayFolderItem.css';
import CreateNew from '../CreateNew/CreateNew';
import FileInfo from '../FileInfoPopup/FileInfoPopup.component';
import PropTypes from 'prop-types';
import { deleteItem } from '../../actions/deleteItem.action';
import { connect } from 'react-redux';

class DisplayFolderItems extends Component {
    state = {
        displayCreateItemPopup : false,
        displayOptionPopup: false,
        displayFileInfoPopup: false,
        fileOptionSelected: '',
        getInfoItem: {},
    }

    handleCreateItem = () => {
        this.setState(prevstate => ({
            displayCreateItemPopup: !prevstate.displayCreateItemPopup
        }));
    }

    handleItemOptionPopup = (e, item) => {
        window.oncontextmenu = (e) => {
            e.preventDefault();
        }
        const { displayOptionPopup } = this.state;
        if(e.buttons === 2) {
            this.setState({
                displayOptionPopup: !displayOptionPopup,
                getInfoItem: item,
            });
        }
    }

    getListedItems = () => {
        const { listItems, path } = this.props;
        const currentPath = path.join('/');
        if (currentPath === 'root'){
            return listItems && listItems.length > 0 && listItems.map((item, idx) => (
                <div key={idx} className="listItem" style={{ display: 'relative'}}>
                    <button className="btn" onMouseDown={(e) => this.handleItemOptionPopup(e, item)}>
                        {item.type === "file" ? <i className="fa fa-file fa-5x" aria-hidden="true"></i> : <i className="fa fa-folder fa-5x" aria-hidden="true"></i>}
                    </button>
                    <div className="fileName">{item.name}</div>
                </div>
            ));
        } else {
            const findParent = currentPath.split('/')[1];
            const itemIndex = listItems && listItems.length > 0 && listItems.findIndex(item => item.name === findParent);
            if (itemIndex >= 0){
                return listItems && listItems.length > 0 && listItems[itemIndex].children.length > 0 && listItems[itemIndex].children.map((item, idx) => (
                    <div key={idx} className="listItem">
                        <button className="btn" onMouseDown={(e) => this.handleItemOptionPopup(e, item)}>
                            {item.type === "file" ? <i className="fa fa-file fa-5x" aria-hidden="true"></i> : <i className="fa fa-folder fa-5x" aria-hidden="true"></i>}
                        </button>
                        <div className="fileName">{item.name}</div>
                    </div>
                ));
            }
        }
    }

    handleDisplayInfo = (type) => {
        const { deleteItem } = this.props;
        const { getInfoItem } = this.state;
        const { displayFileInfoPopup, displayOptionPopup } = this.state;
        this.setState({
            displayOptionPopup: !displayOptionPopup
        });
        if (type === 'info') {
            this.setState({
                displayFileInfoPopup: !displayFileInfoPopup,
            })
        } else {
            deleteItem(getInfoItem);
        }
    }

    handleInfoClose = () => {
        const { displayFileInfoPopup } = this.state;
        this.setState({
            displayFileInfoPopup: !displayFileInfoPopup,
        });
    }

    render() {
        const { displayCreateItemPopup, displayOptionPopup, displayFileInfoPopup, getInfoItem } = this.state;
        const { path } = this.props;
        const displayListedItem = this.getListedItems();
        return (
        <div className="folderItems">
            <button  onClick={this.handleCreateItem} className="createItem btn">
                <i className="fa fa-plus-square-o fa-5x" aria-hidden="true"></i>
            </button>
            {displayCreateItemPopup && 
                <CreateNew handleClose={this.handleCreateItem} path={path} />
            }
            <div className="displayFlex">
                {displayListedItem}
            </div>
            {displayOptionPopup && 
                <div className="optionContainer" style={{ display: 'absolute', top: '100px', left: '90px'}}>
                    <div className="optionItem infoText" onClick={() => this.handleDisplayInfo('info')}>Get Info</div>
                    <div className="optionItem deleteText" onClick={() => this.handleDisplayInfo('delete')}>Delete</div>
                </div>
            }
            {displayFileInfoPopup &&
                <FileInfo closeInfo={this.handleInfoClose} item={getInfoItem}/>
            }
        </div>
        );
    }
}

DisplayFolderItems.propTypes = {
    path: PropTypes.array.isRequired,
    listItems: PropTypes.array.isRequired,
    deleteItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    deleteItem : (data) => {
        dispatch(deleteItem(data));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayFolderItems);