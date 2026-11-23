# Bodegas y productos · Frontend

Aplicación web en Angular 21 para registrar bodegas y consultar el inventario. El formulario guarda el nombre y la ubicación de cada bodega. La tabla muestra el producto, su precio, la cantidad y la bodega a la que pertenece.

Los productos se consultan directamente en la API. Una bodega recién registrada aparece en la consulta de la API y aporta filas a la tabla cuando tiene productos asociados.

## Puesta en marcha

Con Docker iniciado, levanta primero la API siguiendo las instrucciones de su repositorio. Debe estar disponible en `http://localhost:8080/bodegas`. [Repositorio del backend](https://github.com/andrXco/bodegas-backend)

Desde la raíz de este repositorio, ejecuta `docker compose up --build -d` y abre [localhost:4200](http://localhost:4200). Para detener la aplicación, ejecuta `docker compose down`.

## Desarrollo local

Con Node.js 22.12 o posterior de la serie 22, o con Node.js 24, ejecuta lo siguiente.

```sh
npm ci
npm start
```

Abre [localhost:4200](http://localhost:4200). El comando `npm run build` compila la aplicación para su distribución.
