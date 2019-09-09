const parseDate = (dateStr) => {
  if (dateStr) {
    let date = new Date(dateStr);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    return `${year}-${formatDate(month)}-${formatDate(day)} ${formatDate(hour)}:${formatDate(minute)}:${formatDate(second)}`;
  } else {
    return '';
  }
}

function formatDate(num) {
  return num > 10 ? num : ('0' + num)
}
export default parseDate;
