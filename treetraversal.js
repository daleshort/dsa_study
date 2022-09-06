const factorial = (myNumber) => {
  if (myNumber - 1 == 0) {
    return 1;
  } else {
    return myNumber * factorial(myNumber - 1);
  }
};

console.log(factorial(4))