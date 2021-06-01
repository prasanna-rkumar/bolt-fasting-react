import { cloneElement, useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const [show, setShow] = useState(isOpen);

  const close = () => {
    if (typeof onClose === 'function') onClose();
    setShow(false)
  }

  useEffect(() => {
    setShow(isOpen)
  }, [isOpen])

  return (
    show && (
      <div onClick={close} className="fixed w-screen h-screen left-0 top-0 bg-black bg-opacity-70 flex justify-center items-center">
        {
          cloneElement(children, {
            onClick: (e) => e.stopPropagation()
          })
        }
      </div>
    )
  );
};

export default Modal;
