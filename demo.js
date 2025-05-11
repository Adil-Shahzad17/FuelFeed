const one = new Date(1746877022888).toLocaleString();
const two = new Date(Date.now()).toLocaleString();
// console.log(one);

const ten = 1000 * 60 * 10;
console.log(new Date(ten).getMinutes());
