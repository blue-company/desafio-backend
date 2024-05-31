export function formatDate(datetime: string) {
  const [datePart, timePart] = datetime.split(" - ");

  const [day, month, year] = datePart.split("/");

  const date = new Date(
    `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${timePart}:00`
  );

  date.setHours(date.getHours() + 3);

  return date;
}
