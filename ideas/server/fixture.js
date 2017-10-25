if (Roles.find().count() === 0) 
{
  Roles.insert({
    nombre: 'Administrador',    
  });
  
  Roles.insert({
    nombre: 'Estandar', 
  });
}

if (SubRoles.find().count() === 0) 
{
  SubRoles.insert({
    nombre: 'Animador',    
    rol: 'Estandar', 
  });
  
  SubRoles.insert({
    nombre: 'Participante',
    rol: 'Estandar',  
  });
}


if (Instancia.find().count() === 0) 
{
  
  Instancia.insert({
    numero: 1,
    nombre: 'Tirar Ideas',   
    descripcion: 'puedo tirar ideas asdflsdk', 
  });
  
  Instancia.insert({
    numero: 2,
    nombre: 'Votar y Comentas Ideas',   
    descripcion: 'puedo votar y comentar las ideas de los demas',  
  });

  Instancia.insert({
    numero: 3,
    nombre: 'Editar Ideas en Debate',    
    descripcion: 'puedo editar mis Idea en DEBATE en base a los comentarios',
  });

  Instancia.insert({
    numero: 4,
    nombre: 'Votar ideas en debate',    
    descripcion: 'nuevamente debe votar las ideas en debate',
  });

  Instancia.insert({
    numero: 5,
    nombre: 'Compartir ideas aceptadas',    
    descripcion: 'muestra listado de las ideas aceptadas, el propietario puede compartir',
  });

  Instancia.insert({
    numero: 6,
    nombre: 'Comentar ideas compartidas',    
    descripcion: '',
  });

  Instancia.insert({
    numero: 7,
    nombre: 'Editar ideas compartidas',    
    descripcion: 'nuevamente debe votar las ideas en debate',
  });

  Instancia.insert({
    numero: 8,
    nombre: 'Llenar ficha de ideas',    
    descripcion: 'nuevamente debe votar las ideas en debate',
  });
  

}


/*if (Inscripcion.find().count() === 0) 
{
  
  Inscripcion.insert({
    sesion_id: '1234',    
    user_id: '1234'    
  });

}

if (Users_sesions.find().count() === 0) 
{
  
  Users_sesions.insert({
    iduser: '1234',
    idsesion: '1234', 
    idgrupo: '1234',  
    rol: 'Participante', 
     
  });

}*/

