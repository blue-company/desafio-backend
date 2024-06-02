export function formatDate(datetime: string) {
  const [datePart, timePart] = datetime.split(" - ");

  const [day, month, year] = datePart.split("/");

  const date = new Date(
    `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${timePart}:00`
  );

  date.setHours(date.getHours() + 3);

  return date;
}

export function formatDateForString(dataISO: Date) {
  let data = new Date(dataISO);

  let dia = data.getUTCDate();
  let mes = data.getUTCMonth() + 1;
  let ano = data.getUTCFullYear();

  let horas = data.getUTCHours();
  let minutos: string | number = data.getUTCMinutes();

  horas -= 3;
  if (horas < 0) {
    horas += 24;
    dia -= 1;
  }

  minutos = minutos < 10 ? "0" + minutos : minutos;

  return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
}
