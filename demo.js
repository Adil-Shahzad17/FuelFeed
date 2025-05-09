// const one = new Date("2025-05-09T12:37:31.089+00:00").getTime();
// const two = new Date("2025-05-09T12:37:31.089+00:00").toLocaleString();
// console.log(one);
// console.log(two);

let lastSessionTime = 1746799200000;
let currentSessionTime = Date.now();
let fourHours = 1000 * 60 * 60 * 4; // 4 hours
let diff = Math.abs(currentSessionTime - lastSessionTime);

if (diff > fourHours) {
  console.log("Welcome Sarr"); // More than 4 hours have passed
} else {
  console.log("Stay Logged Out"); // Less than 4 hours have passed
}
