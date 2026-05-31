import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table.jsx";
import useCabins from "./useCabins.js";
import Menus from "../../ui/Menus.jsx";
import { useSearchParams } from "react-router-dom";

const CabinTable = () => {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  const filterValue = searchParams.get("filter") || "all";
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  const sortBy = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.slice().sort((a, b) => {
    if (typeof a[field] === "string") {
      return a[field].localeCompare(b[field]) * modifier;
    }
    return (a[field] - b[field]) * modifier;
  });
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
            data={sortedCabins}
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
