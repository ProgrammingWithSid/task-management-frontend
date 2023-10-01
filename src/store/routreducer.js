import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth/authslice";
import globalData from "./globaldata/globalslicer";
// import listview from "./listview/listviewslice";
import listviewReducer from './listview/listviewslice';


const rootReducer = combineReducers({
    auth,
    globalData,
    listview: listviewReducer,
});

export default rootReducer;