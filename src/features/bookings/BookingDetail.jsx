import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBookingItem } from "./useGetBookingItem";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import { useDeleteBooking } from "./useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;
const ContentWrapper = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column;
`;
function BookingDetail() {
  const { data: bookingData, isLoading } = useGetBookingItem();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { checkout, isCheckingout } = useCheckout();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  if (isLoading) return <Spinner />;
  if (!bookingData) return <Empty resource={"Booking"} />;
  const { id, status } = bookingData;

  return (
    <ContentWrapper>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={bookingData} />
      <ButtonGroup>
        <Button $variation="secondary" onClick={moveBack} $size={"medium"}>
          Back
        </Button>
        {status === "unconfirmed" && (
          <Button
            icon={<HiArrowDownOnSquare />}
            onClick={() => navigate(`/checkin/${id}`)}
            $variation={"primary"}
            $size={"medium"}
          >
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            $variation={"primary"}
            $size={"medium"}
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(id)}
            disabled={isCheckingout}
          >
            Check out
          </Button>
        )}
        <Modal>
          <Modal.Open opens={"delete"}>
            <Button $variation={"secondary"} $size={"medium"}>
              Delete Cabin
            </Button>
          </Modal.Open>
          <Modal.Window name={"delete"}>
            <ConfirmDelete
              resourceName={"booking"}
              onConfirm={() => {
                deleteBooking(id, { onSuccess: () => navigate("/bookings") });
              }}
              disabled={isDeletingBooking}
            />
          </Modal.Window>
        </Modal>
      </ButtonGroup>
    </ContentWrapper>
  );
}

export default BookingDetail;
