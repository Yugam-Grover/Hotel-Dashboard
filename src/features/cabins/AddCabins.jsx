import React, { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

const AddCabins = () => {
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>

    // <>
    //   <Button onClick={() => setIsModalOpen((show) => !show)}>Add Cabin</Button>
    //   {isModalOpen && (
    //     <Modal onCloseModal={() => setIsModalOpen(false)}>
    //       <CreateCabinForm onCloseModal={() => setIsModalOpen(false)} />
    //     </Modal>
    //   )}
    // </>
  );
};

export default AddCabins;
