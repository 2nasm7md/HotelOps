import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import Row from "../../ui/Row";
import { useDeleteCabin } from "./useDeleteCabin";
import { IoDuplicate } from "react-icons/io5";
import { useCreateCabin } from "./useCreateCabin";
import EditCabin from "./EditCabin";
import DeleteCabin from "./DeleteCabin";
import Table from "../../ui/Table";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const { deleteCabine, isDeleting } = useDeleteCabin();
  const { createCabin, isCreating } = useCreateCabin();

  const {
    id: cabinId,
    name,
    image,
    maxCapacity,
    regularPrice,
    discount,
    description,
  } = cabin;
  function handleDuplicate() {
    createCabin({
      name: `copy of ${name}`,
      image,
      maxCapacity,
      regularPrice,
      discount,
      description,
    });
  }

  return (
    <>
      <Table.Row role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>{`Fits up to ${maxCapacity} Guests`}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>
          {discount ? formatCurrency(discount) : <span>-</span>}
        </Discount>
        <Row type={"horizontal"}>
          <Button
            $variation="secondary"
            $size="medium"
            onClick={() => handleDuplicate()}
            disabled={isCreating}
          >
            <IoDuplicate />
          </Button>
          <DeleteCabin
            isDeleting={isDeleting}
            onClick={() => deleteCabine(cabinId)}
            cabinName={name}
          />
          <EditCabin cabinToEdit={cabin} />
        </Row>
      </Table.Row>
    </>
  );
}
