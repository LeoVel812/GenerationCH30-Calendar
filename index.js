/* Calculate type of day given a date
day calculation using Zeller’s Rule:
https://beginnersbook.com/2013/04/calculating-day-given-date/
only valid for Gregorian Calendar

F=k+ [(13*m-1)/5] +D+ [D/4] +[C/4]-2*C where

k is  the day of the month.
m is the month number.
D is the last two digits of the year.
C is the first two digits of the year.
range 
*/
const dateForm = document.forms["dateForm"]; //getting reference from the form
const cardElement = document.getElementById("cardDate");
// hide card
const hideCard = () => {
  cardElement.style.visibility = "hidden";
};
hideCard();
// getting values when is submitted from the form
dateForm.addEventListener("submit", (event) => {
  event.preventDefault(); //prevents default
  //getting values from form
  const aDate = {
    day: parseInt(dateForm.elements["day"].value),
    month: parseInt(dateForm.elements["month"].value),
    year: dateForm.elements["year"].value,
  };
  //   const day = dateForm.elements["day"].value;
  //   const month = dateForm.elements["month"].value;
  //   const year = dateForm.elements["year"].value;
  //   console.log(`${aDate.year}/${aDate.month}/${aDate.day}`);
  estimateDate(aDate);
});

const estimateDate = ({ day, month, year }) => {
  // console.log(`${year}/${month}/${day}`);
  //   console.log(`${typeof year}/${typeof month}/${typeof day}`);

  /*  
  k is  the day of the month.
  m is the month number.
  D is the last two digits of the year.
  C is the first two digits of the year. 
  */

  //taking the last two digits of the year:
  const D = parseInt(year.substring(2, 4));
  //taking the first two digits of the year:
  const C = parseInt(year.substring(0, 2));
  // console.log(`D:${D} C:${C}`);

  const shiftedMonthAndD = shiftMonth([month, D, C]);
  //getting F value with k,m,D,C:
  const F = getFValue([day, shiftedMonthAndD]);
  //getting day and its type to be printed out in an HTML element:
  const dayOfWeek = getDayOfWeek(F);
  // console.log(`${dayOfWeek}`);
  //putting day of week in an HTML element
  putDay(dayOfWeek);
};

//shifts the month from 3 to 12 subtracts 2, the first and second months adds 10
//and also it modifies D and C,
// D if it's 0 (2000,1900,1800...) to shift to 99
// and also C is subtracted by 1
const shiftMonth = ([month, D, C]) => {
  if (month >= 3 && month <= 12) {
    month -= 2;
  } else {
    month += 10;
    if (D === 0) {
      //if it's year 2000 1900, etc
      D = 99;
      C--;
    } else {
      D--;
    }
  }
  return [month, D, C];
};
const getFValue = ([day, shiftedMonthAndD]) => {
  // console.log(
  //   `[k,m,D,C]:${day},${shiftedMonthAndD[0]},${shiftedMonthAndD[1]},${shiftedMonthAndD[2]}`
  // );
  //deconstructing the array to use the literals acording to Zeller's Rule
  const [k, [m, D, C]] = [day, shiftedMonthAndD];
  // console.log(`[k,m,D,C]:${k},${m},${D},${C}`);
  //getting F value with this formula
  F =
    k +
    Math.floor((13 * m - 1) / 5) +
    D +
    Math.floor(D / 4) +
    Math.floor(C / 4) -
    2 * C;
  const mod = F % 7;
  // getting F value from range 0-7
  mod < 0 ? (F = mod + 7) : (F = mod);
  return F;
};

// with F we can know the day of the week, using an array of days and a switch to the description
const getDayOfWeek = (F) => {
  let typeofDay = "";
  //array of days according to the Zeller's Rule
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  //related to the array of days
  switch (F) {
    case 0:
    case 6:
      typeofDay = "a weekend day";
      break;
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      typeofDay = "a weekday";
      break;
  }
  return [days[F], typeofDay];
};

//creating a new HTML element to put the day
const putDay = (dayOfWeek) => {
  const dayDescription = document.querySelector("#type-day");
  dayDescription.innerHTML = `<p>It's <b>${dayOfWeek[0]}</b>, <b>${dayOfWeek[1]}</b>.</p>`;
  cardElement.style.visibility = "visible"; //show card
};
