/* Calculate kind of day given a date
day calculation using Zeller’s Rule:
https://beginnersbook.com/2013/04/calculating-day-given-date/
only valid for Gregorian Calendar

F=k+ [(13*m-1)/5] +D+ [D/4] +[C/4]-2*C where

k is  the day of the month.
m is the month number.
D is the last two digits of the year.
C is the first two digits of the year.

*/
const dateForm = document.forms["dateForm"]; //getting reference from the form
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
  console.log(`${year}/${month}/${day}`);
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
  console.log(`D:${D} C:${C}`);

  const shiftedMonthAndD = shiftMonth([month, D, C]);
  //   console.log(
  //     `[m]: ${shiftedMonthAndD[0]} [D] ${shiftedMonthAndD[1]} [C] ${shiftedMonthAndD[2]}`
  //   );
  //making F function with k,m,D,C:
  const F = getFValue([day, shiftedMonthAndD]);
};

//shifts the month from 3 to 12 subtracts 2, the first and second months adds 10
//and also it modifies D
const shiftMonth = ([month, D, C]) => {
  if (month >= 3 && month <= 12) {
    month -= 2;
  } else {
    month += 10;
    if (D === 0) {
      //if it's year 2000 1900 etc
      D = 99;
      C--;
    } else {
      D--;
    }
  }
  return [month, D, C];
};
const getFValue = ([day, shiftedMonthAndD]) => {
  console.log(
    `[k,m,D,C]:${day},${shiftedMonthAndD[0]},${shiftedMonthAndD[1]},${shiftedMonthAndD[2]}`
  );
  const [k, [m, D, C]] = [day, shiftedMonthAndD];
  console.log(`[k,m,D,C]:${k},${m},${D},${C}`);
  //   F=k+ [(13*m-1)/5] +D+ [D/4] +[C/4]-2*C
  F =
    k +
    Math.floor((13 * m - 1) / 5) +
    D +
    Math.floor(D / 4) +
    Math.floor(C / 4) -
    2 * C;
    
};
