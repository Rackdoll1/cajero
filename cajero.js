// leer los inputs, primera pantalla

  const nDeCuenta=document.getElementById('nDeCuenta')
  const pin =document.getElementById('pin')
  const btnGuardar=document.getElementById('guardar')

// segunda pantalla, botones de operaciones
  let


  // lo que va hacer mi btn despues de click
  function clickEnGuardar(){
    console.log(nDeCuenta.value);
  }

  // escuchar cuando alguien le da click

  btnGuardar.addEventListener('click', clickEnGuardar)

  class Usuario{
    constructor(nombre,password,numeroDeCuenta,saldo){
    this.nombre = nombre;
    this.password = password;
    this.numeroDeCuenta = numeroDeCuenta;
    this.saldo = saldo;
    }
  }

  const usuario1 = new Usuario("ANDRES",1234,"9550001",2000)
  console.log(usuario1);


  class Cajero {
    constructor(cuenta){
      this.cuenta = cuenta
    }

    consultarSaldo() {
      return `Su saldo es $${this.cuenta.saldo}`
    }

    depositarEfectivo(cantidad) {
      this.cuenta.saldo += cantidad
      return `Se depositó la cantidad de $${cantidad}`
    }

    // esta funcion tambien puede usarse para el pago de servicios
    retirarEfectivo(cantidad) {
      if (cantidad > this.cuenta.saldo) {
        return 'Saldo insuficiente para realizar esta operación'
      }else {
        this.cuenta.saldo -= cantidad
        return `Se dispuso la cantidad de $${cantidad}`
      }
    }

    realizarTransferencia(cantidad, numeroDeCuenta) {
      if (cantidad > this.cuenta.saldo) {
        return 'Saldo insuficiente para realizar esta operación'
      }else {
        this.cuenta.saldo -= cantidad
        return `Se transfirió la cantidad de $${cantidad}\na la cuenta con numero ${numeroDeCuenta}`
      }
    }

  }

const cajero = new Cajero(usuario1)
console.log(cajero);


console.log(cajero.consultarSaldo());
console.log(cajero.depositarEfectivo(100));
console.log(cajero.consultarSaldo());
console.log(cajero.retirarEfectivo(3000));
console.log(cajero.consultarSaldo());
console.log(cajero.retirarEfectivo(500));
console.log(cajero.consultarSaldo());
console.log(cajero.realizarTransferencia(4000, "12345"));
console.log(cajero.realizarTransferencia(300, "12346"));
