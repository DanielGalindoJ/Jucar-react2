
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';
import logoJucar from "./src/assets/img/logoJucar.jpg"
//import DataTable from 'datatables.net-dt';
//import "../assets/css/autopats.css;"

const ShowAutoparts = () => {
  const url = 'https://localhost:7028/api/autoparts/'; // https://localhost:7028/api/autoparts 
  const urlSubCa=`https://localhost:7028/api/subCategories/subCategoryId/autopats` //Todas las Autopartes de una Subcategoria:
  const [autopartID,setAutopartId] = useState('')
  const URL = `${url}/${autopartID}`; // Autoparte Por Id:
  const [autoparts,setAutoparts] = useState([])
  const [name,setName] = useState('')
  const [description,setDescription] = useState('')
  const [weightKgs,setWeightKgs] = useState('')
  const [heightCm,setHeightCm] = useState('')
  const [lengthCm,setLengthCm] = useState('')
  const [vehicleZone,setVehicleZone] = useState('')
  const [idToEdit, SetidToEdit] = useState(null);
  const [subCategories, setSubCategories] = useState('');
  const [subCategoryId,setSubCategoryId] = useState('')
  const [operation,setOpertaion]=useState([1])
  const [title, setTitle] = useState('');

  useEffect(() => {
    getAutoparts();
    getSubCategory();
  }, );

  const getAutoparts = async () => {
    const respuesta = await axios.get(url);
    setAutoparts(respuesta.data);
  };
  const getSubCategory = async () => {
    const respuestaSub = await axios.get(urlSubCa);
    getSubCategory(respuestaSub.data);
  };

  const openModal = (op, name,description,weightKgs,heightCm,lengthCm,vehicleZone,autopartID,   subCategoryId) => {
    setSubCategoryId('')
    setAutopartId('')
    setName('')
    setDescription('')
    setWeightKgs('')
    setHeightCm('')
    setLengthCm('')
    setVehicleZone('')
    setOpertaion(op);


    if (op === 1) {
      setTitle('Registrar Autoparte');
      setName('')
      setDescription('')
      setWeightKgs('')
      setHeightCm('')
      setLengthCm('')
      setVehicleZone('')
      setSubCategoryId('')
    } else if (op === 2) {
      setTitle('Editar Autoparte');
      setAutopartId(autopartID)
      setName(name);
      setDescription(description)
      setWeightKgs(weightKgs)
      setHeightCm(heightCm)
      setLengthCm(lengthCm)
      setVehicleZone(vehicleZone)
      setSubCategoryId(subCategoryId)
      SetidToEdit(autopartID);

    }
    window.setTimeout(function () {
      document.getElementById('name').focus();
    }, 500);
  };

  const validar = (autopartID) => {
    console.log("Validar función ejecutada"); // Mensaje de depuración
    var parametros;
    var metodo;
    if (name === ''){
        show_alerta('Escribe el nombre del autoparte.', 'warning');
    }
      else if(description === ''){
        show_alerta ('Escribe la descripcion del autoparte', 'warning');
    }
    else if(weightKgs === ''){
      show_alerta('Escribe el ancho del autoparte', 'warning');
    
    }else if(heightCm === ''){
      show_alerta('Escribe la Altura del autoparte', 'warning');
    
    }else if(lengthCm === ''){
      show_alerta('Escribe la longitud del autoparte', 'warning');
    
     }else if(vehicleZone === ''){
       show_alerta('Escribe la Zona del Vehiculo del autoparte', 'warning');
    
     }
    
    else 
    {
      if (operation === 1) {
        parametros = {
          name: name,
          description: description,
          weightKgs: weightKgs,
          heightCm: heightCm,
          lengthCm: lengthCm,
          vehicleZone: vehicleZone,
          subCategoryId: subCategoryId
        };
        metodo = 'POST';
      } else {
        parametros = {
          name: name,
          description: description,
          weightKgs: weightKgs,
          heightCm: heightCm,
          lengthCm: lengthCm,
          vehicleZone: vehicleZone,
          subCategoryId: subCategoryId
        };
        metodo = 'PUT';
      }
      enviarSolicitud(metodo, parametros,autopartID);
      
    }
  };

  const enviarSolicitud = async (metodo,parametros, autopartID) => {
    if (metodo === "POST") {
      axios
        .post(`${URL}`, parametros)
        .then(function (respuesta) {
          show_alerta("success", "Autoparte creado");
          document.getElementById("btnCerrar").click();
          getAutoparts();
        })
        .catch(function (error) {
          show_alerta("error", "Error de solucitud");
          console.log(error);
        });
    } else if (metodo === "PUT") {
      axios
        .put(`${URL}${autopartID}`, parametros)
        .then(function (respuesta) {
          console.log("Solicitud PUT exitosa:", respuesta.data);
          // var tipo = respuesta.data[0];
          // var msj = respuesta.data[1];
          show_alerta("success", "autoparte editado con exito");
          document.getElementById("btnCerrar").click();
          getAutoparts();
        })
        .catch(function (error) {
          show_alerta("error", "El autoparte no se edito");
          console.log(error);
        });
    }
  };

  const deleteAutopart = (autopartID, name) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "¿Seguro quieres eliminar el autoparte " + name + "?",
      icon: "question",
      text: "No se podra dar marcha atras",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      console.log(autopartID);
      if (result.isConfirmed) {
        try {
          console.log(`${URL}/${autopartID}`);
          await axios.delete(`${URL}${autopartID}`);
          show_alerta("success", "Usuario eliminado exitosamente");
          getAutoparts();
        } catch (error) {
          console.log(`${URL}/${autopartID}`);
          show_alerta("error", "Error al eliminar el producto");
          console.error(error);
        }
      } else {
        show_alerta("info", "El producto no fue eliminado");
      }
    });
  };
  return (
    <div classNameName='App'>


      <nav className="navbar navbar-expand-md py-3 navbar-light" style={{ color: ' #e73d4a', background: ' var() { } }--} bs-danger ',borderBottomcolor:' var(--bs-gray-500)'}}>
      <div className="container"><img src={logoJucar} alt='logoJucar' width="182" height="116" /><a className= ''navbar-brand d-flex align-items-center ></a><button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-1"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
        <div id="navcol-1" className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"></li>
            <li className="nav-item"></li>
            <li className="nav-item"><span style={{ textAlign:'center' , paddingTop: '0px', paddingBottom: '5px', marginTop: ' 2px;', fontSize: '30px', fontFamily: 'Alatsi, sans-serif', color: 'var(--bs-white)', fontWeight: 'bold', paddingLeft: '0px', paddingRight: '55px', marginLeft: '18px', marginRight: '-24px' }}>AUTOPARTES JUCAR SAS </span></li>
          </ul>
        </div>
      </div>
    </nav><div classNameName='container-fluid'>
        <div classNameName='row mt-3'>
          <div classNameName='col-md-4 offset-4'>
            <div classNameName='d-grid mx-auto'>
              <button onClick={() => openModal(1)} classNameName='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalAutoparts'>
                <i classNameName='fa-solid fa-circle-plus'></i> Añadir
              </button>
            </div>
          </div>
        </div>
        <div classNameName='row mt-3'>
          <div classNameName='col-12 col-lg-8 offset-0 offset-lg-12'>
            <div classNameName='table-responsive'>
              <table classNameName='table table-bordered'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>SubCategoria</th>
                    <th>Nombre</th>
                    <th>Description</th>
                    <th>WeightKgs</th>
                    <th>HeightCm</th>
                    <th>LengthCm</th>
                    <th>Zona del Vehiculo</th>
                    <th>Estado</th>
                    <th>Fecha de Creacion</th>
                    <th>Fecha de Modificacion</th>

                  </tr>
                </thead>
                <tbody classNameName='table-group-divider'>
                  {console.log(autoparts)}
                  {console.log(subCategories)}
                  {autoparts.map((autoparts, i) => (
                    <tr key={autoparts.autopartID}>
                      <td>{i + 1}</td>
                      <td>{subCategories.name}</td>
                      <td>{autoparts.name}</td>
                      <td>{autoparts.description}</td>
                      <td>{autoparts.weightKgs}</td>
                      <td>{autoparts.heightCm}</td>
                      <td>{autoparts.lengthCm}</td>
                      <td>{autoparts.vehicleZone}</td>
                      <td>{autoparts.state}</td>
                      <td>{autoparts.creationDate}</td>
                      <td>{autoparts.modificationDate}</td>
                      <td>
                        <button
                          onClick={() => openModal(2, autoparts.name,
                            autoparts.description,
                            autoparts.weightKgs,
                            autoparts.heightCm,
                            autoparts.lengthCm,
                            autoparts.vehicleZone,
                            autoparts.state,
                            autoparts.creationDate,
                            autoparts.modModificationDate)}
                          classNameName='btn btn-warning'
                          data-bs-toggle='modal'
                          data-bs-target='#modalAutoparts'
                        >
                          <i classNameName='fa-solid fa-edit'></i>
                        </button>
                        &nbsp;

                        <button onClick={() => deleteAutopart(autoparts.autopartID, autoparts.name)} classNameName="btn btn-danger">
                          <i classNameName="fa-solid fa-trash"></i>
                        </button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>



              <footer classNameName='footPieD' className="text-center bg-dark" style={{ borderColor: 'var(--bs-red)' }}>
                <div classNameName='divPieD' className="container text-white py-4 py-lg-5" style={{ width: '1305px' }}>
                  <ul className="list-inline">
                    <li className="list-inline-item"></li>
                  </ul>
                  <p classNameName='P1Foo' style={{ fontSize: '35px', fontfamily: 'Alatsi, sans-serif', textalign: 'center' }}>Derechos reservados Jucar S.A.S</p>
                  <p classNameName='P2Foo' style={{ fontSize: '27px', fontfamily: 'Alatsi, sans-serif', textAlign: 'center', width: '1239px', height: '28.5px', margin: '3px' }}>Calle 7 #90-76</p>
                  <ul classNameName='ulFott' className="list-inline" style={{ width: '1250px', height: '57px', margin: '2px', padding: '0px' }}>
                    <li classNameName='L1Foo' className="list-inline-item me-4"><svg className="bi bi-facebook text-light" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" style={{ fontSize: '36px', fontweight: 'bold', width: '36px', margin: '-5px' }}>
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path>
                    </svg></li>
                    <li classNameName='li1F' className="list-inline-item me-4" style={{ fontsize: '37px' }}><svg className="bi bi-twitter text-light" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                    </svg></li>
                    <li classNameName='li2F' className="list-inline-item"><svg className="bi bi-instagram text-light" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" style={{ fontSize: ' 36px' }}>
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                    </svg></li>
                  </ul>
                </div>
              </footer>



            </div>
          </div>
        </div>
      </div><div id='modalAutoparts' classNameName='modal fade' aria-hidden='true'>
        <div classNameName='modal-dialog'>
          <div classNameName='modal-content'>
            <div classNameName='modal-header'>
              <label classNameName='h5'>{title}</label>
              <button type='button' classNameName='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div classNameName='modal-body'>
              <input type='hidden' id='id'></input>

              <div classNameName='input-group mb-3'>
                <span classNameName='input-group-text'>
                  <i classNameName='fa fa-user'></i>
                </span>
                <input
                  type='text'
                  id='name'
                  classNameName='form-control'
                  placeholder='Nombre Autoparte'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div classNameName='input-group mb-3'>
                <span classNameName='input-group-text'>
                  <i classNameName='fa fa-user'></i>
                </span>
                <input
                  type='text'
                  id='description'
                  classNameName='form-control'
                  placeholder='Descripcion'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </div>
              <div classNameName='input-group mb-3'>
                <span classNameName='input-group-text'>
                  <i classNameName='fa fa-user'></i>
                </span>
                <input
                  type='text'
                  id='peso'
                  classNameName='form-control'
                  placeholder='peso'
                  value={weightKgs}
                  onChange={(e) => setWeightKgs(e.target.value)}
                ></input>
              </div>
              <div classNameName='input-group mb-3'>
                <span classNameName='input-group-text'>
                  <i classNameName='fa-solid fa-gift'></i>
                </span>
                <input
                  type='text'
                  id='largo'
                  classNameName='form-control'
                  placeholder='largo'
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                ></input>
              </div>
              <div classNameName='input-group mb-3'>
                <span classNameName='input-group-text'>
                  <i classNameName='fa-solid fa-gift'></i>
                </span>
                <input
                  type='text'
                  id='ancho'
                  classNameName='form-control'
                  placeholder='ancho'
                  value={lengthCm}
                  onChange={(e) => setLengthCm(e.target.value)}
                ></input>
              </div>

              <div classNameName='input-group mb-3'>
                <span classNameName='input-group-text'>
                  <i classNameName='fa-solid fa-gift'></i>
                </span>
                <input
                  type='text'
                  id='description'
                  classNameName='form-control'
                  placeholder='Zona del vehiculo'
                  value={vehicleZone}
                  onChange={(e) => setVehicleZone(e.target.value)}
                ></input>
              </div>
              <div classNameName="input-group mb-3">
                <span classNameName="input-group-text">
                  {" "}
                  <i classNameName="fa fa-product-hunt"></i>
                </span>
                <select
                  id="tipo"
                  classNameName="form-control"
                  onChange={(e) => setSubCategories(e.target.value)}
                >
                  <option value="" disabled selected>
                    Selecciona una subcategoría
                  </option>
                  {subCategories.map((categoria) => (
                    <option key={categoria.autopartID} value={categoria.subCategoryId}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
                <div classNameName="d-grid col-6 mx-auto">
                  <button
                    onClick={() => validar(idToEdit, name)}
                    classNameName="btn btn-success"
                  >
                    <i classNameName="fa-solid fa-floppy-disk"></i> Guardar
                  </button>
                </div>
              </div>
              <div>

                <div classNameName='input-group mb-3'>
                  <span classNameName='input-group-text'>
                    <i classNameName='fa-solid fa-gift'></i>
                  </span>


                  <div classNameName='d-grid col-6 mx-auto'>
                    <button onClick={() => validar()} classNameName='btn btn-success'>
                      <i classNameName='fa-solid fa-floppy-disk'></i> Guardar
                    </button>

                  </div>


                </div>
                <div classNameName='modal-footer'>
                  <button type='button' id='btnCerrar' classNameName='btn btn-secondary' data-bs-dismiss='modal'>
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</div>  
    
  );
};


export default ShowAutoparts;