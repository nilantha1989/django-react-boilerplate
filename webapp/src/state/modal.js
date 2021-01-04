import { createSlice } from '@reduxjs/toolkit';

const initState = {
    modalTypes: [],
    modalProps:{}
}

const modalSlice = createSlice({
    name: "modal",
    initialState: initState,
    reducers: {
        showModal(state, { action, payload }){
            state.modalTypes.push(payload.modalType)
            state.modalProps[payload.modalType] = payload.modalProps
        },
        hideModal(state, { action, payload }){
            const removedModalType = state.modalTypes.pop()
        },
    }
});



export const modalActions = modalSlice.actions;
export const modalReducer = modalSlice.reducer;