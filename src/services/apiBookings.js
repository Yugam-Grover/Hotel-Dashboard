import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(name, email)",
      { count: "exact" },
    );
  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  if (error) {
    console.error(error);
    throw new Error("Bookings data could not be loaded❌");
  }
  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

export async function getBookingsAfterDate(date) {
  const EndDate = getToday({ end: true }).replace("T", " ").split(".")[0];
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, startDate, totalPrice, extraPrice")
    .gte("startDate", date)
    .lte("startDate", EndDate);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getStaysAfterDate(date) {
  const EndDate = getToday({ end: true }).replace("T", " ").split(".")[0];
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(name)")
    .gte("startDate", date)
    .lte("startDate", EndDate);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getStaysTodayActivity() {
  const dayStart = getToday().replace("T", " ").split(".")[0];
  const dayEnd = getToday({ end: true }).replace("T", " ").split(".")[0];

  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(name, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.gte.${dayStart},startDate.lte.${dayEnd}),and(status.eq.checked-in,endDate.gte.${dayStart},endDate.lte.${dayEnd})`,
    )
    .order("created_at");
  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
