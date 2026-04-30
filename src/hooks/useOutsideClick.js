import React, { useEffect, useRef } from "react";

const useOutsideClick = (closeModal, isListenCapturing = true) => {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) closeModal();
      }
      document.addEventListener("click", handleClick, isListenCapturing);
      return () =>
        document.removeEventListener("click", handleClick, isListenCapturing);
    },
    [closeModal, isListenCapturing],
  );

  return ref;
};

export default useOutsideClick;
