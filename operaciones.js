//Hace un corrimiento de bits hacia la izquierda, n lugares
const corrimientoBits = ( bits, n ) => {
  let temp;
  const corrimiento = []; 
  for( let i = 0; i < bits.length; i++ ){
	  if( i  == 0 ){
		  temp = bits[0];
    }
	  if( i != bits.length - 1 ){
		  corrimiento.push( bits[i+1] );
	  } else {
      corrimiento.push(temp);
    }
  }
  //Repetir procedimiento si se requiere recorrer dos lugares (n = 2)
  return n == 2 ? corrimientoBits( corrimiento.join(''), 1 ) : corrimiento.join('');
}

//Hace una extracción de bits [5, 2, 6, 3, 7, 4, 9, 8]
const obtenerSubllave = bits =>
  bits[5] + 
  bits[2] +
  bits[6] +
  bits[3] +
  bits[7] +
  bits[4] +
  bits[9] +
  bits[8];

  //Expande un bloque de 4 bits a [3, 0, 1, 2, 1, 2, 3, 0]
const expanderBloque = bits =>
  bits[3] +
  bits[0] +
  bits[1] +
  bits[2] +
  bits[1] +
  bits[2] +
  bits[3] +
  bits[0];

//Opera XOR sobre un bloque expandido y una subllave
const xorBloqueSubllave = (bloqueExpandido, subllave) => {
  let resultado = '';
  for( let i = 0; i < 8; i++ ){
    //El método toString(2) regresa el número en base 2
    //La operación XOR se representa con '^'
    resultado += ( bloqueExpandido[i] ^ subllave[i] ).toString(2);
  }
  return resultado;
}

// Opera XOR sobre un sbox permutado y la primera mitad del mensaje permutado
const xorSboxMitadIzq = ( sboxPermutado, mitadIzqMsj ) => {
  let resultado = '';
  for( let i = 0; i < 4; i++ ){
    resultado += ( sboxPermutado[i] ^ mitadIzqMsj[i] ).toString(2);
  }
  return resultado;
}

module.exports = {
  corrimientoBits: corrimientoBits,
  obtenerSubllave: obtenerSubllave,
  expanderBloque: expanderBloque,
  xorBloqueSubllave: xorBloqueSubllave,
  xorSboxMitadIzq: xorSboxMitadIzq
}