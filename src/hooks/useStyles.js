
export function useStyles(mainClass, addClass){

    const classes = [mainClass]
    if (addClass) {
        classes.push(addClass)
    }

    return classes
}