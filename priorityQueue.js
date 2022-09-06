class MyPriorityQueue{

    constructor(){
        this.queue = new Array()
    }

    add(value){
        //10 20 40 50 60 null
        //             i
        this.queue.push(null)
        for(let i = this.queue.length - 1; i>=0;i--){
            console.log("i ", i)
            let array_val = this.queue[i]
            console.log("array val", array_val)
            console.log(this.queue.length)
            if(this.queue.length == 1 && array_val == null){
                this.queue[i] = value
            }
            else if(array_val == null){
                // dont do anything
            }
            else if(array_val >= value){
                this.queue[i] = value
                this.queue[i+1] = array_val
            } else{ //array val is < value
                this.queue[i+1] = value
                this.queue[i] = array_val
                break
            }
        }
        console.log("queue is ", this.queue)
    }
}

cats = new MyPriorityQueue()
cats.add(10)
cats.add(20)
cats.add(5)
cats.add(5)
