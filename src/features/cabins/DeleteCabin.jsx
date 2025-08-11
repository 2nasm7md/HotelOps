import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import { FaTrashAlt } from "react-icons/fa";

export default function DeleteCabin({ isDeleting, onClick, cabinName }) {
  return (
    <>
      <Modal>
        <Modal.Open opens="confirm-form">
          <Button $variation="secondary" $size="medium">
            <FaTrashAlt />
          </Button>
        </Modal.Open>
        <Modal.Window name="confirm-form">
          <ConfirmDelete
            disabled={isDeleting}
            resourceName={cabinName}
            onConfirm={onClick}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}
