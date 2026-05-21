import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deleteGuests() {
  const { error } = await supabase
    .from("guests")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase
    .from("cabins")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase
    .from("bookings")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  // Bookings need a guestId and a cabinId. Since Supabase uses UUIDs
  // (not sequential numeric IDs), we can't rely on ordering by ID.
  // Instead, we match cabins by "name" and guests by "nationalID"
  // to reliably resolve their UUIDs from the database.
  const { data: guestsData } = await supabase
    .from("guests")
    .select("id, nationalID");
  const { data: cabinsData } = await supabase.from("cabins").select("id, name");

  const finalBookings = bookings.map((booking) => {
    // Look up the local guest/cabin data using the 1-based index
    const localCabin = cabins[booking.cabinId - 1];
    const localGuest = guests[booking.guestId - 1];

    // Find their actual UUIDs from the DB using unique fields
    const guestId = guestsData.find(
      (g) => g.nationalID === localGuest.nationalID,
    )?.id;
    const cabinId = cabinsData.find((c) => c.name === localCabin.name)?.id;

    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice =
      numNights * (localCabin.regularPrice - localCabin.discount);
    const extraPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extraPrice;

    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = "checked-in";

    return {
      ...booking,
      numNights,
      cabinPrice,
      extraPrice,
      totalPrice,
      guestId,
      cabinId,
      status,
    };
  });

  console.log(finalBookings);

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}>
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
