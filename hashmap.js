const object = {
  name: "fluffy",
  color: "black",
  list: function showList(){
    console.log("this is:",this);
    console.log(this.color)
    for (const key in this) {
      console.log("key is ", key);
      console.log("value is ", this[key]);
    }
  },
};

for (const key in object) {
  console.log("key is ", key);
  console.log("value is ", object[key]);
}

object.food = "meowmix";

for (const key in object) {
  console.log("key is ", key);
  console.log("value is ", object[key]);
}

delete object.food;

for (const key in object) {
  console.log("key is ", key);
  console.log("value is ", object[key]);
}
console.log("using function");
object.list();
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
myMap = new Map();
myMap.set('a', 1)
myMap.set('b',2)
console.log(myMap.get('a'))
myMap.set('a',56)
console.log(myMap.get('a'))
for(const key of myMap.keys()){
    console.log("key ", key)
}
for(const values of myMap.values()){
    console.log("values", values)
}
for( const[key, val] of myMap.entries()){
    console.log(`${key} , ${val}`)
}

myString = "a green apple"

function checkStringFirstUnique(str){
    myStringMap = new Map();
    for(char of str){
       // console.log("char is ", char)

        let existingVal = myStringMap.get(char)
       // console.log("inital existing val is", existingVal)
        if(existingVal==undefined){
            existingVal = 0
        }
        existingVal++;

        myStringMap.set(char,existingVal);        
     }

    for(char of str){
        if(myStringMap.get(char)==1){
            return char
        }
    }
    return "no repeating char"
}

function checkStringForRepeat(string){
    mySet = new Set()
    for(char of string){
        if(mySet.has(char)){
            return true
        } else{
            mySet.add(char)
        }
    }
    return false
}

function checkStringForRepeatMap(string){
    mySet = new Set();
    checkFlag = false
    string.split('').map((char)=>{


            if(mySet.has(char)){
                checkFlag = true
            } else{
                mySet.add(char)
            }
    })
    return checkFlag

}

console.log(checkStringFirstUnique(myString))
console.log('using map function')
console.log(checkStringForRepeatMap(myString))
console.log(checkStringForRepeat('abcdefghijklmnop'))
