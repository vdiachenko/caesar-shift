#!/usr/bin/env node

const alphabet = [
    'а',
    'б',
    'в',
    'г',
    'д',
    'е',
    'ё',
    'ж',
    'з',
    'и',
    'й',
    'к',
    'л',
    'м',
    'н',
    'о',
    'п',
    'р',
    'с',
    'т',
    'у',
    'ф',
    'х',
    'ц',
    'ч',
    'ш',
    'щ',
    'ъ',
    'ы',
    'ь',
    'э',
    'ю',
    'я',
]

const program = require('commander')
const chalk = require('chalk')
const log = console.log

program
    .option('-k --key <key>', 'shift', 2)
    .option('-s --string <str>', 'plain text', '')
    .parse(process.argv)

function getEncryptIndex(index) {
    const key = +program.key

    return index + key > alphabet.length - 1
        ? index + key - alphabet.length
        : index + key
}

function encrypt(item) {
    let plainIndex, cipherIndex

    if (+alphabet.indexOf(item) !== -1) {
        plainIndex = +alphabet.indexOf(item)
        cipherIndex = getEncryptIndex(plainIndex)

        return alphabet[cipherIndex]
    } else if (+alphabet.indexOf(item.toLowerCase()) !== -1) {
        plainIndex = +alphabet.indexOf(item.toLowerCase())
        cipherIndex = getEncryptIndex(plainIndex)

        return alphabet[cipherIndex].toUpperCase()
    }

    return item
}

const arr = [...program.string]
const result = arr.map(encrypt)

log(chalk.green.bold('Plaintext:'), chalk.white.bold(program.string))
log(chalk.red.bold('Ciphertext:'), chalk.white.bold(result.join('')))
