import React, { useState, useEffect } from "react";
import { formatDistance } from "date-fns";
import { Comments, Replies } from "../types";

type DaysProps = {
  reply: Comments | Replies;
};

const DaysFromWriting = ({ reply }: DaysProps) => {
  const calculateTime = () => {
    const now = new Date();
    const createdAt = new Date(Number(reply.createdAt));

    return formatDistance(createdAt, now, { addSuffix: true });
  };

  const [time, setTime] = useState(calculateTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <>{time}</>;
};

export default DaysFromWriting;
