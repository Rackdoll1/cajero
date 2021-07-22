(function () {
// leer los inputs, primera pantalla

  const nDeCuenta= document.getElementById('nDeCuenta')
  const pin = document.getElementById('pin')
  const btnGuardar= document.getElementById('guardar')

// segunda pantalla, botones de operaciones
  const pantallaDeInicio = document.getElementById('div-body')
  const pantallaOperacion = document.getElementById('operacion-en-curso')

  const consultar = document.getElementById('consultar')
  const retirar = document.getElementById('retirar')
  const depositar = document.getElementById('depositar')
  const transferir = document.getElementById('transferir')
  const pagar = document.getElementById('pagar')
  const salir = document.getElementById('salir')

  // const inputOperacionCajero = document.getElementById('input-operacion-cajero')
  // const confirmar = document.getElementById('boton-confirmar')
  const cancelar = document.getElementById('boton-cancelar')

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


  // validar formulario
  function validarFormulario(numberOfCount,pass){
    if(numberOfCount=='' || pass=='') {
      return false
    } else {
      return true
    }
  }

  // lo que va hacer mi btn despues de click
  const clickEnGuardar = () => {

    var x= validarFormulario(nDeCuenta.value,pin.value)

   if(x) {

    //AHORA SI EMPIEZO MI VALIDACION
    if(nDeCuenta.value==usuario1.numeroDeCuenta && pin.value==usuario1.password){
      alert('Ingreso exitoso')

      //aqui entra mi otra interfaz

        pantallaDeInicio.style.display = 'none'
        let bienvenida = document.getElementById('bienvenida')

        bienvenida.innerHTML = `Hola ${usuario1.nombre}`

    }

    else{

      alert('Datos incorrectos');
      nDeCuenta.value = ''
      pin.value = ''
    }

    }

   else {
    alert('Completa tus datos');
    }

  }

  // escuchar cuando alguien le da click

  btnGuardar.addEventListener('click', clickEnGuardar)





// -----------> Interfaz de opraciones del cajero <----------

  class Cajero {
    constructor(cuenta){
      this.cuenta = cuenta
    }

    consultarSaldo() {
      return `Su saldo es de: $${this.cuenta.saldo}`
    }

    depositarEfectivo(cantidad) {
      if(cantidad > 0) {
        this.cuenta.saldo += cantidad
        return `Se depositó la cantidad de $${cantidad}`
      } else {
        return 'No se ingresó una cantidad válida'
      }
    }

    // esta funcion tambien puede usarse para el pago de servicios
    retirarEfectivo(cantidad) {
      if (cantidad > this.cuenta.saldo || cantidad <= 0) {
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

  // creacion de objeto cajero, recibe un usuario como argumento para manejar su informacion
  const cajero = new Cajero(usuario1)

  // crear función para mostrar el cuadro con la operacion en curso
  const clickVisible = () => {
    pantallaOperacion.classList.remove('hide')
  }
  // función para ocultar la pantalla de operacion en curso
  const clickInvisible = () => {
    pantallaOperacion.classList.add('hide')

  }
  // validar input de entrada en operaciones de Cajero
  // const esNumero = (input) => {
  //   if(typeof input !== 'number') {
  //     return false
  //   }
  //   return true
  // }

  // funcion especifica para mostrar el contenido de la operacion "consultar"
  const operacionConsultar = () => {

    // ocultar el input porque tampoco será necesario
      // se cambio la forma de agregar el input inputOperacionCajero.classList.add('hide')
    // obtengo todos los elementos hijos del elemento pantalla en operacion
    const c = pantallaOperacion.children
    // funcion
    retirarChildren(c)
    // accedo al primer hijo para mostrar el nombre de la operacion de manera dinámica
    let p = document.createElement('p')
    p.textContent = consultar.innerHTML
    c[0].appendChild(p)
    // accedo al segundo hijo para mostrar el resultado de la operacion, es decir, la funcion del mismo nombre
    let resultado = document.createElement('p')
    resultado.textContent = cajero.consultarSaldo()
    c[1].appendChild(resultado)
    // ya que prepraré el elemento con la información necesaria, lo hago visible en pantalla
    clickVisible()
  }

  // funcion especifica para mostrar el contenido de la operacion "retirar"
  const operacionRetirar = () => {
    const c = pantallaOperacion.children
    retirarChildren(c)
    let p = document.createElement('p')
    p.textContent = retirar.innerHTML
    c[0].appendChild(p)

    let instruccion = document.createElement('p')
    instruccion.textContent = 'Ingrese la cantidad que desea retirar:'
    c[1].appendChild(instruccion)

    let input = document.createElement('input')
    input.setAttribute('input', 'number')
    input.setAttribute('placeholder', 'Ingrese cantidad a retirar')
    input.setAttribute('min', 1)
    c[1].appendChild(input)

    let confirmar = document.createElement('button')
    confirmar.setAttribute('class', 'boton-confirmar')
    confirmar.innerHTML = 'Confirmar'
    c[1].appendChild(confirmar)

    confirmar.addEventListener('click', function(){
      if(c[1].children.length >= 4) {
        c[1].children.removeChild(c[1].children.lastChild)
      }
      let resultado = document.createElement('p')
      resultado.textContent = cajero.retirarEfectivo(Number(input.value))
      c[1].appendChild(resultado)
      input.value = ''
    })
    clickVisible()
  }
  // funcion especifica para mostrar el contenido de la operacion "depositar"
  const operacionDepositar = () => {
    const c = pantallaOperacion.children
    retirarChildren(c)
    let p = document.createElement('p')
    p.textContent = depositar.innerHTML
    c[0].appendChild(p)

    let instruccion = document.createElement('p')
    instruccion.textContent = 'Ingrese la cantidad que desea depositar:'
    c[1].appendChild(instruccion)

    let input = document.createElement('input')
    input.setAttribute('input', 'number')
    input.setAttribute('placeholder', 'Ingrese cantidad a depositar')
    input.setAttribute('min', 1)
    c[1].appendChild(input)

    let confirmar = document.createElement('button')
    confirmar.setAttribute('class', 'boton-confirmar')
    confirmar.innerHTML = 'Confirmar'
    c[1].appendChild(confirmar)

    confirmar.addEventListener('click', function(){
      if(c[1].children.length >= 4) {
        c[1].children.removeChild(c[1].children.lastChild)
      }
      let resultado = document.createElement('p')
      resultado.textContent = cajero.depositarEfectivo(Number(input.value))
      c[1].appendChild(resultado)
      input.value = ''
    })
    clickVisible()
  }

  // funcion para quitar cualquier contenido que haya quedado en euna operacion pasada
  const retirarChildren = (children) => {
    if (children[0].firstChild) {
      children[0].textContent = ''
    }
    if (children[1].firstChild) {
      children[1].textContent = ''
    }
  }

  // agregar los eventListeners correspondientes a cada boton

  consultar.addEventListener('click', operacionConsultar)
  retirar.addEventListener('click', operacionRetirar)
  depositar.addEventListener('click', operacionDepositar)


  // confirmar.addEventListener('click', )

  cancelar.addEventListener('click', clickInvisible)


})();
