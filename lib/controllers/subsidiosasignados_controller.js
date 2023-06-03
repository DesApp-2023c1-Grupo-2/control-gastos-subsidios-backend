import Rubros from "../models/rubros";
import SubsidiosAsignados from "../models/subsidiosasignados";

// getAllSubsidiosAsignados: devuelve todos las rubros desde API/subsidiosasignados/buscartodos/
export const getAllSubsidiosAsignados = async (req, res) => {
    const subsidiosAsignadosEncontrados = await SubsidiosAsignados.findAll({
        attributes: ['id','idProyecto','idRubro','montoAsignado'], // aqui seleccionamos los atributos a mostrar por cada registro
        //include: [{as: 'Rubro', model: Rubros, attributes:['nombre']}]
    });
    res.json({
      data: subsidiosAsignadosEncontrados.map((subsidio) => subsidio.toJSON()),
    });
  };

// getIdSubsidio: busca el subsidio mediante el Id
export const getIdSubsidio = async (req, res) => {
    const subsidioEncontrado = await SubsidiosAsignados.findOne({
      where: { id: req.params.id },
    });
    res.json(subsidioEncontrado);
};

// getTotalSubsidios: busca mediante Id, desde la API/subsidiosasignados/totaldelproyecto/:id
export const getTotalSubsidios = async (req, res) => {
  const subsidiosEncontrados = await SubsidiosAsignados.findAll({
    where: { idProyecto: req.params.id }, //filtra los subsidios x el id del proyecto pasado
    attributes: ['montoAsignado'], // solo trae el monto asignado de los subsidios
  }); // devuelve el total de los subsidios del proyecto
  var total = 0
  subsidiosEncontrados.forEach(subsidio => total = subsidio.montoAsignado + total )
  res.json(total); // esta tardo 7.639 ms 
  //const valorInicial = 0;
  //const totalSubsidios = subsidiosEncontrados.reduce( (acumulador,subsidio) => acumulador + subsidio.montoAsignado, valorInicial );
  //res.json(totalSubsidios); // esta tardo 41.851 ms 

};  

// getTotalSubsidios: busca mediante Id, desde la API/subsidiosasignados/delproyecto/:id
export const getSubsidios = async (req, res) => {
  const subsidiosEncontrados = await SubsidiosAsignados.findAll({
    where: { idProyecto: req.params.id }, //filtra los rubros x el id del proyecto pasado
    attributes: ['idRubro','montoAsignado'], // solo trae el rubro y monto asignado de los subsidios
  });
  res.json(subsidiosEncontrados);
}; 

// getSubsidiosXproyectoXrubro: buscar el idProyecto y el idRubro, desde la API/subsidiosAsignados/xproyectoxrubro/1/3
export const getSubsidiosXproyectoXrubro = async (req, res) => {
  const subsidioEncontrado = await SubsidiosAsignados.findOne({
    where: {
    idProyecto: parseInt(req.params.idProyecto),
    idRubro: parseInt(req.params.idRubro)
    }, //
  });
  res.json(subsidioEncontrado);
}

// postSubsidios: crean un subsidioAsignado, recibiendo idProyecto, idRubro y montoAsignado
export const postSubsidios = (req, res) => {
  /*
  const subsidioNuevo = {
  idProyecto: parseInt(req.params.idProyecto),
  idRubro: parseInt(req.params.idRubro),
  montoAsignado: parseFloat(req.params.montoAsignado)
  }
  res.status(200).send(console.log(subsidioNuevo.montoAsignado))
  */
  
  SubsidiosAsignados.create({
    idProyecto: parseInt(req.params.idProyecto),
    idRubro: parseInt(req.params.idRubro),
    montoAsignado: parseFloat(req.params.montoAsignado),
    createdAt: new Date(),
    updatedAt: new Date(),
    })
      .then((subsidio) => res.status(201).send({ nombre: subsidio.id })) // devuelve el id del subsidio creado
      .catch((error) => {
        if (error.message) {
        res.status(404).send('Bad request');
        } else {
          res.status(500).send({
          message: 'Serivice error',
          errorType: error.name,
          errorImage: 'https://http.cat/500',
          });
        }
    });
  };
  