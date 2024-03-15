const { Router } = require ('express');
const router = Router();
const _= require('underscore');

const pokemon = require ('./sample.json');

router.get ('/pokemon', (req, res) => {
    res.json(pokemon);
});
router.post('/pokemon',(req, res) =>{
    const {Nombre_pokemon, informacion,Categoria,Altura,Tipo } = req.body //obtener los valortes que esta recibiendo desde postman 
    if(Nombre_pokemon && informacion && Categoria && Altura && Tipo ) {
      const id =  pokemon.length + 1;
      const pookemon_nuevo ={...req.body,id};
      pokemon.push(pookemon_nuevo);// se guarda el pokemon dentro del arreglo 
      res.json(pokemon);
    } //para comprobar si se esta recibiendo los datos correctamente
    else{
        res.send('error de peticion');
    }
   
});

router.put('/pokemon/:id',(req, res) =>{
    const {id} = req.params;
    const {Nombre_pokemon, informacion,Categoria,Altura,Tipo } = req.body;
    if(Nombre_pokemon && informacion && Categoria && Altura && Tipo){
        _.each(pokemon,(pokemon1,i) =>{
        if (pokemon1.id == id ){
            pokemon1.Nombre_pokemon = Nombre_pokemon;
            pokemon1.informacion = informacion;
            pokemon1.Categoria = Categoria;
            pokemon1.Altura = Altura;
            pokemon1.Tipo = Tipo;
        }
        });
        res.json(pokemon);
    }else{
        res.status(500).json({error: 'Se ha generado un error'});
    }
}
)

router.delete('/pokemon/:id',(req, res) =>{
    const { id } = req.params;
    _.each(pokemon,(pokemon1,i) =>{
      if(pokemon1.id == id){
        pokemon.splice(i, 1);
      }
    });//arreglo para recorrer un pokemon y poder eliminar el id obtenido desde la url
   res.send(pokemon);
})

module.exports = router;