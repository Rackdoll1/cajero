(function () {
  // leer los inputs, pantalla de acceso a una cuenta
  const nDeCuenta= document.getElementById('nDeCuenta')
  const pin = document.getElementById('pin')
  const btnGuardar= document.getElementById('guardar')

  // mantener referencia de pantalla de inicio y ventana de operaciones para mostrarlas/ocultarlas según corrresponda
  const pantallaDeInicio = document.getElementById('div-body')
  const pantallaOperacion = document.getElementById('operacion-en-curso')

  // segunda pantalla, botones de operaciones una vez se ha ingresado a una cuenta
  const consultar = document.getElementById('consultar')
  const retirar = document.getElementById('retirar')
  const depositar = document.getElementById('depositar')
  const transferir = document.getElementById('transferir')
  const pagar = document.getElementById('pagar')
  const salir = document.getElementById('salir')

  const cancelar = document.getElementById('boton-cancelar')

  // -----------------------------------------> clase Usuario <-------------------------------------
  class Usuario {
    constructor(nombre,password,numeroDeCuenta,saldo){
    this.nombre = nombre;
    this.password = password;
    this.numeroDeCuenta = numeroDeCuenta;
    this.saldo = saldo;
    }
  }

  // -----------------------------------------> clase Cajero <----------------------------------------

  // el constructor crea una propiedad en el objeto cajero donde se guardará
  // la informacion del usuario que haya accedido a su cuenta
  class Cajero {
    constructor() {
      this.cuenta = null
    }

    // funcion para que el cajero obtenga la informacion del usuario y pueda operar con ella
    agregarUsuario(cuenta) {
      this.cuenta = cuenta
    }

    // las operaciones del cajero son funciones que regresan un string que contiene
    // el resultado de la operacion solicitada para poderlo agregarlo a un elemento
    // HTML y posteriormente mostrarlo en pantalla
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
      }else if (numeroDeCuenta === '' || cantidad === 0){
        return 'Datos incorrectos'
      }
      else {
        this.cuenta.saldo -= cantidad
        return `Se transfirió la cantidad de $${cantidad} a la cuenta "${numeroDeCuenta}"`
      }
    }
  }

  // creacion de objeto cajero, en "espera" de recibir información de una cuenta de usuario validada
  const cajero = new Cajero()

  // usuarios de prueba
  const usuario1 = new Usuario("ANDRES", 1234, 9550001, 2000)
  const usuario2 = new Usuario("YANN", 5678, 9550002, 3000)

  // agregar usuarios de prueba a un arreglo para simular una "base datos" y generalizar el proceso de validacion
  const baseDeDatos = [usuario1, usuario2]


  // ---------------------------------> Funciones utiles <------------------------------------------

  // funcion para eliminar los inputs previamente ingresados y dejarlos listos para un nuevo inicio de sesiónote
  const limpiarInputs = () => {
    nDeCuenta.value = ''
    pin.value = ''
  }

  // funcion para validar formulario lleno
  const validarFormularioLleno = (numberOfAccount, pass) => {
    if(numberOfAccount==='' || pass==='') {
      return false
    } else {
      return true
    }
  }

  // funcion para validar ingreso de usuario
  const validarUsuario = (numberOfAccount, pass) => {
    // se usa la funcion .find() de Array para buscar en un arreglo el elemento que cumpla con las condiciones proporcionadas
    // en este caso, que devuelva el elemento cuyo numero de cuenta y password coincidan con la informacion ingresada
    let usuarioEncontrado = baseDeDatos.find(usuario => usuario.numeroDeCuenta === Number(numberOfAccount) && usuario.password === Number(pass))
    // si el usuario devuelto es diferente al valor "undefined", es decir, que efectivamente se encontró un usuario con
    // esa informacion, se agrega al cajero para operar con sus datos
    if(usuarioEncontrado !== undefined) {
      cajero.agregarUsuario(usuarioEncontrado)
      return true
    }
    return false
  }

  // lo que va hacer mi btn despues de click
  const clickEnGuardar = () => {

    var x= validarFormularioLleno(nDeCuenta.value, pin.value)

    if(x) {
      //AHORA SI EMPIEZO MI VALIDACION
      if(validarUsuario(nDeCuenta.value, pin.value)) {
        alert('Ingreso exitoso')

        //aqui entra mi otra interfaz
        // ocultar pantalla de inicio
        pantallaDeInicio.style.display = 'none'
        // preparar el texto de bienvenida
        let bienvenida = document.getElementById('bienvenida')
        // el cajero contiene la informacion de la cuenta que se validó, entonces accedo a su
        // propiedad cuenta y a la vez a la propiedad nombre de esa cuenta
        bienvenida.innerHTML = `Hola ${cajero.cuenta.nombre}`
        // elimino los valores ingresados anteriormente, para que puedan ingresarse nuevos en
        // un nuevo inicio de sesión
        limpiarInputs()
      }
      else {
        alert('Datos incorrectos');
        // en un intento fallido, se eliminan los datos en pantalla previamente ingresados
        limpiarInputs()
      }
    }
    else {
      alert('Completa tus datos');
    }
  }

  // boton para realizar el acceso a la cuenta
  btnGuardar.addEventListener('click', clickEnGuardar)




  // -----------------------------> Interfaz de operaciones del cajero <------------------------------

  // crear función para mostrar el cuadro con la operacion en curso
  const clickVisible = () => {
    pantallaOperacion.classList.remove('hide')
  }
  // función para ocultar la pantalla de operacion en curso
  const clickInvisible = () => {
    pantallaOperacion.classList.add('hide')
  }
  // funcion para salir del cajero
  const operacionSalir = () => {
    pantallaDeInicio.style.display = 'flex'
  }

  // funcion para quitar cualquier contenido que haya quedado en una operacion pasada
  // el argumento children que reciebe es un arreglo que contiene los elementos interiores de un elemento padre
  const retirarChildren = (children) => {
    // los hijos son el contenido de cada elemento en el HTML, en este caso lo uso
    // para el contenido de cada "div" en la ventana de operación en curso

    // si existe algún contenido dentro de cada hijo, se elimina al cambiar su contenido a '' (cadena vacía)
    if (children[0].firstChild) {
      children[0].textContent = ''
    }
    if (children[1].firstChild) {
      children[1].textContent = ''
    }
  }

  // funcion para preparar el contenido de la pantalla de operacion antes de poder mostrarla en pantalla
  const prepararVentanaOperacion = () => {
    // obtengo los elementos hijos de la pantalla de operacion en forma de arreglo
    const c = pantallaOperacion.children
    retirarChildren(c)
    // creo un elemento parrafo para agregar el nombre de la operacion
    let p = document.createElement('p')
    p.textContent = consultar.innerHTML // ---> el interior de consultar es el nombre de la misma operacion

    // este elemento párrafo lo agrego como hijo en la primera posición del arreglo de hijos, que corresponde
    // al primer div interior de la pantalla de operacion
    c[0].appendChild(p) // ---> c[0] equivale al primer div dentro de pantalla operacion

    // regreso el arreglo de elementos para seguirlo modificando de acuerdo a cada operacion específica del cajero
    return c
  }

  // funcion especifica para mostrar el contenido de la operacion "consultar"
  const operacionConsultar = () => {
    const c = prepararVentanaOperacion()

    // el resto del contenido de cada operacion se anexará como hijos del elemento en la segunda posición del arreglo de hijos,
    // es decir, el segundo div de la pantalla operacion

    // creo y anexo un nuevo elemento parrafo con el resultado de la operacion solicitada
    let resultado = document.createElement('p')
    resultado.textContent = cajero.consultarSaldo()
    c[1].appendChild(resultado)
    // ya que prepraré el elemento con la información necesaria, lo hago visible en pantalla
    clickVisible()
  }

  // funcion especifica para mostrar el contenido de la operacion "retirar"
  const operacionRetirar = () => {
    const c = prepararVentanaOperacion()

    // crear y anexar nuevo elemento parrafo para mostrar las instrucciones de esta operacion
    let instruccion = document.createElement('p')
    instruccion.textContent = 'Ingrese la cantidad que desea retirar:'
    c[1].appendChild(instruccion)

    // crear y anexar elemento input para que el usuario realice operacion
    let input = document.createElement('input')
    // para definir los atributos correspondientes a este elemento input
    input.setAttribute('type', 'number')
    input.setAttribute('placeholder', 'Cantidad a retirar')
    input.setAttribute('min', 1)
    c[1].appendChild(input)

    // se crea boton para confirmar los datos necesarios para realizar esta operacion
    let confirmar = document.createElement('button')
    // una manera de agregar clases de CSS a un elemento diferente a .classList.add("")
    // es definiendo su atributo con la clase correspondiente
    confirmar.setAttribute('class', 'boton-confirmar')
    confirmar.innerHTML = 'Confirmar'
    c[1].appendChild(confirmar)

    // el boton de confirmar que se agrega a cada operacion llama a una función específica, la que
    // le corresponda a su nombre: operacion retirar llama a la funcion retirar, etc
    confirmar.addEventListener('click', function(){
      // si ya hay un tag p con un resultado anterior, se elimina.
      // Esto permite realizar la misma operación multiples veces seguidas en la misma pantalla de operacion
      // sin necesidad de salirse y volver a elegir la misma operacion
      if(c[1].children.length > 3) {
        c[1].removeChild(c[1].lastChild)
      }
      let resultado = document.createElement('p')
      // aqui se almacena el resultado de la funcion correspondiente a cada operacion del cajero y se agrega
      // a la pantalla operacion para mostrarlo al usuario
      resultado.textContent = cajero.retirarEfectivo(Number(input.value))
      c[1].appendChild(resultado)
      // se elimina el contenido anterior del input por si el usuario requiere realizar nuevamente la operación
      input.value = ''
    })
    clickVisible()
  }
  // funcion especifica para mostrar el contenido de la operacion "depositar"
  const operacionDepositar = () => {

    const c = prepararVentanaOperacion()

    let instruccion = document.createElement('p')
    instruccion.textContent = 'Ingrese la cantidad que desea depositar:'
    c[1].appendChild(instruccion)

    let input = document.createElement('input')
    input.setAttribute('type', 'number')
    input.setAttribute('placeholder', 'Cantidad a depositar')
    input.setAttribute('min', 1)
    c[1].appendChild(input)

    let confirmar = document.createElement('button')
    confirmar.setAttribute('class', 'boton-confirmar')
    confirmar.innerHTML = 'Confirmar'
    c[1].appendChild(confirmar)

    confirmar.addEventListener('click', function(){
      if(c[1].children.length > 3) {
        c[1].removeChild(c[1].lastChild)
      }
      let resultado = document.createElement('p')
      resultado.textContent = cajero.depositarEfectivo(Number(input.value))
      c[1].appendChild(resultado)
      input.value = ''
    })
    clickVisible()
  }

  // funcion especifica para mostrar el contenido de la operacion "transferir"
  const operacionTransferir = () => {

    const c = prepararVentanaOperacion()

    let instruccion = document.createElement('p')
    instruccion.setAttribute('class', 'center-text')
    instruccion.textContent = 'Ingrese cantidad y numero de cuenta para transferir:'
    c[1].appendChild(instruccion)

    let input = document.createElement('input')
    input.setAttribute('type', 'number')
    input.setAttribute('placeholder', 'Cantidad a transferir')
    input.setAttribute('min', 1)
    c[1].appendChild(input)

    let input2 = document.createElement('input')
    input2.setAttribute('type', 'number')
    input2.setAttribute('placeholder', 'Numero de cuenta')
    c[1].appendChild(input2)

    let confirmar = document.createElement('button')
    confirmar.setAttribute('class', 'boton-confirmar')
    confirmar.innerHTML = 'Confirmar'
    c[1].appendChild(confirmar)

    confirmar.addEventListener('click', function(){
      if(c[1].children.length > 4) {
        c[1].removeChild(c[1].lastChild)
      }
      let resultado = document.createElement('p')
      resultado.setAttribute('class', 'center-text')
      resultado.textContent = cajero.realizarTransferencia(Number(input.value), input2.value)
      c[1].appendChild(resultado)
      input.value = ''
      input2.value = ''
    })
    clickVisible()
  }

  // funcion especifica para mostrar el contenido de la operacion "pagar"
  const operacionPagar = () => {

    const c = prepararVentanaOperacion()

    let instruccion = document.createElement('p')
    instruccion.setAttribute('class', 'center-text')
    instruccion.textContent = 'Ingrese la cantidad y el servicio a pagar:'
    c[1].appendChild(instruccion)

    let input = document.createElement('input')
    input.setAttribute('type', 'number')
    input.setAttribute('placeholder', 'Cantidad a pagar')
    input.setAttribute('min', 1)
    c[1].appendChild(input)

    let input2 = document.createElement('input')
    input2.setAttribute('type', 'number')
    input2.setAttribute('placeholder', 'Servicio a pagar')
    c[1].appendChild(input2)

    let confirmar = document.createElement('button')
    confirmar.setAttribute('class', 'boton-confirmar')
    confirmar.innerHTML = 'Confirmar'
    c[1].appendChild(confirmar)

    confirmar.addEventListener('click', function(){
      if(c[1].children.length > 4) {
        c[1].removeChild(c[1].lastChild)
      }
      let resultado = document.createElement('p')
      resultado.setAttribute('class', 'center-text')
      resultado.textContent = cajero.realizarTransferencia(Number(input.value), input2.value)
      c[1].appendChild(resultado)
      input.value = ''
      input2.value = ''
    })
    clickVisible()
  }


  // agregar los eventListeners correspondientes a cada boton
  consultar.addEventListener('click', operacionConsultar)
  retirar.addEventListener('click', operacionRetirar)
  depositar.addEventListener('click', operacionDepositar)
  transferir.addEventListener('click', operacionTransferir)
  pagar.addEventListener('click', operacionPagar)
  salir.addEventListener('click', operacionSalir)


  // confirmar.addEventListener('click', )

  cancelar.addEventListener('click', clickInvisible)


})();
