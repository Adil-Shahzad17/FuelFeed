const time = new Date();

console.log(time.toDateString());
console.log(
  time.toLocaleString("en-UK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
);
