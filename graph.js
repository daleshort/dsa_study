class Node {
  constructor(label) {
    this.label = label;
  }
}

class Graph {
  constructor() {
    this.nodeList = new Object();
    this.adjacencyList = new Object();
  }

  addNode(label) {
    const newNode = new Node(label);
    this.nodeList[label] = newNode;
    this.adjacencyList[label] = new Array();
  }

  addEdge(from, to) {
    const fromNode = this.nodeList[from];
    const toNode = this.nodeList[to];

    if (fromNode == null || toNode == null) {
      throw "no valid node to add";
    }

    this.adjacencyList[fromNode.label].push(toNode);
  }

  print() {
    console.log(this.adjacencyList);
    for (const key in this.adjacencyList) {
      console.log(
        key,
        "is connected to",
        this.adjacencyList[key].map((value) => {
          return value.label;
        })
      );
    }
  }

  removeEdge(from, to) {
    const fromNode = this.nodeList[from];
    const toNode = this.nodeList[to];

    if (fromNode == null || toNode == null) {
      throw "no valid node to remove";
    }
    this.adjacencyList[fromNode.label] = this.adjacencyList[
      fromNode.label
    ].filter((val) => val != toNode);
  }

  removeNode(label) {
    const nodeToRemove = this.nodeList[label];
    if (nodeToRemove) {
      delete this.nodeList[label];
      delete this.adjacencyList[label];
      for (const key in this.adjacencyList) {
        this.adjacencyList[key] = this.adjacencyList[key].filter(
          (val) => val != nodeToRemove
        );
      }
    } else {
      throw "no node to remove";
    }
  }
}

class GraphTraverse {
  constructor(graph) {
    this.graph = graph;
    this.visited = new Set();
  }

  topoSort() {
    const set = new Set();
    const stack = new Array();
    for (const key in this.graph.nodeList) {
      let node = this.graph.nodeList[key];
      if (!set.has(node.label)) {
        this.topoVisit(node.label, set, stack);
      }
    }
    console.log(stack);
    return stack;
  }
  topoVisit(node, set, stack) {

    set.add(node);
    const current_children = this.graph.adjacencyList[node];
    for (const child of current_children) {
      if (!set.has(child.label)) {
        this.topoVisit(child.label, set, stack);
      }
    }
    stack.push(node);
  }

  depthFirst(start) {
    const connectedList = this.graph.adjacencyList[start];
    this.visited.add(start);
    console.log(connectedList);
    for (const node of connectedList) {
      // console.log("node:", node)
      if (!this.visited.has(node.label)) {
        this.depthFirst(node.label);
      }
    }

    console.log("visited", this.graph.nodeList[start].label);
  }

  depthFirstLoop(start) {
    const stack = new Array();
    stack.push(start);
    this.visited.clear();

    while (stack.length > 0) {
      let current = stack.pop();
      console.log(current);
      this.visited.add(current);
      let current_children = this.graph.adjacencyList[current];
      for (const node of current_children) {
        if (!this.visited.has(node.label)) {
          // console.log(node.label)
          stack.push(node.label);
        }
      }
    }
  }
  breadthFirst(start) {
    const queue = new Array();
    this.visited.clear();
    queue.push(start);
    while (queue.length > 0) {
      let current = queue.shift();
      console.log(current);
      this.visited.add(current);
      let current_children = this.graph.adjacencyList[current];
      for (const node of current_children) {
        if (!this.visited.has(node.label)) {
          //console.log(node.label)
          queue.push(node.label);
        }
      }
    }
  }

  cycleDetect(){
    const all = { ...this.graph.nodeList}
    const visiting = {}
    const visited = {}
    console.log('all', all)
    const result = new Array()
    const parents  = {}

    
    while(Object.keys(all).length>0 && result.every((val)=> val ==true)){
      console.log('starting from', Object.keys(all)[0])
      parents[Object.keys(all)[0]] = null
      console.log(parents)
      result.push(this.cycleDetectHelper(Object.keys(all)[0], all,visiting,visited, parents))
  }
    return result.every((val)=> val ==true)
  }

  cycleDetectHelper(current, all, visiting, visited, parents){
    const result = new Array()
    if(current in all){
      delete all[current]
      visiting[current]= true
    }
    console.log(parents)
    const childrenList =  this.graph.adjacencyList[current]
    for(const child of childrenList){
      console.log(child.label)
      console.log(current)
      
      if(child.label in visiting){
        console.log(parents)
        result.push(false)
      } else{
        parents[child.label] = current
        result.push(this.cycleDetectHelper(child.label,all,visiting,visited,parents))
      }
      
    }
    delete visiting[current]
    visited[current] = true
    if(result.every((val)=>val==true)){
      return true
    }else{
      return false
    }
  }



}

const my_graph = new Graph();
my_graph.addNode("a");
my_graph.addNode("b");
my_graph.addNode("c");
my_graph.addNode("d");
my_graph.addEdge("a", "b");
my_graph.addEdge("a", "c");
my_graph.addEdge("b", "d");
my_graph.addEdge("d", "c");

my_graph.print();
const graphTrav = new GraphTraverse(my_graph);
graphTrav.depthFirst("a");
console.log("----");
graphTrav.depthFirstLoop("a");
console.log("----");
graphTrav.breadthFirst("a");
graphTrav.topoSort();
console.log("----");

const graphWithCycle = new Graph()
graphWithCycle.addNode('a')
graphWithCycle.addNode('b')
graphWithCycle.addNode('c')
graphWithCycle.addNode('d')
graphWithCycle.addEdge('a','b')
graphWithCycle.addEdge('b','c')
graphWithCycle.addEdge('c','a')
graphWithCycle.addEdge('d','a')

const cycleCheck = new GraphTraverse(graphWithCycle)
console.log(cycleCheck.cycleDetect('a'))
