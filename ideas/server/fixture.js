if (Roles.find().count() === 0) 
{
  
  Roles.insert({
    nombre: 'Administrador',    
  });
  
  Roles.insert({
    nombre: 'Participante', 
  });

  Roles.insert({
    nombre: 'Animador', 
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
    user_id: 'RJ2F3kidhuvQH99j9',    
    sesion_id: 'rh5W6KB5trJLM4HSQ'
  });
  
  Inscripcion.insert({
     user_id: 'RJ2F3kidhuvQH99j9',    
    sesion_id:'rh5W6KB5trJLM4HSQ', 
  });

  

 }

