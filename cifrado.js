const sbox = require('./sbox');
const permuta = require('./permutaciones');
const operacion = require('./operaciones');

//Recibe llave inicial, mensaje a cifrar/descifrar
// y la bandera descifrado ( sólo cambia el orden para usar las subllaves )
const cifrar = (llave, mensaje, descifrado) => {
  const mensajePermutado = permuta.permutaPlainText(mensaje);

  //Generar subllaves

  const [ subllave1, subllave2 ] = generarSubllaves(llave)

  //Feistel usando subllave 1

  // Expandemos el primer bloque de 4 bits, que es la segunda mitad del mensaje permutado
  let bloqueExpandido = operacion.expanderBloque( mensajePermutado.slice(mensajePermutado.length / 2) );

  //En caso de que la bandera descifrado sea cierta, usar subllave 2; en caso contrario, subllave 1
  let sboxPermutado = descifrado ? feistel( subllave2, bloqueExpandido) :  feistel( subllave1, bloqueExpandido);

  // Operamos con XOR sobre el sbox permutado y la primera mitad del mensaje permutado
  let resultadoXOR = operacion.xorSboxMitadIzq( sboxPermutado, mensajePermutado.slice( 0, mensajePermutado.length / 2 ) );

  // Concatenamos el resultado con la segunda mitad del mensaje permutado
  let resConcatenado = resultadoXOR + mensajePermutado.slice( mensajePermutado.length / 2);

  // Intercambio de mitades

  const resIntercambio =
    resConcatenado.slice( bloqueExpandido.length / 2 ) +
    resConcatenado.slice( 0, bloqueExpandido.length / 2 );

  //Feistel usando subllave 2

  //Expandemos la segunda mitad, resultado del intercambio anterior
  bloqueExpandido = operacion.expanderBloque( resIntercambio.slice( resIntercambio.length / 2) );

  //En caso de que la bandera descifrado sea cierta, usar subllave 1; en caso contrario, subllave 2
  sboxPermutado = descifrado ? feistel( subllave1, bloqueExpandido) :  feistel( subllave2, bloqueExpandido);

  // Operamos con XOR sobre el sbox permutado y la primera mitad del intercambio hecho
  resultadoXOR = operacion.xorSboxMitadIzq( sboxPermutado, resIntercambio.slice( 0, resIntercambio.length / 2 ) );

  // Concatenamos el resultado con la segunda mitad del intercambio hecho
  resConcatenado = resultadoXOR + resIntercambio.slice( resIntercambio.length / 2);

  //El mensaje cifrado es la permutación inversa del mensaje anterior
  console.log( permuta.permutaInversa(resConcatenado) );
}

const generarSubllaves = llave => {
  const llavePermutada = permuta.permutaLlave(llave);

  const primeraRonda =
    operacion.corrimientoBits( llavePermutada.slice( 0, llavePermutada.length / 2 ), 1 ) +
    operacion.corrimientoBits( llavePermutada.slice( llavePermutada.length / 2 ), 1 );
  
  //Obtenemos subllave 1 al obtener los bits [5, 2, 6, 3, 7, 4, 9, 8]
  const subllave1 = operacion.obtenerSubllave(primeraRonda);
  
  const segundaRonda =
    operacion.corrimientoBits( primeraRonda.slice( 0, llavePermutada.length / 2 ), 2 ) +
    operacion.corrimientoBits( primeraRonda.slice( llavePermutada.length / 2 ), 2 );

  //Obtenemos subllave 2 al obtener los bits [5, 2, 6, 3, 7, 4, 9, 8]
  const subllave2 = operacion.obtenerSubllave(segundaRonda);

  return [ subllave1, subllave2 ];
}

//Regresa un sbox permutado
const feistel = ( subllave, bloqueExpandido ) => {

  const resultadoXOR = operacion.xorBloqueSubllave( bloqueExpandido, subllave );

  const resultadoSbox =
    sbox.s0( resultadoXOR.slice(0, resultadoXOR.length / 2) ) + 
    sbox.s1( resultadoXOR.slice( resultadoXOR.length / 2 ) );

  return permuta.permutaSbox(resultadoSbox);
}

module.exports = cifrar;