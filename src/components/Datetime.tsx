import { LOCALE } from "@config";

interface DatetimesProps {
  pubDatetime: string | Date;
  modDatetime: string | Date | undefined | null;
}

interface Props extends DatetimesProps {
  size?: "sm" | "lg";
  className?: string;
}

export default function Datetime({
  pubDatetime,
  modDatetime,
  size = "sm",
  className = "",
}: Props) {
  return (
    <div
      className={`flex items-center space-x-1 opacity-80 ${className}`.trim()}
    >
      {modDatetime && modDatetime > pubDatetime ? (
        <span className={`italic ${size === "sm" ? "text-xs" : "text-sm"}`}>
          Updated:
        </span>
      ) : (
        <span className="sr-only">Published:</span>
      )}
      <span className={`italic ${size === "sm" ? "text-xs" : "text-sm"}`}>
        <FormattedDatetime
          pubDatetime={pubDatetime}
          modDatetime={modDatetime}
        />
      </span>
    </div>
  );
}

const FormattedDatetime = ({ pubDatetime, modDatetime }: DatetimesProps) => {
  const myDatetime = new Date(
    modDatetime && modDatetime > pubDatetime ? modDatetime : pubDatetime,
  );

  const weekday = myDatetime.toLocaleDateString(LOCALE.langTag, {
    weekday: "short",
  });

  const day = myDatetime.toLocaleDateString(LOCALE.langTag, {
    day: "numeric",
  });

  const month = myDatetime.toLocaleDateString(LOCALE.langTag, {
    month: "short",
  });

  const year = myDatetime.toLocaleDateString(LOCALE.langTag, {
    year: "numeric",
  });

  const formattedDate = `${weekday}, ${day} ${month}, ${year}`;

  // const time = myDatetime.toLocaleTimeString(LOCALE.langTag, {
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   timeZoneName: "short",
  // });

  return (
    <>
      <time dateTime={myDatetime.toISOString()}>{formattedDate}</time>
      {/* <span aria-hidden="true"> | </span>
      <span className="sr-only">&nbsp;at&nbsp;</span>
      <span className="text-nowrap">{time}</span> */}
    </>
  );
};
