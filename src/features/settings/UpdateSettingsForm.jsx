import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import useSettings from "./useSettings";
import useUpdateSetting from "./useUpdateSetting";
function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { updateSetting, isUpdating } = useUpdateSetting();

  function handleUpdate(e, field) {
    const { value } = e.target;
    updateSetting({ [field]: value });
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking:">
        <Input
          type="number"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          id="min-nights"
        />
      </FormRow>
      <FormRow label="Maximum nights/booking:">
        <Input
          type="number"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          id="max-nights"
        />
      </FormRow>
      <FormRow label="Maximum guests/booking:">
        <Input
          type="number"
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          id="max-guests"
        />
      </FormRow>
      <FormRow label="Breakfast price($):">
        <Input
          type="number"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
