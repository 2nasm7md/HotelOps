import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBooking } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import PAGE_ITEMS from "../../utils/constances";

export default function useGetBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filterValue = searchParams.get("status");

  // Filter
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // Sort
  const sortValue = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortValue.split("-");
  const sortBy = { field, direction };

  //  Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //  Query
  const {
    data: { data: bookingsData, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getAllBooking({ filter, sortBy, page }),
  });

  // Prefetching
  const pageCount = Math.ceil(count / PAGE_ITEMS);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getAllBooking({ filter, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getAllBooking({ filter, sortBy, page: page - 1 }),
    });
  return { bookingsData, isLoading, error, count };
}
