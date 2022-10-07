import { combineReducers } from "@reduxjs/toolkit";

import vocasReducer from "./vocas/vocasSlice";
import userReducer from "./user/userSlice";

export default combineReducers({ vocasReducer, userReducer });
