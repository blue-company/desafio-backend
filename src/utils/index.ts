export const toDateUtc = (dateToConvert: Date) => {
  const date = new Date(dateToConvert);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
};

export const formatCPF = (cpf: string): string => {
  const pt1 = cpf.substring(0, 3);
  const pt2 = cpf.substring(3, 6);
  const pt3 = cpf.substring(6, 9);
  const pt4 = cpf.substring(9, 11);

  const cpfFormat = `${pt1}.${pt2}.${pt3}-${pt4}`;
  return cpfFormat;
};

export const toConvertHours = (dateToConvert: Date) => {
  const dateTime = new Date(dateToConvert);
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  const hours = dateTime.toLocaleTimeString('pt-BR', options);

  return hours;
};
