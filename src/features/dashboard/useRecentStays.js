import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export default function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const calcDate = subDays(new Date(), numDays).toISOString();
  const { data: stays, isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(calcDate),
    queryKey: ["stays", `last-${numDays}`],
  });
  const confirmedStays = stays?.filter(
    (st) => st.status === "checked-in" || st.status === "checked-out"
  );
  return { stays, isLoading, confirmedStays, numDays };
}
