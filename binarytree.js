const myList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class MyNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class tree {
  constructor() {
    this.root = null;
  }

  find(value) {
    let currentNode = this.root;
    if (currentNode == null) {
      return false;
    }
    while (true) {
      if (currentNode.value == value) {
        return true;
      } else {
        if (value < currentNode.value) {
          currentNode = currentNode.left;
        } else {
          currentNode = currentNode.right;
        }
        if (currentNode == null) {
          return false;
        }
      }
    }
  }

  isLeaf(node) {
    if (node.left == null && node.right == null) {
      return true;
    } else {
      return false;
    }
  }

  add(value) {
    console.log(value);
    const newNode = new MyNode(value);

    if (this.root == null) {
      this.root = newNode;
      return;
    }

    let currentNode = this.root;
    while (true) {
      if (value < currentNode.value) {
        if (currentNode.left == null) {
          currentNode.left = newNode;
          return;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (currentNode.right == null) {
          currentNode.right = newNode;
          return;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }
}

const cats = new tree();
cats.add(7);
cats.add(4);
cats.add(9);
cats.add(1);
cats.add(6);
cats.add(8);
cats.add(10);

const cats2 = new tree();
cats2.add(7);
cats2.add(4);
cats2.add(9);
cats2.add(1);
cats2.add(6);
cats2.add(8);
cats2.add(11);

console.log("break");

const traversePreOrder = (root) => {
  //root
  //left
  //right
  console.log(root.value);
  if (root.left !== null) {
    traversePreOrder(root.left);
  }
  if (root.right !== null) {
    traversePreOrder(root.right);
  }
};

const traverseInOrder = (root) => {
  //left
  //root
  //right
  if (root.left !== null) {
    console.log("entering left");
    traversePreOrder(root.left);
  }
  console.log(root.value);

  if (root.right !== null) {
    traversePreOrder(root.right);
  }
};

const traversePostOrder = (root) => {
  //left
  //right
  //root
  if (root.left !== null) {
    traversePreOrder(root.left);
  }
  if (root.right !== null) {
    traversePreOrder(root.right);
  }
  console.log(root.value);
};

const getHeight = (root) => {
  if (root == null) {
    return 0;
  }
  return 1 + max(getHeight(root.left), getHeight(root.right));
};

const max = (number1, number2) => {
  if (number1 > number2) {
    return number1;
  } else {
    return number2;
  }
};

const minOfTree = (node) => {
  if (node.left == null && node.right == null) {
    return node.value;
  }
  const left = minOfTree(node.left);
  const right = minOfTree(node.right);
  return Math.min(left, right, node.value);
};

const checkTreeEquality = (node1, node2) => {
  if(node1 ==null && node2 == null){
    return true
  } else if (node1 != null && node2 !=null){
    console.log(node1.value, node2.value)
    return node1.value == node2.value &&
     checkTreeEquality(node1.left, node2.left) 
     && checkTreeEquality(node1.right, node2.right);
  } else{
    return false
  }
  
};

console.log("traverse pre order");
traversePreOrder(cats.root);
console.log("traverse in order");
traverseInOrder(cats.root);
console.log("traverse post order");
traversePostOrder(cats.root);

console.log("height", getHeight(cats.root));
console.log("min", minOfTree(cats.root));

console.log("tree equality", checkTreeEquality(cats.root, cats2.root))

const checkBinaryTreeStructure = (node,lowerBound, upperBound) =>{
  if(node==null){
    return true
  }
  if( node.value > upperBound || node.value < lowerBound){
    return false
  }else{
    return checkBinaryTreeStructure(node.left,lowerBound,node.value-1) && checkBinaryTreeStructure(node.right,node.value+1, upperBound)
  }

}




const getNodesAtDist = (node,distance,list) => {
  if(distance == 0){
    list.push(node.value)
  }else{
    getNodesAtDist(node.left, distance-1,list)
    getNodesAtDist(node.right, distance-1,list)
  }
}

console.log(checkBinaryTreeStructure(cats.root))

const traverseDepth = (root) =>{
  const height = getHeight(root)
  let nodeList = Array()
  for(let i =0; i<height; i++){
    nodeList = [];
    getNodesAtDist(root,i, nodeList)
    console.log(`depth ${i} :  ${nodeList}`)
  }
  
}

traverseDepth(cats.root)
//getNodesAtDist(cats.root,2,nodeList)
//console.log(nodeList)
//console.log(getHeight(cats.root))
