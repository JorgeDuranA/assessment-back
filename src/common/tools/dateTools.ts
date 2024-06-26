export const dateAddOneDay = (date: Date) => {
  if (date) {
    const rawDate: any = new Date(date);
    const rawDateAddedDay = rawDate.setDate(rawDate.getDate() + 1);
    return new Date(rawDateAddedDay).toISOString();
  } else {
    return new Date().toISOString();
  }
};

export const dateSubtractOneDay = (date: Date) => {
  if (date) {
    const rawDate: any = new Date(date);
    const rawDateAddedDay = rawDate.setDate(rawDate.getDate() - 1);
    return new Date(rawDateAddedDay).toISOString();
  } else {
    return new Date().toISOString();
  }
};

export const dateAddOneMonth = (date: Date) => {
  if (date) {
    const rawDate: any = new Date(date);
    const rawDateAddedMonth = rawDate.setMonth(rawDate.getMonth() + 1);
    return new Date(dateSubtractOneDay(rawDateAddedMonth)).toISOString();
  } else {
    return new Date().toISOString();
  }
};

export const dateAddOneYear = (date: Date) => {
  if (date) {
    const rawDate: any = new Date(date);
    const rawDateAddedYear = rawDate.setFullYear(rawDate.getFullYear() + 1);
    return new Date(dateSubtractOneDay(rawDateAddedYear)).toISOString();
  } else {
    return new Date().toISOString();
  }
};

export const formatAMPM = (date: Date) => {
  if (!date) return '';
  let hours = date.getHours();
  let minutes: number | string = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};
