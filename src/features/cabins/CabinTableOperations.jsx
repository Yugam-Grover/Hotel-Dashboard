import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField="filter"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
      <SortBy options={cabinSortOptions} />
    </TableOperations>
  );
};

export default CabinTableOperations;
const cabinSortOptions = [
  { value: "name-asc", label: "Sort by name(A-Z)" },
  { value: "name-desc", label: "Sort by name(Z-A)" },
  { value: "regularPrice-asc", label: "Sort by price(low to high)" },
  { value: "regularPrice-desc", label: "Sort by price(high to low)" },
  { value: "maxCapacity-asc", label: "Sort by Capacity(low to high" },
  { value: "maxCapacity-desc", label: "Sort by Capacity(high to low" },
];
