export const convertRefToObject = (refsArray) => {
    let resultConverting = {};
    Object.entries(refsArray).forEach(entry => {
        const [key, ref] = entry;
        if(ref.value){
            resultConverting[`${key}`] = ref.value
        }else if(ref.state){
            resultConverting[`${key}`] = ref.state.value.value
        }
    });
   console.log(resultConverting)
    return resultConverting;
}