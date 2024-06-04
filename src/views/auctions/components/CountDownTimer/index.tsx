import { HStack, Text } from "@chakra-ui/react";
import { useCountdown } from "./useCountdown";
import { useEffect } from "react";
import { useAppSelector } from "@/reduxs/hooks";
import React from "react";
import { AuctionContract } from "@/contracts";

interface CountdownTimerProps {
  targetDate: number;
  onCountdownFinish: () => void;
}

const ShowCounter = ({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  return (
    <HStack px="0px" spacing="2px">
      <Text fontSize="15px" px="0px">{days}</Text>    
      <Text fontSize="15px">:</Text> 
      <Text fontSize="15px">{hours}</Text>     
      <Text fontSize="15px">:</Text> 
      <Text fontSize="15px">{minutes}</Text>     
      <Text fontSize="15px">:</Text> 
      <Text fontSize="15px">{seconds.toString().padStart(2, '0')}</Text>           
      <Text fontSize="15px">left</Text>
    </HStack>
  );
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, onCountdownFinish }) => {
 
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  useEffect(() => {
    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
      console.log("AHIHI")
      onCountdownFinish()
    }
  }, [days, hours, minutes, seconds]);

  return (
    <ShowCounter
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
    />
  );
};

export default CountdownTimer;