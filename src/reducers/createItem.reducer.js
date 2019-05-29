import {
    CREATE_ITEM_REQUEST,
    CREATE_ITEM_SUCCESS,
    CREATE_ITEM_ERROR,
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_REQUEST,
    DELETE_ITEM_ERROR,
} from '../constants/actionType.constant';
import { INITIAL_STATE } from '../constants/initialState.constant';

function deleteFileItem(state, action) {
    const { payload } = action;
    const { root } = state;
    const { children } = root;
    const data = [...children];
    if(payload.parent === 'root'){
        const findDeleteId = data.findIndex(item => item.name === payload.name);
        data.splice(findDeleteId, 1);
    } else {
        const findParent = payload.parent.split('/')[1];
        const deleteIndex = data && data.findIndex(item => item.name === findParent);
        if(deleteIndex >= 0) {
            const fileDeleteIdx = data[deleteIndex].children.findIndex(item => item.name === payload.name);
            data[deleteIndex].children.splice(fileDeleteIdx, 1);
        }
    }
    return {
        ...state,
        root: {
            children: data
        },
        status: {
            ...state.status,
            loading: false
        }
    }
}

function updateNewItemDetails(state, action) {
    const { payload } = action;
    const { root } = state;
    const { children } = root;
    const data = [...children];
    if(payload.parent === 'root'){
        data.push(payload);
    } else {
        const findParent = payload.parent.split('/')[1];
        const findIndex = data && data.findIndex(item => item.name === findParent);
        if(findIndex >= 0) {
            data[findIndex].children.push(payload);
        }
    }
    return {
        ...state,
        root: {
            children: data
        },
        status: {
            ...state.status,
            loading: false
        }
    }
}

export const createItemReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_ITEM_REQUEST:
            return {
                ...state,
                status : { ...state.status, loading : true }
            }
        case CREATE_ITEM_SUCCESS: return updateNewItemDetails(state, action);
        case CREATE_ITEM_ERROR:
            return {
                ...state,
                status : { ...state.status, loading : false, error: 'Some error occured!!' }
            }
        case DELETE_ITEM_REQUEST:
            return {
                ...state,
                status : { ...state.status, loading : true }
            }
        case DELETE_ITEM_SUCCESS: return deleteFileItem(state, action);
        case DELETE_ITEM_ERROR:
            return {
                ...state,
                status : { ...state.status, loading : false, error: 'Some error occured!!' }
            }
        default:
            return state;
    }
}