import CabinRow from "./CabinRow";
import { GetCabins } from "../../services/cabins.js";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table.jsx";
import useCabins from "./useCabins.js";
import styled from "styled-components";
import Menus from "../../ui/Menus.jsx";

const CabinTable = () => {
  const { cabins, isLoading } = useCabins();
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabins</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table.Body
            data={cabins}
            render={(cabinData) => (
              <CabinRow cabinData={cabinData} key={cabinData.id} />
            )}
          />
        )}
      </Table>
    </Menus>
  );
};

export default CabinTable;
