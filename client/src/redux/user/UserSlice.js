import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const UserSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=> {
            state.loading = true;
        
        },
        signInSuccess:(state,action)=>{
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        signInFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {signInStart,signInSuccess,signInFailure} = UserSlice.actions;

export default UserSlice.reducer;