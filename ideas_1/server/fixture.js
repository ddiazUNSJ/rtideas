if (Roles.find().count() === 0) 
{
  
  Roles.insert({
    nombre: 'Administrador',    
  });
  
  Roles.insert({
    nombre: 'Animador', 
  });

  Roles.insert({
    nombre: 'Participante', 
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
    nombre: 'editar mis Idea',    
    descripcion: 'puedo editar mis Idea en DEBATE en base a los comentarios',
  });

   Instancia.insert({
    numero: 4,
    nombre: 'votar ideas en debate',    
    descripcion: 'nuevamente debe votar las ideas en debate',
  });

   Instancia.insert({
    numero: 5,
    nombre: 'compartir ideas aceptadas',    
    descripcion: 'muestra listado de las ideas aceptadas, el propietario puede compartir',
  });

    Instancia.insert({
    numero: 6,
    nombre: 'votar ideas en debate',    
    descripcion: 'nuevamente debe votar las ideas en debate',
  });
  

 }


if (Inscripcion.find().count() === 0) 
{
  
  Inscripcion.insert({
    sesion_id: '1234',    
    user_id: '1234'    
  });
  


 }

