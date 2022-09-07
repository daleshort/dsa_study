const my_array = [5, 3, 8, 4, 1, 2];
//   0  1  2  3  4  5
// [ 5  3  8  4  1  2]
//   p  l  r
//      p     l  r

//left = parent *2 + 1
//right = parent*2 + 2

//parent = Math.floor((index-1)/2)

const heapify = (items) => {
  const getLeftChildIndex = (index) => {
    return (index * 2) + 1;
  };

  const hasLeftChild = (index, items) => {
    if (getLeftChildIndex(index) < items.length) {
      return true;
    } else {
      return false;
    }
  };

  const hasRightChild = (index, items) => {
    if (getRightChildIndex(index) < items.length) {
      return true;
    } else {
      return false;
    }
  };

  const getRightChildIndex = (index) => {
    return (index * 2) + 2;
  };

  const swap = (items, index1, index2) => {
    const temp = items[index1];
    items[index1] = items[index2];
    items[index2] = temp;
    return items;
  };

  const isItemLessThanChild = (items, index) => {
    console.log(index)
    console.log("value parent", items[index])
    console.log("value left", items[getLeftChildIndex(index)])
    console.log("left index", getLeftChildIndex(index))

    console.log("value right", items[getRightChildIndex(index)])
    console.log("right index", getRightChildIndex(index))
    
    if (
      items[index] < items[getLeftChildIndex(index)] ||
      items[index] < items[getRightChildIndex(index)]
    ) {
        console.log("index", index)
        console.log("true")
      return true;
    } else {
        console.log("false")
      return false;
    }
  };

  const swapWithLargerChild = (items, index) => {
    let newIndex = null;
    let newItems = null;
    if (hasLeftChild(index, items) && hasRightChild(index, items)) {
      if (items[getLeftChildIndex(index)] > items[getRightChildIndex(index)]) {
        //left child is larger
        newIndex = getLeftChildIndex(index);
        newItems = swap(items, index, getLeftChildIndex(index));
      } else {
        newIndex = getRightChildIndex(index);
        newItems = swap(items, index, getRightChildIndex(index));
      }
    } else if (hasLeftChild(index, items)) {
      newIndex = getLeftChildIndex(index);
      newItems = swap(items, index, getLeftChildIndex(index));
    }
    return [newItems, newIndex];
  };

  for (let i = 0; i < items.length; i++) {
    let workingIndex = i;
    while (
      workingIndex < items.length &&
      isItemLessThanChild(items, workingIndex)
    ) {
      [items, workingIndex] = swapWithLargerChild(items, workingIndex);
    }
  }

  return items;
};

const kthLargest = (list, k) =>{
    let sorted = heapify(list)
    for(let i =0; i<k-1; i++){
        sorted.shift()
        sorted = heapify(list)
        
    }
    return sorted[0]
}

console.log(heapify(my_array));
console.log(kthLargest(my_array,2))
