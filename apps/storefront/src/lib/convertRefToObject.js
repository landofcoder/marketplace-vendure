export const convertRefToObject = (refsArray) => {
    let resultConverting = {};
    Object.entries(refsArray).forEach(entry => {
        const [key, ref] = entry;
        if(ref.value){
            resultConverting[`${key}`] = ref.value
        }
    });
   console.log(resultConverting)
    return resultConverting;
}