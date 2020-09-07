function nsConvert(num, from, to){
  return parseInt(num, from).toString(to).toUpperCase();
}

console.assert(nsConvert("23", 10, 2) === "10111", "Check 1");
console.assert(nsConvert("31", 10, 16) === "1F", "Check 2");
console.assert(nsConvert("1F", 16, 2) === "11111", "Check 3");
console.assert(nsConvert("20", 3, 8) === "6", "Check 4");
console.assert(nsConvert("1GH", 20, 3) === "1000022", "Check 5");
