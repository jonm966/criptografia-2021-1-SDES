// Autor : Jonas Montoya Landa
// Fecha 24/10/20
// Descripción: Algoritmo SDES

const readline = require('readline');
const cifrar = require('./cifrado');

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const algoritmo = {
  metodo: '', //Indica si se va a cifrar o descifrar
  llave: '',
  ejecutar: function(mensaje){
    if( this.metodo === 'E'){
      cifrar( this.llave, mensaje, false);
    } else {
      cifrar( this.llave, mensaje, true );
    }
    this.llave = '';
  }
};

r1.on('line', line => controlador(line));

const controlador = linea => {
  switch(linea){
    
    case 'E':
      algoritmo.metodo = 'E';
      break;

    case 'D':
      algoritmo.metodo = 'D';
      break;
    
    default:
      if( !algoritmo.llave ) //Si aún no se ha asignado una llave
        algoritmo.llave = linea;
      else 
        algoritmo.ejecutar(linea);

  }
}