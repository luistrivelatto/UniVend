function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

// data: Date
// Retorna dia formatado
function getFormattedDate(data) {
  let date = new Date(data);

  return (date.getFullYear()) + "-" 
    + ("0" + (date.getMonth() + 1)).substr(-2) + "-" + ("0" + date.getDate()).substr(-2);
}

function getHumanReadableDuration(milisseconds) {
  const oneMinute = 1000 * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  
  if(milisseconds < oneMinute) {
    return '1 minuto';
  } else if(milisseconds < oneHour) {
    let tempo = Math.round(milisseconds / oneMinute);
    return tempo + ' minuto' + (tempo > 1 ? 's' : '');
  } else if(milisseconds < oneDay) {
    let tempo = Math.round(milisseconds / oneHour);
    return tempo + ' hora' + (tempo > 1 ? 's' : '');
  } else {
    let tempo = Math.round(milisseconds / oneDay);
    return tempo + ' dia' + (tempo > 1 ? 's' : '');
  }
}

export { stableSort, getFormattedDate, getHumanReadableDuration };
