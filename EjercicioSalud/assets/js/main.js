function Consultorio(nombre, paciente){
    this._nombre = function(){
        return nombre;
    }

    this._paciente = function(){
         return paciente || [];
    }
}

Consultorio.prototype.getName = function(){
    this._nombre = _nombre()
}

Consultorio.prototype.setName = function(nuevoNombre){
    this._nombre = function(){
        return nuevoNombre;
    }
}

Consultorio.prototype.agregarPaciente = function(paciente){
    this.paciente.push(paciente);
}



