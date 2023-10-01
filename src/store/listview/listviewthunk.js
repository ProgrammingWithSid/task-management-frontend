import { SetListViewAct, SetListErrorAct, SetAddViewAct,SetAddErrorAct, SetDeleteViewAct,SetDeleteErrorAct, SetUpdateViewAct, SetUpdateErrorAct} from './listviewslice'
import { deleteData, getData,postData,putData } from '../../api/apiactions'

export function listviewpage(apiUrl, params) {
    return async (dispatch) => {

        const response = await getData(apiUrl, params);
        if (response.status === 200) {
            dispatch(SetListViewAct(response.data));
            //console.log(response);
        } else {
            dispatch(SetListErrorAct(response));
            // console.log(response)
        }

    }
}

export function addviewpage(apiUrl,params) {
    return async (dispatch) => {
        const response = await postData(apiUrl, params);
        if(response.status == 200) {
            dispatch(SetAddViewAct(response.data))
        }
        else {
            dispatch(SetAddErrorAct(response));
        }
    }
};

export function deleteviewpage(apiUrl,params) {
    return async (dispatch) => {
        const response = await deleteData(apiUrl,params);
        if(response.status == 200) {
            dispatch(SetDeleteViewAct(response))
        }
        else {
            dispatch(SetDeleteErrorAct(response))
        }
    }
}

export function updateviewpage(apiUrl,params) {
    return async (dispatch) => {
        const response = await putData(apiUrl,params);
        if(response.status == 200) {
            dispatch(SetUpdateViewAct(response))
        }
        else {
            dispatch(SetUpdateErrorAct(response))
        }

    }
}


