import React, { useEffect, useState } from 'react';
import { getRemuneraciones } from './../services/servicioAuth';

const Home = () => {
  const [remuneraciones, setRemuneraciones] = useState([]);

  useEffect(() => {
    const fetchRemuneraciones = async () => {
      const data = await getRemuneraciones();
      if (data) setRemuneraciones(data);
    };

    fetchRemuneraciones();
  }, []);

  return (
    <div>
      <h2>Listado de Remuneraciones</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Monto Bruto</th>
            <th>Monto Neto</th>
            <th>Fecha de Pago</th>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Departamento</th>
            <th>Deducciones</th>
          </tr>
        </thead>
        <tbody>
          {remuneraciones.map((remuneracion) => (
            <tr key={remuneracion.id}>
              <td>{remuneracion.id}</td>
              <td>{remuneracion.monto_bruto}</td>
              <td>{remuneracion.monto_neto}</td>
              <td>{new Date(remuneracion.fecha_pago).toLocaleDateString()}</td>
              <td>{remuneracion.usuario.nombre} ({remuneracion.usuario.correo})</td>
              <td>{remuneracion.usuario.rol.nombre}</td>
              <td>{remuneracion.usuario.departamento.nombre}</td>
              <td>
                <ul>
                  {remuneracion.deducciones.map((deduccion) => (
                    <li key={deduccion.id}>
                      {deduccion.descripcion}: {deduccion.monto}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
