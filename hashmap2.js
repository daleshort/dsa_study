import {MyLinkedList} from "./linkedlist.js";
class entry{
    constructor(key,value){
        this.key = key;
        this.value = value;
    }
}

class MyHashMap{
    constructor(){
        this.map = Array(10);
    }

    add(key, value){
        if( this.map[this.hashValue(key)]== undefined){
            console.log('no list found-starting new ll')
            let list =  new MyLinkedList()
            list.addLast(new entry(key,value))
            this.map[this.hashValue(key)] = list
        } else {
            let list =  this.map[this.hashValue(key)]
            list.addLast(new entry(key,value))
            this.map[this.hashValue(key)] = list
        }
    }

    hashValue(key){
        return key % 10
    }
}

let cats = new MyHashMap()
cats.add(1,"meow")
cats.add(11,"meow")
console.log(cats.map[1])