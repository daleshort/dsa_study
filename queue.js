class MyQueueFromArray {
  constructor() {
    this.queue = new Array(5);
    this.front = null;
    this.rear = null;
    this.isFull = false;
    this.count = 0;
  }

  // 10 20 30 40 50
  // FR            R
  //rear stores where the next open current rear entry is
  add(value) {
    if (this.rear == null) {
      this.rear = 0;
      this.front = 0;
    }
    if (this.count == this.queue.length) {
      throw "error queue full";
    }
    this.queue[this.rear] = value;
    this.rear++;
    this.count++;
    if (this.rear >= this.queue.length) {
      this.rear = 0;
    }
  }

  remove() {
    if (this.count == 0) {
      return null;
    }
    this.count--;
    let val = this.queue[this.front];
    this.front++;
    if (this.front >= this.queue.length) {
      this.front = 0;
    }
    return val;
  }

  isEmpty() {
    if (this.front == null) {
      return false;
    } else if (this.count == 0) {
      return true;
    } else {
      return false;
    }
  }
  peek() {
    //  console.log(this.getOneBackFromRear())
    return this.queue[this.getOneBackFromRear()];
  }

  getOneBackFromRear() {
    let backOne = this.rear - 1;
    if (backOne < 0) {
      backOne = this.queue.length - 1;
    }
    return backOne;
  }
}

const reverseQueue = (queue) => {
  stack = Array();
  while (!queue.isEmpty()) {
    //queue = 10 , 20 ,30

    // stack = 10 20 30
    let val = stack.push(queue.remove());
  }
  console.log("stack", stack);
  while (stack.length > 0) {
    queue.add(stack.pop());
  }
  return queue;
};

class MyQueueFromStack {
  constructor(){
    this.addStack = new Array();
    this.removeStack = new Array();
  }

  add(value){
    if(Array.length == 5){
      throw "error queue full"
    }
    this.addStack.push(value)
  }
  remove(){
    if(this.removeStack.length==0){
      if(this.addStack.length ==0){
        throw "error no data to return"
      } else{
        //10 20 30  add stack
        // 30 20 10
        while(this.addStack.length>0){
          this.removeStack.push(this.addStack.pop())
        }
        return this.removeStack.pop()
      }
    } else{
      return this.removeStack.pop()
    }
  }

}

cats = new MyQueueFromStack();
cats.add(10);
cats.add(20);
cats.add(30);
console.log(cats.addStack)
console.log(cats.remove())
console.log(cats.remove())
console.log(cats.remove())
console.log(cats.remove())

