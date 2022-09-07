const crap = 1;

class trieNode {
  constructor(value) {
    this.value = value;
    this.children = {};
    this.isEnd = false;
  }

  hasValueInChildren(value) {
    if (value in this.children) {
      return true;
    } else {
      return false;
    }
  }

  addValueToChildren(value) {
    this.children[value] = new trieNode(value);
  }
}

class trieTree {
  constructor() {
    this.root = new trieNode(null);
  }
  insert(string) {
    let current = this.root;
    for (let char of string) {
      console.log(char);

      if (!current.hasValueInChildren(char)) {
        current.addValueToChildren(char);
      }
      current = current.children[char];
    }
    current.isEnd = true;
  }
}

const cats = new trieTree();
cats.insert("meow");
cats.insert("meat");
console.log("done");
//[ 2, 3, 1 ]
