const validate = (data) => {

    let errors = {}
    if (!/^[a-zA-Z]+$/.test(data.name)) {
        errors.name = 'Tu pokemon no puede tener numeros en el nombre '
    }
    if (!data.name) {
        errors.name = 'Ingresa el nombre de tu pokemon'
    }
    if(!data.imagen){
        errors.imagen = 'Ingresa el URL de la imagen'
    }

    if(!data.altura){
        errors.altura = 'Ingresa el URL de la altura'
    }

    if(data.altura < 1) {
        errors.altura = 'La altura debe ser mayor a 1'
    }

    if(!data.peso){
        errors.peso = 'Ingresa el URL de la peso'
    }

    if(data.peso < 1) {
        errors.peso = 'El peso debe ser mayor a 1'
    }
    
    if(data.types.length === 0) {
        errors.types = 'Selecciona uno o dos tipos'
    }
    return errors

}

export default validate;