import pkg from "heapify";
const { MinQueue } = pkg;

import "google-closure-library";
goog.require("goog.structs.Heap");

// import {MinQueue} from "heapify";

// const queue = new Heapify();
// queue.push(1, 10);  // insert item with key=1, priority=10
// queue.push(2, 5);  // insert item with key=2, priority=5
// queue.pop();  // 2
// queue.peek();  // 1
// queue.peekPriority();  // 10

class Node {
  constructor(label, value) {
    this.label = label;
    this.value = value;
    this.edgeList = [];
  }

  addEdge(to, weight) {
    const newEdge = new Edge(this.label, to, weight);
    this.edgeList.push(newEdge);
  }
}

class Edge {
  constructor(from, to, weight) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}

class WeightedGraph {
  constructor() {
    this.nodeList = {};
    this.edgeList = {};
  }

  addNode(label, value) {
    const newNode = new Node(label, value);
    this.nodeList[label] = newNode;
    this.edgeList[label] = [];
  }

  addEdge(to, from, weight) {
    if (!(to in this.nodeList) || !(from in this.nodeList)) {
      throw "nodes not found";
    }
    this.nodeList[to].addEdge(from, weight);
    this.nodeList[from].addEdge(to, weight);
  }

  print() {
    for (const [key, node] of Object.entries(this.nodeList)) {
      console.log(key);
      for (const connection of node.edgeList) {
        console.log(
          `${node.label} is connected to ${connection.to} with weight ${connection.weight}`
        );
      }
    }
  }

  checkForCycles() {
    const allNodes = { ...this.nodeList };

    //loop through all nodes until all are visited
    while (Object.keys(allNodes).length > 0) {
      const nodeToVisit = Object.keys(allNodes)[0];
      console.log(nodeToVisit);
      const visited = {};
      this.checkForCyclesHelper(nodeToVisit, visited, allNodes, null);
    }
  }

  checkForCyclesHelper(nodeLabel, visited, allNodes, parentLabel) {
    visited[nodeLabel] = true;
    delete allNodes[nodeLabel];
    const node = this.nodeList[nodeLabel];
    for (const edge of node.edgeList) {
      const edgeLabel = edge.to;
      console.log("at", nodeLabel, "going to", edgeLabel);
      if (edgeLabel == parentLabel) {
        continue;
      } else {
        if (edgeLabel in visited) {
          console.log("cycle detected");
        } else {
          this.checkForCyclesHelper(edgeLabel, visited, allNodes, nodeLabel);
        }
      }
    }
  }

  getShortestPath(from, to) {
    const queue = new MinQueue();
    const distance = {};
    const previousNodes = {};
    const visited = new Set();

    //for each neighbor
    //if shorter path found
    //update distances table
    //push neighbor to queue (with priority as distance?)
    for (const node in this.nodeList) {
      distance[node] = Infinity;
      previousNodes[node] = null;
    }
    console.log("from", from);
    distance[from] = 0;
    queue.push(from.charCodeAt(0), 0);

    while (queue.size) {
      const currentLabel = String.fromCharCode(queue.pop());
      console.log("current label", currentLabel);
      visited.add(currentLabel);
      let current = this.nodeList[currentLabel];
      for (const edge of current.edgeList) {
        if (!visited.has(edge.to)) {
          console.log("visiting", edge.to);
          console.log("edge", edge);
          console.log("distance", distance);
          const newDistance = distance[currentLabel] + edge.weight;
          console.log("new dist", newDistance);
          if (newDistance < distance[edge.to]) {
            distance[edge.to] = newDistance;
            queue.push(edge.to.charCodeAt(0), newDistance);
            previousNodes[edge.to] = current; //this is a list of how a given node was arrived at
          }
        }
      }
    }
    console.log(distance);
    console.log("previous nodes", previousNodes);
    const nodeStack = new Array();
    nodeStack.push(this.nodeList[to]);
    let previous = previousNodes[to];
    console.log("previous", previous);
    while (previous != null) {
      nodeStack.push(this.nodeList[previous.label]);
      previous = previousNodes[previous.label];
      console.log("previous", previous);
    }
    console.log("node stack", nodeStack);

    return nodeStack.map((node) => node.label);
  }

  getMinimumSpanningTree() {
    const heap = new goog.structs.Heap();
    // heap.insert(1, "a");
    // heap.insert(2, "b");
    // console.log(heap.remove());

    const newTree = new WeightedGraph();

    const allNodes = { ...this.nodeList };

    //loop through all nodes until all are visited
    while (Object.keys(allNodes).length > 0) {
      const currentLabel = Object.keys(allNodes)[0];
      this.spanTreeHelper(currentLabel, allNodes, newTree, heap);
    }
    return newTree;
  }

  spanTreeHelper(currentLabel, allNodes, tree, heap) {
    const currentNode = this.nodeList[currentLabel];
    delete allNodes[currentLabel];

    for (const edge of currentNode.edgeList) {
      if (edge.to in allNodes) {
        heap.insert(edge.weight, edge);
      }
    }
    tree.addNode(currentLabel);
    while (heap.getCount() > 0) {
      const edgeToAdd = heap.remove();
      console.log("edge to add", edgeToAdd);
      console.log("alllNodes", allNodes);
      if (edgeToAdd.to in allNodes) {
        tree.addNode(edgeToAdd.to);
        tree.addEdge(edgeToAdd.from, edgeToAdd.to, edgeToAdd.weight);
        this.spanTreeHelper(edgeToAdd.to, allNodes, tree, heap);
      }
    }
  }
}

const my_graph = new WeightedGraph();
my_graph.addNode("a", 10);
my_graph.addNode("b", 10);
my_graph.addNode("c", 10);
my_graph.addNode("d", 10);
my_graph.addNode("e", 10);
my_graph.addEdge("a", "b", 3);
my_graph.addEdge("a", "c", 4);
my_graph.addEdge("a", "d", 2);
my_graph.addEdge("d", "b", 6);
my_graph.addEdge("d", "c", 1);
my_graph.addEdge("d", "e", 5);
my_graph.addEdge("b", "e", 1);

my_graph.print();
console.log(my_graph.getShortestPath("a", "e"));

const my_cycle_graph = new WeightedGraph();
my_cycle_graph.addNode("a");
my_cycle_graph.addNode("b");
my_cycle_graph.addNode("c");
my_cycle_graph.addEdge("a", "b", 1);
my_cycle_graph.addEdge("b", "c", 1);
my_cycle_graph.addEdge("c", "a", 1);
my_cycle_graph.checkForCycles();

const my_spanning = new WeightedGraph();
my_spanning.addNode("a");
my_spanning.addNode("b");
my_spanning.addNode("c");
my_spanning.addNode("d");
my_spanning.addEdge("a", "b", 3);
my_spanning.addEdge("b", "d", 4);
my_spanning.addEdge("d", "c", 5);
my_spanning.addEdge("c", "a", 1);
my_spanning.addEdge("c", "b", 2);
console.log("-----");
const pruned = my_spanning.getMinimumSpanningTree();

pruned.print();
