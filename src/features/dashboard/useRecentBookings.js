import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export default function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const calcDate = subDays(new Date(), numDays).toISOString();
  const { data: bookings, isLoading } = useQuery({
    queryFn: () => getBookingsAfterDate(calcDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { bookings, isLoading, numDays };
}
