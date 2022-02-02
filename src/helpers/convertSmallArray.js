export const convertSmallArray=(array=[],quantityPerPage=10)=>{
    //break it into smaller arrays
console.log(array)
  
    let   newArray = []; // Here we store the new array

   
    for (let i = 0; i < array.length; i += quantityPerPage) {
      let piece = array.slice(i, i + quantityPerPage);
      newArray.push(piece);
    }

    console.log(newArray)
   return newArray;
}


