const one = new Date(1746877022888).toLocaleString();
const two = new Date(Date.now()).toLocaleString();
console.log(one);
console.log(two - one);

// const loginTime = new Date(1746876636286).getTime();
// console.log(loginTime);

// let lastSessionTime = 1746799200000;
// let currentSessionTime = Date.now();
// let fourHours = 1000 * 60 * 60 * 4; // 4 hours
// let diff = Math.abs(currentSessionTime - lastSessionTime);

// if (diff > fourHours) {
//   console.log("Welcome Sarr"); // More than 4 hours have passed
// } else {
//   console.log("Stay Logged Out"); // Less than 4 hours have passed
// }
