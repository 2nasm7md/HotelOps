import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
function Cabins() {
  return (
    <Row type={"vertical"}>
      <Row type={"horizontal"}>
        <Heading as={"h1"}>All Cabins</Heading>
        <CabinTableOperations />
      </Row>
      <CabinTable />
      <div style={{ marginLeft: "auto" }}>
        <AddCabin />
      </div>
    </Row>
  );
}

export default Cabins;
