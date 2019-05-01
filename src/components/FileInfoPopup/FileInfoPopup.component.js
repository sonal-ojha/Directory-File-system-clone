import React from 'react';
import PropTypes from 'prop-types';
import './fileInfo.css';

class FileInfo extends React.PureComponent {
  handleCloseInfo = () => {
    const { closeInfo } = this.props;
    closeInfo();
  }
  render() {
    const { item } = this.props;
    return (
      <div className="backgroundBlur">
        <div className="info-modal">
            <div className="displayFlex textAlignCenter fileHeader">
                <div style={{ width: '280px'}} className="f-18">File Info</div>
                <button onClick={this.handleCloseInfo} className="btn pointer">
                    <i className="fa fa-times fa-2x" aria-hidden="true"></i>
                </button>
            </div>
            <div className="displayFlex textAlignCenter iconFileType">
                {item.type === "file" ? <i className="fa fa-file fa-5x" aria-hidden="true"></i> : <i className="fa fa-folder fa-5x" aria-hidden="true"></i>}
            </div>
            <div className="m-10">
                <div className="infoListItem">Name : {item.name}</div>
                <div className="infoListItem">Size : {item.size}</div>
                <div className="infoListItem">Creator Name : {item.creator}</div>
                <div className="infoListItem">Created At : {item.date}</div>
            </div>
        </div>
      </div>
    );
  }
}

FileInfo.propType = ({
    item: PropTypes.object.isRequired,
})

export default FileInfo;
