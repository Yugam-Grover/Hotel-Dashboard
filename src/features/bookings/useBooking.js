import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

const useBooking = () => {
  const { bookingId } = useParams();
  console.log(bookingId);
  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });
  if (error)
    throw new Error("Booking could not be fetched through React-Query.");

  return { booking, isLoading };
};

export default useBooking;
