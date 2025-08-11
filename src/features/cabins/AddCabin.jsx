import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Row from "../../ui/Row";
import CabinTable from "./CabinTable";
import CreateCabinForm from "./CreateCabinForm";

export default function AddCabin() {
  return (
    <>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button $variation={"primary"} $size={"medium"}>
            Add Cabin
          </Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </>
  );
}
