import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { toast } from "react-toastify";

const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success(`Deleted successfully`);
      queryClient.invalidateQueries("bookings");
    },
    onError: () => toast.error("There was an error while deleting"),
  });
  return { deleteBooking, isDeletingBooking };
};

export default useDeleteBooking;
