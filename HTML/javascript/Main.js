function runMagenta() {
    let magenta = new Magenta(document.getElementById('screenOne').value,
        document.getElementById('screenTwo').value,
        document.getElementById('screenThree').value,
        document.getElementById('serialNumber').value);

    let affCiph = magenta.affineCipher();
    let mysTrans = magenta.myszkowskiTransposition(affCiph);
    document.getElementById('answer').innerHTML = 'Answer: ' + magenta.autokeyCipher(mysTrans);
}