A string of brackets is correctly matched if you can pair every opening bracket up with a later closing bracket, and vice versa. For example, (()()) is correctly matched, and (() and )( are not.

    Implement a function which takes a string of brackets and returns the minimum number of brackets you'd have to add to the string to make it correctly matched.
    
    For example, (() could be correctly matched by adding a single closing bracket at the end, so you'd return 1. )( can be correctly matched by adding an opening bracket at the start and a closing bracket at the end, so you'd return 2.
    
    If your string is already correctly matched, you can just return 0.
    
    Write a function which takes a list of numbers and returns the length of the longest continuous stretch of a single number. For example, on the input [1,7,7,3], the correct return is 2, because there are two 7's in a row.

    4 * 3 *2 

    There are a number of tiles on the floor, each numbered with a different non-negative integer. Treat this set of tiles as an array. You are initially standing on the first tile. Each tile in the set represents your maximum jumping distance at that position. (For example, if you are standing on 3, you can jump up to 3 tiles forward). Find out if you can reach the last tile.