import CabinRow from "../../features/cabins/CabinRow";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { useGetCabins } from "./useGetCabins";
import { useSearchParams } from "react-router-dom";

export default function CabinTable() {
  const { cabindata, isLoading, error } = useGetCabins();
  const [searchParams] = useSearchParams();
  // Filter Operation
  const filterValue = searchParams.get("discount") || "all";
  let filterdCabins;
  if (filterValue === "all") filterdCabins = cabindata;
  if (filterValue === "no-discount")
    filterdCabins = cabindata?.filter((cabin) => cabin.discount == 0);
  if (filterValue === "with-discount")
    filterdCabins = cabindata?.filter((cabin) => cabin.discount > 0);
  // Sort Operation
  const sortValue = searchParams.get("sortBy") || "";
  const [field, direction] = sortValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  let sortedCabins = filterdCabins;
  sortedCabins = filterdCabins?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  // Handle Status
  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading cabins.</div>;

  return (
    <Menus>
      <Table role="table" columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
        <Table.Header role="row">
          <div></div>
          <div>Cabins</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
