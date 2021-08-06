export const capitalizeFirstChar = function (s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const _id = (element) => {
  return document.getElementById(element);
};

export const getTodayDate = () => {
  const dateToday = new Date();
  let day = dateToday.getDate();
  let month = dateToday.getMonth() + 1;
  const year = dateToday.getFullYear();
  if (day < 10) {
    day = `0${day.toString()}`;
  };
  if (month < 10) {
    month = `0${month.toString()}`;
  };
  const today = `${year}-${month}-${day}`;
  return today;
}


export const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const months = ['January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'Octorber', 'November', 'December'];