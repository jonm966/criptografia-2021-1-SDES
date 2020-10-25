//Hace la permutación inicial del mensaje a de 8 bits a [1, 5, 2, 0, 3, 7, 4, 6]
const permutaPlainText = mensaje =>
  mensaje[1] +
  mensaje[5] +
  mensaje[2] +
  mensaje[0] +
  mensaje[3] +
  mensaje[7] +
  mensaje[4] +
  mensaje[6];

//Hace la permutación de la llave de 10 bits a [2, 4, 1, 6, 3, 9, 0, 8, 7, 5]
const permutaLlave = llave =>
  llave[2] +
  llave[4] +
  llave[1] +
  llave[6] +
  llave[3] +
  llave[9] +
  llave[0] +
  llave[8] +
  llave[7] +
  llave[5];

// Hace la permutación de un sbox (concatenación s0 y s1) a [1, 3, 2, 0]
const permutaSbox = resultadoSbox =>
  resultadoSbox[1] +
  resultadoSbox[3] +
  resultadoSbox[2] +
  resultadoSbox[0];

//Hace una permutación inversa de bits [3, 0, 2, 4, 6, 1, 7, 5]
const permutaInversa = bits =>
  bits[3] +
  bits[0] +
  bits[2] +
  bits[4] +
  bits[6] +
  bits[1] +
  bits[7] +
  bits[5];

module.exports = {
  permutaPlainText: permutaPlainText,
  permutaLlave: permutaLlave,
  permutaSbox: permutaSbox,
  permutaInversa: permutaInversa
}




