const { Transform } = require('stream');

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        let text = chunk.toString();
        let wordsArray = text.split(' ');
        let restWords = [...wordsArray]
        restWords.splice(0, 1);
        restWords = restWords.map(item => {
            let firstLetter = item.charAt(0);
            let wordCapitalized = item.replace(firstLetter, firstLetter.toUpperCase());
            return wordCapitalized
        })

        let camelCaseArray = [wordsArray[0], ...restWords]
        let textCamelCase = camelCaseArray.join('');

        this.push(textCamelCase);
        callback();
    }
})

process.stdin.pipe(transformStream).pipe(process.stdout);