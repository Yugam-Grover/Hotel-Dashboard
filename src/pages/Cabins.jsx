import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabins from "../features/cabins/AddCabins";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "../ui/ErrorFallback";
function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <ErrorBoundary FallbackComponent={ErrorFallBack}>
          <CabinTable />
        </ErrorBoundary>

        <ErrorBoundary FallbackComponent={ErrorFallBack}>
          <AddCabins />
        </ErrorBoundary>
      </Row>
    </>
  );
}

export default Cabins;
