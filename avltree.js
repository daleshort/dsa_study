class MyNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 0;
  }
}

class AvlTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    this.root = this.recursiveAdd(this.root, value);
  }

  //   7
  // 4   10
  //  6

  recursiveAdd(node, value) {
    if (node == null) {
      return new MyNode(value);
    }
    if (value < node.value) {
      node.left = this.recursiveAdd(node.left, value);
    } else {
      node.right = this.recursiveAdd(node.right, value);
    }
    node.height =
      Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;

    //balanceFactor = height(L) - height(R)
    // >1 left heave rotate right
    // <-1 right heavy rotate left

    return this.balance(node);

  }

  balance(node) {
    if (this.isLeftHeavy(node)) {
      if (this.balanceFactor(node.left) < 0) {
        node.left = this.rotateLeft(node.left);
        return this.rotateRight(node);
      } else if (this.balanceFactor(node.left) > 0) {
        return this.rotateRight( node);
      }
    } else if (this.isRightHeavy(node)) {
      if (this.balanceFactor(node.right) < 0) {
        return this.rotateLeft( node);
      } else if (this.balanceFactor(node.right) > 0) {
        node.right = this.rotateRight( node.right);
        return this.rotateLeft( node);
      }
    }
  }

  rotateLeft(node){
//    10 node
//       20 newRoot
//         30

//      20
//   10    30

    let newRoot = node.right
    node.right = newRoot.left
    newRoot.left = node
   this.setHeight(node)
   this.setHeight(newRoot)
   return newRoot
  }

  rotateRight(node){
    //    10 node
    //       20 newRoot
    //         30
    
    //      20
    //   10    30
    
        let newRoot = node.left
        node.left = newRoot.right
        newRoot.right = node
       this.setHeight(node)
       this.setHeight(newRoot)
       return newRoot
      }

  setHeight(node){

    node.height = Math.max(this.getHeight(node.left),this.getHeight(node.right)) +1

  }
  balanceFactor(node) {
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  isLeftHeavy(node) {
    return this.balanceFactor(node) > 1;
  }

  isRightHeavy(node) {
    return this.balanceFactor(node) < -1;
  }

  getHeight(node) {
    return node == null ? -1 : node.height;
  }
}

const cats = new AvlTree();
cats.insert(10);
cats.insert(30);
cats.insert(20);
