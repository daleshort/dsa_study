my_string = "abcd"

const reverse_string = (my_string) =>{
    stack = Array();
    for(let i=0; i<my_string.length; i++){
        stack.push(my_string[i])
    }
    let reverse = ''
    for(let i=0; i<my_string.length; i++){
        reverse= reverse + stack.pop()
    }
    return reverse
}

console.log(reverse_string(my_string))

my_expression = "(([1] + <2>))[a]"

const balanced_string = (my_string) =>{
    stack = Array();
    
    const arrayPeek = (array) =>{
        return(array[array.length-1])
    }
    
    for(let i =0; i<my_string.length;i++){
        char = my_string[i]

        if(char == '('){
            stack.push(char)
        } else if (char == '['){
            stack.push(char)
        } else if (char == '<'){
            stack.push(char) 
        } else if (char == ')'){
            if(arrayPeek(stack) =='('){
                stack.pop()
            } else{
                return false
            }
        }else if (char == ']'){
            if(arrayPeek(stack) =='['){
                stack.pop()
            } else{
                return false
            }
        }else if (char == '>'){
            if(arrayPeek(stack) =='<'){
                stack.pop()
            } else{
                return false
            }
        }
        if(stack.length ==0){
            return true
        }

    }
    console.log(arrayPeek(stack))
    console.log(stack)
}

console.log(balanced_string(my_expression))