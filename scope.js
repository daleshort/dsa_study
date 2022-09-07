const my_array = [3,2,1]

const swap = (array) =>{
    const temp = array[0]
    array[0] = array[1]
    array[1] = temp
    return array
}

console.log(swap(my_array))
//[ 2, 3, 1 ]

