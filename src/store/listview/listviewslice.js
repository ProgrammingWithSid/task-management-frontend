import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ListViewResp: undefined,
    ListViewErrorResp: undefined,
    AddViewResp: undefined,
    AddViewErrorResp: undefined,
    deleteViewResp: undefined,
    deletedViewErrorResp: undefined,
    updateViewResp: undefined,
    updateViewErrorResp: undefined,
}

export const listviewslice = createSlice({
    name: "listview",
    initialState,
    reducers: {
        SetListViewAct: (state, action) => {
            state.ListViewResp = action.payload;
            //console.log(state.ListViewResp)
        },
        SetListErrorAct: (state, action) => {
            state.ListViewErrorResp = action.payload;
        },

        SetAddViewAct: (state,action) => {
            state.AddViewResp = action.payload;
        },
        SetAddErrorAct: (state,action) => {
            state.AddViewErrorResp = action.payload;
        },
        SetDeleteViewAct: (state,action) => {
            state.deleteViewResp = action.payload;
        },
        SetDeleteErrorAct: (state,action) => {
            state.deletedViewErrorResp = action.payload;
        },
        SetUpdateViewAct: (state,action) => {
            state.updateViewResp = action.payload;
        },
        SetUpdateErrorAct: (state,action) => {
            state.updateViewErrorResp = action.payload;
        }
    }
    
})

export default listviewslice.reducer;
export const { SetListViewAct, SetListErrorAct,SetAddViewAct, SetAddErrorAct, SetDeleteErrorAct,
                SetDeleteViewAct,SetUpdateViewAct,SetUpdateErrorAct} = listviewslice.actions;