const parse = require('csv-parse')
const fs = require('mz/fs')

function parseCsvFile(fileName, options) {
    return new Promise((resolve, reject) => {
        try {
            fs.createReadStream(fileName, { encoding: 'latin1' })
                .then(readStream => {
                    readStream.pipe(parse(options, (err, data) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(data)
                        }
                    })
                )})
                .catch(error => {
                    reject(error)
                })
        } catch (err) {
            reject(err)
        }
    })
}

async function parseCsvFileAsync(fileName, options) {
    const readStream = await fs.createReadStream(fileName, { encoding: 'latin1' })
    return new Promise((resolve, request) => {
        readStream.pipe(parse(options, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        }))
    })
}

module.exports = {
    parseCsvFile,
    parseCsvFileAsync
}