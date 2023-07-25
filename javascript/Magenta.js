class Magenta {
    constructor(screenOne, screenTwo, screenThree, serialNumber) {
        this.screenOne = screenOne;
        this.screenTwo = screenTwo;
        this.screenThree = screenThree;
        this.serialNumber = serialNumber;
    }

    affineCipher() {
        let x = 0;
        let d = 0;
        let serNumArray = this.serialNumber.split('');

        for (let i = 0; i < 6; i++) {
            if (!isNaN(serNumArray[i])) {
                x += parseInt(serNumArray[i]);
            }
        }

        x = x % 25 + 1;

        for (let i = 0; d === 0; i++) {
            if ((this.screenTwo * i) % 26 === 1) {
                d = i;
            }
        }

        let newWord = "";
        for (let i = 0; i < this.screenOne.length; i++) {
            let code = this.screenOne.toUpperCase().charCodeAt(i);
            let newNumber;
            if (code > 64 && code < 91) newNumber = (((code - 64) - x) * d) % 26;
            if (newNumber < 0) newNumber += 26;
            newWord += String.fromCharCode(newNumber + 64);
        }
        return newWord;
    }

    myszkowskiTransposition(affineCipherWord) {

        let serialLetArr = this.serialNumber.replace(/[0-9]/g, '').split('');
        let serialLetArrAlph = [];
        let finalWordArray = [];
        let count = 0;

        for (let i = 0; i < serialLetArr.length; i++) {
            let addLetter = true;
            for (let j = 0; j < serialLetArr.length; j++) {
                if (serialLetArr[i] === serialLetArrAlph[j]) {
                    addLetter = false;
                }
            }
            if (addLetter === true) serialLetArrAlph.push(serialLetArr[i])
        }

        serialLetArrAlph.sort();

        for (let i = 0; i < serialLetArrAlph.length; i++) {
            for (let row = 0; row*serialLetArr.length < affineCipherWord.length; row++) {
                for (let col = 0; col < serialLetArr.length; col++) {
                    if (row*serialLetArr.length + col < affineCipherWord.length
                    && serialLetArr[col] === serialLetArrAlph[i]) {
                        finalWordArray[row*serialLetArr.length + col] = affineCipherWord.charAt(count);
                        count++;
                    }
                }
            }
        }
        return finalWordArray.join('');
    }

    autokeyCipher(mysWord) {
        let keyNumber = 0;
        let encNumber = 0;
        let addedLetter = 0;

        for (let i = 0; i < 6; i++) {
            keyNumber = this.screenThree.toUpperCase().charCodeAt(i) - 64;
            encNumber = mysWord.toUpperCase().charCodeAt(i) - 64;
            if (encNumber - keyNumber <= 0) {
                addedLetter = (encNumber - keyNumber) + 90;
            } else {
                addedLetter = encNumber - keyNumber + 64;
            }
            this.screenThree += String.fromCharCode(addedLetter);
        }
        return (this.screenThree.substring(3));
    }
}
