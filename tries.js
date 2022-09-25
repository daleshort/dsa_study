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

  getAllChildren(){
    return this.children
  }

  removeChild(char){
    if(char in this.children){
      delete this.children[char]
    }
  }
}

class trieTree {
  constructor() {
    this.root = new trieNode(null);
  }
  insert(string) {
    let current = this.root;
    for (let char of string) {
     // console.log(char);

      if (!current.hasValueInChildren(char)) {
        current.addValueToChildren(char);
      }
      current = current.children[char];
    }
    current.isEnd = true;
  }
  contains(string){
    let current = this.root;
    for (let char of string){
      if(current.hasValueInChildren(char)){
        current = current.children[char];
      } else{
        return false
      }
    }
    if( current.isEnd == true){
    return true;
    } else{
      return false;
    }
  }

  traversePre(node = this.root){
    //depending on where the console statement is, it's actually pre or post
    let children = node.children

    for(let child in children){
      this.traversePre(children[child])
    }
    console.log("node val:", node.value)
  }

  remove(string){
    if(this.contains(string)){
      current = this.root
      for(let char of string){
        current = current.children[char]
      }
      current.isEnd = false

    }
  }

  findWords( root, prefix, list){
    if(root.isEnd){
      list.push(prefix)
    }
    for(let child in root.children){
      console.log('child', root.children[child])
      this.findWords(root.children[child],prefix+root.children[child].value,list)
    }
  }

  initFindWords(prefix){
    let words = new Array();
    let lastNode = this.findLastNodeOf(prefix)
    this.findWords(lastNode,prefix,words)
    return words
  }

  findLastNodeOf(prefix){
    let current = this.root
    for(let ch of prefix){
      let child = current.children[ch]
      if(child == null){
        return null
      }
      current = child
    }
    return current
  }

  remove2(node = this.root, word, index){
    let char = word.charAt(index)

    let child = node.children[char]

    if(index == word.length){
    node.isEnd = false;
    console.log(
      "end:", node.value)
    }
    let newIndex = index+1
    if(child == null){
      return;
    }

    this.remove2(child,word,newIndex)
    if(child.children.length ==0 && child.isEnd ==false){
      node.removeChild(char)
    }
  }
}

const cats = new trieTree();
cats.insert("car");
cats.insert("care");
//console.log(cats.contains("meow"))
//console.log(cats.contains("purr"))
//cats.traversePre();
cats.remove2(cats.root,"car", 0)
console.log(cats.contains("car"))
console.log(cats.contains("care"))
cats.remove2(cats.root,"care", 0)
console.log(cats.contains("care"))
//[ 2, 3, 1 ]

const cats2 = new trieTree();
cats2.insert('car')
cats2.insert('card')
cats2.insert('careful')
cats2.insert('egg')
let words = cats2.initFindWords('car')
console.log(words)
