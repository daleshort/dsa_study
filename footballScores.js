

const getScores = (score,history,masterList) =>{
    const scoreOptions = [1,2,3,6]
    for(let num of scoreOptions){
        if(score-num ==0){
            masterList.push(history.concat(num))

        } else if( score-num < 0){
            //do nothing
        } else {
            getScores(score-num, history.concat(num),masterList)
        }

    }
}


const getScoresHash = (score,history,masterList,hash) =>{
    const scoreOptions = [1,2,3,6]
    for(let num of scoreOptions){
        if(score-num ==0){
            masterList.push(history.concat(num))

        } else if( score-num < 0){
            //do nothing
        } else {
            if(hash.hasOwnProperty(score-num)){
               // console.log('hash:', hash[score-num])
                for(let k =0; k<hash[score-num].length; k++){
                    masterList.push([num].concat(hash[score-num][k]))
                }
            } else{
            getScores(score-num, history.concat(num),masterList,hash)
            }
        }

    }
}

const getScoreOptionsHash = (score,history,update,hash) =>{
    const scoreOptions = [1,2,3,6]
    for(let num of scoreOptions){
        if(score-num ==0){
            update(history +1)

        } else if( score-num < 0){
            //do nothing
        } else {
            if(hash.hasOwnProperty(score-num)){
                    update(hash[score-num])
            } else{
            let temp = history +1 
            getScoreOptionsHash(score-num, temp, update,hash)
            }
        }

    }
}

const getNumberOfWays = (score) =>{
const hash = {}
let master = 0
const updateMaster = (value) =>{
    master = master + value
}

for(let i=1; i<=score; i++){
    master = 0;
    getScoreOptionsHash(i,0,updateMaster,hash)
    console.log("master", master)
    hash[i] = master
}
return master
}
console.log(getNumberOfWays(200))