import React from 'react';
import FileInfo from './FileInfoPopup.component';
import renderer from 'react-test-renderer';

it('File Info Popup', () => {
    const getInfoItem = {
        name: 'f1',
        size: '12kb',
        creator: 'self',
        date: '12/12/2019',
    };
    const handleInfoClose = jest.fn();
    const tree = renderer.create(<FileInfo closeInfo={handleInfoClose} item={getInfoItem}/>);
    expect(tree).toMatchSnapshot();
})