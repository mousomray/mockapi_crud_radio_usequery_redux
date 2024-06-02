import { configureStore } from "@reduxjs/toolkit";
import adddetailslice from "../Allreducers/allreducers"

export const store = configureStore({
    reducer: {
        Adduser: adddetailslice // Slice For Add User
    },
});