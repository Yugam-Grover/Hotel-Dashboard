import DashboardLayout from "../features/dashboard/DashboardLayout";
import DashBoardFilter from "../features/dashboard/DashboardFilter";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "../ui/ErrorFallback";
function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashBoardFilter />
      </Row>
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <DashboardLayout />
      </ErrorBoundary>
    </>
  );
}

export default Dashboard;
