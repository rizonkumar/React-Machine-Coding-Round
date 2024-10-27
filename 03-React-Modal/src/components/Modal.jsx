import { useRef } from "react";
import useClickOutside from "../hooks/use-click-outside";

const Modal = ({ isOpen, closeModal }) => {
  const modalRef = useRef();
  useClickOutside(modalRef, closeModal);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div ref={modalRef} className="modal-container">
        <h1>MODAL</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
          recusandae eveniet sapiente tenetur minus rerum quasi voluptatem,
          porro, cumque aliquam illo expedita, dolore tempora facilis. In
          perferendis esse impedit cumque.
        </p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
