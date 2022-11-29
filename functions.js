import fsp from "fs/promises";

function parseCSV(csv) { //This function returns the csv data in the form of an array where all the elements are strings
    let lines = csv.split("\r\n");
    for (let i = 0; i < lines.length; i++) {
        lines[i] = lines[i].split(',')
    }
    return lines
}

function stringsToRealType(array) {  //This function takes the raw csv data and returns an array where the numbers are integers and letters are strings
    const arrayTrueDataTypes = []
    for (let i = 0; i < array.length; i++) {
        if (Number(array[i][0])) {
            arrayTrueDataTypes.push(Number(array[i][0]))
        } else { arrayTrueDataTypes.push(array[i][0]) }
    }
    return arrayTrueDataTypes
}

function checkIfAllSame(array) {       //Gets an array as parameter and checks if it only contains integers, strings or mixed
    let sum = 0
    const stringArray = []
    for (const iterator of array) {
        if (typeof iterator == 'number' && stringArray.length === 0) {
            sum += iterator
        } else if (typeof iterator == 'string' && sum === 0) {
            stringArray.push(iterator)
        } else {
            console.log("Cannot have mixed data types in the file!");
            return false
        }
    }
    if (sum !== 0) {
        console.log(sum);
    } else {
        console.log(stringArray);
    }
}

export default async function mainExcerciseFunction(fileName) {
    try {
        const content = await fsp.readFile(`${fileName}`, 'utf-8')
        const parsedRawData = parseCSV(content)
        const formatedArray = stringsToRealType(parsedRawData)
        await checkIfAllSame(formatedArray)
    }
    catch (error) {
        console.log(error.message)
    }
}