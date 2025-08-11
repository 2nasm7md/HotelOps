import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import { MdEdit } from "react-icons/md";

export default function EditCabin({ cabinToEdit }) {
  return (
    <>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button $variation={"secondary"} $size={"medium"}>
            <MdEdit />
          </Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm cabinToEdit={cabinToEdit} />
        </Modal.Window>
      </Modal>
    </>
  );
}
