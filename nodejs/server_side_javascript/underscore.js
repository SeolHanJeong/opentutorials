//underscore의 이름을 '_'로 하는 것이 관습이다,
const _ = require('underscore');
var arrr = [3,6,9,1,12];
console.log(arrr[0]);
console.log(_.first(arrr));
console.log(arrr[arrr.length-1]);
console.log(_.last(arrr));
console.log(_.initial(arrr,3));
