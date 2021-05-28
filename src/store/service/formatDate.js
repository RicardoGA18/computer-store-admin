const formatDate = (date) => {
  const objectDate = new Date(date)
  const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
  const year = objectDate.getFullYear()
  const month = months[objectDate.getMonth()]
  const day = objectDate.getDate()
  const formatDay = day < 10 ? `0${day}` : day
  const hours = objectDate.getHours()
  const minutes = objectDate.getMinutes()
  const formatHours = hours < 10 ? `0${hours}` : hours
  const formatMinutes = minutes < 10 ? `0${minutes}` : minutes
  return `${formatDay} de ${month} de ${year}, a las ${formatHours}:${formatMinutes} hrs.`
}

export default formatDate