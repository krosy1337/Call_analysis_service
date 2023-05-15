import React, {useEffect} from "react"

const Modal = ({isOpen, onClose, children}) => {
    const overlayClasses = [
        "fixed",
        "inset-0",
        "z-50",
        "bg-gray-900",
        "bg-opacity-50",
        isOpen ? "" : "hidden",
    ].join(" ")
    const modalClasses = [
        "fixed",
        "z-50",
        "top-1/2",
        "left-1/2",
        "transform",
        "-translate-x-1/2",
        "-translate-y-1/2",
        "bg-white",
        "p-6",
        "rounded-md",
        isOpen ? "" : "hidden",
    ].join(" ")

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isOpen]);

    return (
        <>
            <div className={overlayClasses} onClick={onClose}></div>
            <div className={modalClasses}>
                {children}
            </div>
        </>
    )
}

export default Modal
