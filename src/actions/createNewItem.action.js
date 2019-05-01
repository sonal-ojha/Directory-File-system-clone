import {
    CREATE_ITEM_REQUEST,
    CREATE_ITEM_SUCCESS,
    CREATE_ITEM_ERROR,
} from '../constants/actionType.constant';

export const createItemRequest = () => {
    return {
        type: CREATE_ITEM_REQUEST
    }
}

export const createItemSuccess = (payload) => {
    return {
        type: CREATE_ITEM_SUCCESS,
        payload
    }
}

export const createItemFailure = (error) => {
    return {
        type: CREATE_ITEM_ERROR,
        error
    }
}

export const createNewItem = data => {
    return (dispatch) => {
        dispatch(createItemRequest());
        if (data) {
            dispatch(createItemSuccess(data));
        } else {
            dispatch(createItemFailure('Error in Creating New Item!!'));
        }
    }
}