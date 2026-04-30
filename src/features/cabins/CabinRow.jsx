import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useCabinOperations from "./useCabinOperations";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { CopyPlus, PencilLine, Trash } from "lucide-react";
import styled from "styled-components";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
const CabinRow = ({ cabinData }) => {
  const { isPending: isDeleting, mutate: deleteCabin } =
    useCabinOperations("delete");
  const { isPending: isDuplicating, mutate: duplicateCabin } =
    useCabinOperations();
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabinData;

  function handleDuplicate() {
    duplicateCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }
  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <Cabin>Fits upto {maxCapacity} guests.</Cabin>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>
          {discount ? formatCurrency(discount) : <span>&mdash;</span>}
        </Discount>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button onClick={handleDuplicate} icon={<CopyPlus />}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<PencilLine />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete">
                <Menus.Button icon={<Trash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabinData} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName={"cabin"}
                onConfirm={() => deleteCabin(cabinId)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </Table.Row>
    </>
  );
};

export default CabinRow;
