import { createSlice } from '@reduxjs/toolkit';
import { counterEvent } from 'react-native/Libraries/Performance/Systrace';

const counterSlice = createSlice({
    name: 'counter',
    initialState:{
        value:0
    },
    reducers:{
        increament: (state) => {
            state.value +=1;
        },
        decrement: (state) =>{
            state.value -=1;
        },
        increamentByAmount:(state,action)=>{
            // state.value +=action.amount;
            state.value += action.payload;
        },
    },
});

export const {increament,decrement,increamentByAmount} = counterSlice.actions;

export default counterSlice.reducer