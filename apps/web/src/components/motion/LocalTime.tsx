import { useEffect, useState } from "react";

// Live local-time clock (DESIGN_SYSTEM Part VI). Defaults to Rohit's timezone
// (Asia/Kolkata). Ticks once a minute — cheap, and the footer only shows HH:MM.
export interface LocalTimeProps {
  timeZone?: string;
  className?: string;
}

function format(timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  }).format(new Date());
}

export function LocalTime({ timeZone = "Asia/Kolkata", className }: LocalTimeProps) {
  const [time, setTime] = useState(() => format(timeZone));

  useEffect(() => {
    setTime(format(timeZone));
    const id = window.setInterval(() => setTime(format(timeZone)), 30_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return (
    <time className={className} dateTime={time}>
      {time} IST
    </time>
  );
}

export default LocalTime;
