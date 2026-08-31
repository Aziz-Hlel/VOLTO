type IGetDisplayedDate = {
  date: Date | string;
  showTime?: boolean;
};

const getdisplayedDate = ({ date, showTime = false }: IGetDisplayedDate) => {
  const _date = new Date(date);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long", // October
    day: "numeric", // 1
    year: "numeric", // 2025
    ...(showTime && {
      hour: "numeric",
      minute: "numeric",
      hour12: true, // 12-hour clock with AM/PM
    }),
  }).format(_date);

  return formattedDate;
};

export default getdisplayedDate;
