class MyLinkedNode {
  data;
  next;
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}

export class MyLinkedList {
  constructor() {
    this.first = null;
    this.last = null;
  }

  addLast(data) {
    const new_node = new MyLinkedNode(data, null);
    if (this.first == null) {
      this.last = new_node;
      this.first = new_node
    } else {
      this.last.next = new_node;
      this.last = new_node;
    }
  }

  addFirst(data) {
    const new_node = new MyLinkedNode(data, null);
    if (this.first == null) {
      this.last = new_node;
      this.first = new_node;
    } else {
      let temp = this.first;
      this.first = new_node;
      new_node.next = temp;
    }
  }

  printList() {
    if (this.first != null) {
      console.log(this.first.data);
      let next = this.first.next;
      while (next != null) {
        console.log(next.data);
        next = next.next;
      }
    }
  }

  removeFirst(){
    this.first = this.first.next
  }

  removeLast(){
    let previous = this.getPrevious(this.last)
   // console.log("previous is", previous)
    previous.next = null;
    this.last = previous;
    
  }

  getPrevious(node){
    let current = this.first
  //  console.log("first", this.first)
  //  console.log("node is", node)
    while(current != null){
     //   console.log("if statement",current.next === node )
        if(current.next === node){
            return current
        }
        current = current.next
     //   console.log("current is", this.first)
    }
    return null
  }
  size(){
    let current = this.first
    let size = 0;
    while(current != null){
        size ++;
        current = current.next
    }
    return size
  }

  reverse(){
    let current = this.first;
    this.last = current;
    let temp = current;
    let next = current.next

    //  1    2    3
    //  tc   n   
    
    current.next = null;
    while(next !=null){
        console.log(next)
        current = next

    //  1    2    3
    //  t    nc
    
        next = current.next
    //  1    2    3
    //  t    c    n
        current.next = temp
        temp = current
    //  1    2    3
    //      tc    n
    }
    this.first = current
  }


  kthNode(k){

    //10  20   30  40  50   60 
    // bp      fp
    
    let backPointer = this.first
    let frontPointer = this.first

    for (let distance = 0; distance < k; distance++) {
        frontPointer = frontPointer.next
        if(frontPointer==null){
            return null
        }
    }
    while(frontPointer.next !=null){
        backPointer = backPointer.next
        frontPointer = frontPointer.next
    }
    return backPointer.data
}

  indexOf(data) {
    if (this.first != null) {
      let index = 0;

      if (this.first.data == data) {
        return index;
      }
      let next = this.first.next;
      while (next != null) {
        index++;
        if (next.data == data) {
          return index;
        }
        next = next.next;
      }
      return -1;
    }
  }


  toArray(){
    const my_array = new Array();
    let current = this.first
    let size = 0;
    while(current != null){
        my_array.push(current.data)
        current = current.next
    }
    return my_array
  }
  

}

// cats = new MyLinkedList();
// cats.addLast("1meow");
// cats.addFirst("2kitty");
// cats.addFirst("3purr");
// cats.addFirst("4hiss");

// //console.log(cats.indexOf("meow"));
// cats.printList();
// console.log(cats.kthNode(0))