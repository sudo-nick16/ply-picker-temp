export default function lengthyText (string, MAX_LENGTH) {
    if (string.length>MAX_LENGTH){
        return `${string.substring(0,MAX_LENGTH)}...`
    }
    else{
        return string
    }
}