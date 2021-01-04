import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../state/modal";

const MODAL_CONTENT = {
    TEST: TestContent,
};

export default function ModalContainer(props) {
    const { modalTypes, modalProps } = useSelector(
        (state) => state.modal
    );
    const dispatch = useDispatch();

    return modalTypes.map((modalType) => {
        const CurrModalContent = MODAL_CONTENT[modalType];
        if(!modalTypes.length===0) return null
        console.log(CurrModalContent);
        return (
            <div className="modal-container">
                <div
                    className="modal-overlay"
                    onClick={()=>dispatch(modalActions.hideModal())}
                >
                </div>
                <div className="modal-content">
                    <CurrModalContent {...modalProps[modalType]} />
                </div>
            </div>
        );
    });
}


function TestContent(props){
    return(<div>Test Modal</div>)
}