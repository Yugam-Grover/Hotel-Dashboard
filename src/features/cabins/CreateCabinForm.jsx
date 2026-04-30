import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import useCabinOperations from "./useCabinOperations";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  // console.log(cabinToEdit);
  // console.log(cabinToEdit.id);

  const { mutate: createCabin, isPending: isCreating } = useCabinOperations();
  const { mutate: updateCabin, isPending: isUpdating } =
    useCabinOperations("edit");
  const isWorking = isCreating || isUpdating;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const onSubmit = (data) => {
    // console.log(data);
    const isImageString = typeof data.image === "string";
    const image = isImageString ? data.image : data.image[0];
    if (!isEditSession)
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    else
      updateCabin(
        { newCabinData: { ...data, image }, id: cabinToEdit.id },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    // console.log(data.image[0]);
  };
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "this is a required field.",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            min: {
              value: 1,
              message: "wrong input",
            },
            max: {
              value: 10,
              message: "maximum 10 guests allowed",
            },
            required: "this is a required field.",
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "this is a required field.",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount cannot be more than Price",
            required: "this is a required field.",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "this is a required field.",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          disabled={isWorking}
          accept="image/*"
          {...register("image", {
            required: !isEditSession ? "this is a required field." : false,
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Create Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
