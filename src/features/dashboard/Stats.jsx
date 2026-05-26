import {
  Banknote,
  BriefcaseBusiness,
  CalendarCheck,
  ChartNoAxesCombined,
} from "lucide-react";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({ Bookings, Stays, numDays, cabinCount }) {
  const numBookings = Bookings.length;

  const sales = Bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const checkIns = Stays.length;

  const occupancy =
    Stays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        icon={<BriefcaseBusiness />}
        title="BOOKINGS"
        value={numBookings}
        color="blue"
      />
      <Stat
        icon={<Banknote />}
        title="SALES"
        value={formatCurrency(sales)}
        color="green"
      />
      <Stat
        icon={<CalendarCheck />}
        title="CHECK INS"
        value={checkIns}
        color="indigo"
      />
      <Stat
        icon={<ChartNoAxesCombined />}
        title="OCCUPANCY RATE"
        value={`${Math.round(occupancy * 100)}%`}
        color="yellow"
      />
    </>
  );
}
