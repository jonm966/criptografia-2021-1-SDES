const tablaS0 = [
  [1, 0, 3, 2],
  [3, 2, 1, 0],
  [0, 2, 1, 3],
  [3, 1, 3, 2]
];

const tablaS1 = [
  [0, 1, 2, 3],
  [2, 0, 1, 3],
  [3, 0, 1, 0],
  [2, 1, 0, 3]
];

const s0 = bits => {
  const renglon = parseInt( bits[0] + bits[3], 2);
  const columna = parseInt( bits[1] + bits[2], 2);
  //El método toString(2) convierte el valor a binario
  return parseValorBin( tablaS0[renglon][columna].toString(2) );
}

const s1 = bits => {
  const renglon = parseInt( bits[0] + bits[3], 2);
  const columna = parseInt( bits[1] + bits[2], 2);
  //El método toString(2) convierte el valor a binario
  return parseValorBin( tablaS1[renglon][columna].toString(2) );
}

//Agrega un cero para acompletar un binario de dos digitos
const parseValorBin = bin => bin.length == 2 ? bin : '0' + bin;

module.exports = { s0: s0, s1: s1};