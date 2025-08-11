import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinsCount,
}) {
  // 1) Bookings Number
  const bookingsNum = bookings.length;
  // 2) Sales Accum
  const sales = bookings.reduce((acc, curr) => {
    return acc + curr.totalPrice;
  }, 0);
  // 3) Checked-In Number
  const checkedIn = confirmedStays.length;
  // 4) Occupancy Rate
  const occupation =
    confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * cabinsCount);
  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title={"Bookings"}
        value={bookingsNum}
        color={"blue"}
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title={"Sales"}
        value={formatCurrency(sales)}
        color={"green"}
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title={"Check ins"}
        value={checkedIn}
        color={"indigo"}
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title={"Occupancy rate"}
        value={Math.round(occupation * 100) + "%"}
        color={"yellow"}
      />
    </>
  );
}
