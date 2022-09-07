//left = parent *2 + 1
//right = parent*2 + 2

//parent = (index-1)/2

//         22-0
//     17-1      10-2
// 4-3    5-4

class MyHeap {
  constructor() {
    this.items = Array(10);
    this.size = 0;
  }

  insert(value) {
    if (this.isFull()) {
      throw "heap full";
    }
    this.items[this.size] = value;
    this.size += 1;
    this.bubbleUp();
  }

  isFull() {
    return this.size == this.items.length;
  }

  remove() {
    if(this.size == 0){
        throw "heap empty"
    }
    const removedValue = this.items[0]
    this.items[0] = this.items[this.size - 1];
    this.size--;
    var index = 0;
    while (index<=this.size && !this.isValidParent(index)) {
      let largerChildIndex = this.getLargerChildIndex(index);
      this.swapItems(index, largerChildIndex);
      index = largerChildIndex;
    }
    console.log("items:", this.items)
    return removedValue
  }

  getLargerChildIndex(index) {
    if(!this.hasLeftChild(index)){
        return index
    }
    if (!this.hasRightChild()){
        return this.getChildLeft(index)
    }

    if (this.leftChildValue(index) > this.rightChildValue(index)) {
      return this.getChildLeft(index);
    } else {
      return this.getChildRight(index);
    }
  }

  hasLeftChild(index){
    return this.getChildLeft(index) <= this.size //why is this equal?
  }
  hasRightChild(index){
    return this.getChildRight(index) <= this.size
  }

  isValidParent(index) {
    if(!this.hasLeftChild(index)){
        return true;
    }
    if(!this.hasRightChild(index)){
        return this.items[index] >= this.leftChildValue(index)
    }
    
    return (
      this.items[index] >= this.leftChildValue(index) &&
      this.items[index] >= this.rightChildValue(index)
    );
  }

  leftChildValue(index) {
    return this.items[this.getChildLeft(index)];
  }

  rightChildValue(index) {
    return this.items[this.getChildRight(index)];
  }

  getChildLeft(index) {
    return index * 2 + 1;
  }

  getChildRight(index) {
    return index * 2 + 2;
  }

  bubbleUp() {
    let index = this.size - 1;
    while (
      index > 0 &&
      this.items[index] > this.items[this.parentIndex(index)]
    ) {
      this.swapItems(index, this.parentIndex(index));
      index = this.parentIndex(index);
    }
  }

  parentIndex(index) {
 //   console.log("child index", index);
 //   console.log("parent index", Math.floor((index - 1) / 2));
    return Math.floor((index - 1) / 2);
  }

  swapItems(first, second) {
    const temp = this.items[first];
    this.items[first] = this.items[second];
    this.items[second] = temp;
  }

  //   getParentValue(index) {
  //     const parentIndex = (index - 1) / 2;
  //     if (this.indexIsValid(parentIndex)) {
  //       return this.items[parentIndex];
  //     } else {
  //       return null;
  //     }
  //   }
  getLeftValue(index) {
    leftIndex = index * 2 + 1;
    // rightIndex = index*2 +2
    if (this.indexIsValid(leftIndex)) {
      return this.items[leftIndex];
    } else return null;
  }

  getRightValue(index) {
    rightIndex = index * 2 + 2;
    if (this.indexIsValid(rightIndex)) {
      return this.items[rightIndex];
    } else {
      return null;
    }
  }

  indexIsValid(index) {
    if (index >= this.list.length) {
      return false;
    } else if (index < 0) {
      return false;
    } else {
      return true;
    }
  }
}

const cats = new MyHeap();
cats.insert(10);
cats.insert(5);
cats.insert(17);
cats.insert(4);
cats.insert(22);
console.log(cats.remove());
console.log("done");

const sortList = (list)=>{
    const heap = new MyHeap();
    const sortedArray = Array(list.length)
    for (const val of list) {
        heap.insert(val)
    }
    for(let i = 0; i< list.length; i++){
        sortedArray[i] = heap.remove()
    }
    return sortedArray

}

console.log(sortList([5,3,10,1,4,2]))