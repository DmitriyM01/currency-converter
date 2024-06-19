import React from "react";
import "../Modal/Modal.css";

const Modal = ({ active, setActive, children }) => {
    const modalClass = active ? "modal active" : "modal";
    const modalContentClass = active ? "modal__content active" : "modal_content";

    return (
        <div className={modalClass} onClick={() => setActive(false)}>
            <div className={modalContentClass} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;