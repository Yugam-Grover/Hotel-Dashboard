import { CopyPlus, PencilLine, Trash } from "lucide-react";
import styled from "styled-components";
import { useState } from "react";

import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import useCabinOperations from "./useCabinOperations";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
  const [showEditForm, setShowEditForm] = useState(false);
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
      <TableRow>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <Cabin>Fits upto {maxCapacity} guests.</Cabin>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>
          {discount ? formatCurrency(discount) : <span>&mdash;</span>}
        </Discount>
        <div>
          <button disabled={isDuplicating} onClick={handleDuplicate}>
            <CopyPlus />
          </button>
          <button onClick={() => setShowEditForm((show) => !show)}>
            <PencilLine />
          </button>
          <button onClick={() => deleteCabin(cabinId)} disabled={isDeleting}>
            <Trash />
          </button>
        </div>
      </TableRow>
      {showEditForm && <CreateCabinForm cabinToEdit={cabinData} />}
    </>
  );
};

export default CabinRow;
