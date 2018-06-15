import parse from 'csv-parse'
import fs from 'mz/fs'

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

export {
    parseCsvFile,
    parseCsvFileAsync
}