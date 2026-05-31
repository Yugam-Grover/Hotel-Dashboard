import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "../ui/ErrorFallback";
function Settings() {
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>

      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <UpdateSettingsForm />
      </ErrorBoundary>
    </Row>
  );
}

export default Settings;
