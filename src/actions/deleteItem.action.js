import {
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_REQUEST,
    DELETE_ITEM_ERROR,
} from '../constants/actionType.constant';

export const deleteItemRequest = () => {
    return {
        type: DELETE_ITEM_REQUEST
    }
}

export const deleteItemSuccess = (payload) => {
    return {
        type: DELETE_ITEM_SUCCESS,
        payload
    }
}

export const deleteItemFailure = (error) => {
    return {
        type: DELETE_ITEM_ERROR,
        error
    }
}

export const deleteItem = data => {
    return (dispatch) => {
        dispatch(deleteItemRequest());
        if (data) {
            dispatch(deleteItemSuccess(data));
        } else {
            dispatch(deleteItemFailure('Error in Deleting Item!!'));
        }
    }
}