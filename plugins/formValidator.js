const evalLogin = (payload) => {
    let result = {
        valid: true,
        error: ''
    },
        user = validateEmail(payload.user),
        pass = payload.pass !== null && payload.pass.length >= 6


    result.valid = user && pass
    if( !user || !pass) {
        if( !user && !pass) {
            result.error = 'Ingrese un correo y contraseña validos'
        } else {
            if(!user) {
                result.error = 'Correo invalido'
            } else if(!pass) {
                result.error = 'Contraseña invalida'
            }
        } 
    }

    return result
}

const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export { 
	evalLogin
}