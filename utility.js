

function getCurrentDateTime()
{
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const objDate = new Date();
  const month = objDate.getMonth();
  const day = objDate.getDate();
  const year = objDate.getFullYear();

  const hour = objDate.getHours() < 10 ? '0' + objDate.getHours(): objDate.getHours();
  const minutes = objDate.getMinutes() < 10 ? '0' + objDate.getMinutes() : objDate.getMinutes();

  return `${day} ${months[month]} ${year}  ${hour}:${minutes}`

}

function genId(maxChar = 15)
{
  let alphabets = "abcdefghijklmnopqrstuvwxyz";
  let chars = "!@#$%^&*()"
  let numbers = "0123456789"
  let keys = alphabets + numbers + alphabets.toUpperCase() + chars;
  let newID = ""
  let randomIndex = 0;
  for(let i = 0; i < maxChar; i++)
  {
    randomIndex = Math.floor(Math.random()*keys.length)
    newID += keys[randomIndex]
  }

  return newID;
}


module.exports = {getCurrentDateTime, genId}