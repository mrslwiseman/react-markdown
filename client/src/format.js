export const format = (format, t) => {
    console.log({ format })
    console.log({ t })
    const tags = {
        bold: ["**", "**"],
        italic: ["*", "*"],
        strikethrough: ["~~", "~~"],
        list_number: ["1 ", ""],
        list_bullet: ["- ", ""],
        blockquote: ["> ", ""],
        code: ["```", "```"],
        h1: ["# ", ""],
        h2: ["## ", ""],
        h3: ["### ", ""]
    }
    const openTag = tags[format][0]
    const closeTag = tags[format][1]
    const start = t.selectionStart
    const end = t.selectionEnd
    const value = t.value

    let formattedValue;
try {

    // Nothing selected, format whole paragraph
    if (start === end) {
        // subtract 1 here so that it doesnt include current line break regex is at
        let lastReturn = value.lastIndexOf('\n', start - 1)
        let nextReturn = value.indexOf('\n', start - 1)
        
        // Last Paragraph in text
        if (nextReturn === -1) {
            nextReturn = value.length
        }
        // add 1 here so that it doesnt include current line break regex is at
        let selection = value.substring(lastReturn + 1, nextReturn);
        
        try {    // search textarea for paragraph and format
            const regex = new RegExp(selection, 'g')
            formattedValue = value.replace(regex, (match, regexPosition) => {
                console.log(match[0] === openTag[0]);
                console.log(match);
                
                
                if (match[0] === openTag[0]) {
                    return match
                }
                return lastReturn === (regexPosition - 1) ? `${openTag}${selection}${closeTag}` : match
            })
        }
        catch (e) {
            throw e
        }
        
        
        
    } else {
        console.log('else,..');
        try {
            
            // User has selected section, format selection
            let selection = value.substring(start, end);
            
            // search textarea for selection and format
            const regex = new RegExp(selection, 'g')
            formattedValue = value.replace(regex, (match, regexPosition) => {
                return start === (regexPosition) ? `${openTag}${selection}${closeTag}` : match
            })
        } catch (e){
            throw e
        }
    } 
    
} catch(e){
    console.warn('Something went wrong...')
    return value
}
    return formattedValue;
    
}

