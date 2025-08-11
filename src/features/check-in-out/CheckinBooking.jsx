import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Checkbox from "../../ui/Checkbox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBookingItem } from "../bookings/useGetBookingItem";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useGetSettings } from "../settings/useGetSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { data: bookingData, isLoading } = useGetBookingItem();
  const [isConfirmed, setIsConfirmed] = useState();
  const [addBreakfast, setAddBreakfast] = useState();
  const { checkin, isCheckingin } = useCheckin();
  const { settings, isLoading: isLoadingSettings } = useGetSettings();

  useEffect(() => {
    setIsConfirmed(bookingData?.isPaid ?? false);
  }, [bookingData]);
  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = bookingData;

  function handleCheckin() {
    if (!isConfirmed) return;
    if (hasBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  return (
    <ContentWrapper>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={bookingData} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            id={"breakfast"}
            onChange={() => {
              setAddBreakfast((prev) => !prev);
              setIsConfirmed(false);
            }}
          >
            {`Want to add Breakfast for ${formatCurrency(
              optionalBreakfastPrice
            )}?`}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={isConfirmed}
          onChange={() => setIsConfirmed((prev) => !prev)}
          disabled={isConfirmed || isCheckingin}
          id={bookingId}
        >{`I confirm that ${guests.fullName} has paid the total amount of ${
          addBreakfast
            ? `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`
            : formatCurrency(totalPrice)
        }`}</Checkbox>
      </Box>
      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          $variation="primary"
          $size={"medium"}
          disabled={!isConfirmed || isCheckingin}
        >
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" $size={"medium"} onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </ContentWrapper>
  );
}

export default CheckinBooking;
