const d1  = '2021-10-12';
const d2    = '2021-11-12';

const diffInMs   = new Date(d2) - new Date(d1);
const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
const diff = (new Date(d2) - new Date(d1)) / (1000 * 60 * 60 * 24);

console.log(diff); // 31
