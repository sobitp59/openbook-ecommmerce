export const getRandomNumber = (min, max ) => {
    let range = max - min;
    let randomNumber = min + Math.floor(Math.random() * range);
    return randomNumber; 
}

