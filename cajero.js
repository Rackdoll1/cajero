// leer los inputs, primera pantalla

  const nDeCuenta=document.getElementById('nDeCuenta')
  const pin =document.getElementById('pin')
  const btnGuardar=document.getElementById('guardar')

// segunda pantalla, botones de operaciones
  let

   // creo mi clase usuario
   class Usuario{
    constructor(nombre,password,numeroDeCuenta,saldo){
    this.nombre = nombre;
    this.password = password;
    this.numeroDeCuenta = numeroDeCuenta;
    this.saldo = saldo;
    }
  }


  //validar que los datos esten completos

  const usuario1 = new Usuario("ANDRES",1234,9550001,2000)
  console.log(usuario1);


  // leer los inputs

  var nDeCuenta=document.getElementById('nDeCuenta')
  console.log(nDeCuenta);

  var pin =document.getElementById('pin')

  var btnGuardar=document.getElementById('guardar')

  // validar formulario
  function validarFormulario(numberOfCount,pass){
    if(numberOfCount=='' || pass=='') {
      return false
    } else {
      return true
    }
  }



  // lo que va hacer mi btn despues de click
  function clickEnGuardar(){
    console.log(nDeCuenta.value);

    console.log(pin.value);
    var x= validarFormulario(nDeCuenta.value,pin.value)

   if(x) {

    alert('Formulario Completo');

    //AHORA SI EMPIEZO MI VALIDACION
    if(nDeCuenta.value==usuario1.numeroDeCuenta && pin.value==usuario1.password){
      console.log('ingreso exitoso')

      //aqui entra mi otra interfaz





    }

    else{

      alert('Formulario Completo');
    }

    }

   else {
    alert('Completa tus datos');
    }

  }

  // escuchar cuando alguien le da click

  btnGuardar.addEventListener('click', clickEnGuardar)


  //validar que los dtaos esten completos






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
