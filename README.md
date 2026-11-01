# 🍔 FoodStation
 
Aplicación web tipo quiosco de comida construida con **Next.js**, **TypeScript** y **Tailwind CSS**. Tiene tres áreas: un menú donde el cliente arma su pedido, una pantalla de pedidos listos y un panel de administración para gestionar pedidos y productos. Los datos se guardan en **PostgreSQL** mediante **Prisma**, las operaciones de escritura se realizan con **Server Actions** y los datos se validan con **Zod**.
 
## 🌐 Demo
 
🔗 [https://food-station-andresmdevco.vercel.app/](https://food-station-andresmdevco.vercel.app/)
 
## 🛠️ Tecnologías Utilizadas
 
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
 
- Next.js con App Router
- Tailwind CSS
- **Prisma** — ORM para consultar y modificar la base de datos PostgreSQL, usando el adaptador `@prisma/adapter-pg`
- **Zustand** — manejo del estado global del pedido en curso
- **Zod** — validación de formularios y de los datos recibidos por las Server Actions
- **SWR** — consulta periódica de los pedidos desde el cliente
- **Cloudinary** (`next-cloudinary`) — subida de imágenes de los productos
- **react-toastify** — notificaciones de éxito y error
- **Heroicons** y **react-icons** — iconografía de la interfaz
## ✨ Características
 
- 🍽️ Menú organizado por categorías (café, hamburguesas, pizzas, donas, pasteles y galletas).
- 🛒 Resumen del pedido con control de cantidad por producto (mínimo 1, máximo 5), subtotal y total.
- 🧾 Confirmación del pedido con el nombre del cliente, validado antes de enviarse.
- 👨‍🍳 Panel de pedidos pendientes para marcarlos como completados, con actualización automática.
- 📺 Pantalla pública con los últimos pedidos listos.
- 📦 Administración de productos: listado paginado, búsqueda por nombre, creación y edición.
- 🖼️ Subida de imágenes de productos a Cloudinary, con vista previa de la imagen actual al editar.
- ✅ Validación de datos tanto en el cliente como en el servidor con los mismos esquemas de Zod.
- 🔔 Notificaciones para confirmar acciones y mostrar errores de validación.
- 🚫 Página de "Producto No Encontrado" cuando se intenta editar un producto inexistente.
- 📱 Diseño responsive con Tailwind CSS.
## 📂 Archivos principales
 
**Rutas (`app`)**
 
| Archivo | Descripción |
|---|---|
| `page.tsx` | Redirige la raíz a `/order/cafe`, la primera categoría del menú |
| `order/layout.tsx` | Layout del quiosco: `OrderSidebar` con las categorías, el contenido y `OrderSummary` con el pedido en curso |
| `order/[category]/page.tsx` | Obtiene los productos de la categoría indicada en la URL (por su `slug`) y renderiza un `ProductCard` por cada uno |
| `orders/page.tsx` | Pantalla pública de pedidos listos; consulta `/orders/api` con SWR y se actualiza cada 60 segundos |
| `orders/api/route.tsx` | Route Handler que devuelve los últimos 5 pedidos completados, ordenados por fecha de finalización |
| `admin/layout.tsx` | Layout del panel de administración con la barra lateral y las notificaciones |
| `admin/orders/page.tsx` | Lista de pedidos pendientes; consulta `/admin/orders/api` con SWR y renderiza un `OrderCard` por cada uno |
| `admin/orders/api/route.ts` | Route Handler que devuelve los pedidos pendientes junto con sus productos |
| `admin/products/page.tsx` | Listado de productos con paginación de 10 elementos, acceso a creación y buscador |
| `admin/products/new/page.tsx` | Página de creación de producto |
| `admin/products/[id]/edit/page.tsx` | Página de edición; obtiene el producto por `id` y muestra `not-found.tsx` si no existe |
| `admin/products/search/page.tsx` | Resultados de la búsqueda de productos por nombre |
 
**Server Actions (`actions`)**
 
| Archivo | Descripción |
|---|---|
| `create-order-action.ts` | Valida el pedido con `OrderSchema` y lo guarda junto con sus productos y cantidades |
| `complete-order-action.ts` | Valida el `id` del pedido, lo marca como completado, guarda la fecha en que quedó listo y revalida `/admin/orders` |
| `create-product-action.ts` | Valida los datos con `ProductSchema` y crea el producto |
| `update-product-action.ts` | Valida los datos con `ProductSchema`, actualiza el producto y revalida `/admin/products` |
 
**Componentes (`components`)**
 
| Archivo | Descripción |
|---|---|
| `order/OrderSidebar.tsx` | Barra lateral del quiosco; consulta las categorías y muestra un `CategoryIcon` por cada una |
| `order/OrderSummary.tsx` | Resumen del pedido: calcula el total, valida el formulario y dispara `createOrder` |
| `order/ProductDetails.tsx` | Producto dentro del pedido, con botones para aumentar, disminuir o eliminar |
| `order/OrderCard.tsx` | Tarjeta de un pedido pendiente con el botón para marcarlo como completado |
| `order/LatestOrderItem.tsx` | Tarjeta de un pedido listo en la pantalla pública |
| `products/ProductCard.tsx` | Tarjeta de un producto con su imagen, nombre y precio |
| `products/AddProductButton.tsx` | Botón que agrega el producto al pedido en el store |
| `products/ProductForm.tsx` | Campos del formulario de producto, compartidos por la creación y la edición |
| `products/AddProductForm.tsx` | Formulario de creación: valida con `ProductSchema` y llama a `createProduct` |
| `products/EditProductForm.tsx` | Formulario de edición: valida con `ProductSchema` y llama a `updateProduct` |
| `products/ImageUpload.tsx` | Widget de Cloudinary para subir la imagen del producto |
| `products/ProductsTable.tsx` | Tabla de productos con su categoría y el enlace de edición |
| `products/ProductsPagination.tsx` | Navegación entre las páginas del listado de productos |
| `products/ProductSearchForm.tsx` | Formulario de búsqueda que valida el texto y navega a la página de resultados |
| `admin/AdminSidebar.tsx` y `admin/AdminRoute.tsx` | Navegación del panel de administración, con la ruta activa resaltada |
| `ui/` | Componentes reutilizables: `CategoryIcon`, `GoBackButton`, `Heading`, `Logo` y `ToastNotification` |
 
**Datos y utilidades**
 
| Archivo | Descripción |
|---|---|
| `src/store.ts` | Store de Zustand con el pedido y sus acciones: `addToOrder`, `increaseQuantity`, `decreaseQuantity`, `removeItem` y `clearOrder` |
| `src/lib/prisma.ts` | Instancia única del cliente de Prisma, conectada mediante `DATABASE_URL` |
| `src/schema/index.ts` | Esquemas de Zod: `OrderSchema`, `OrderIdSchema`, `SearchSchema` y `ProductSchema` |
| `src/types/index.ts` | Tipos `OrderItem` y `OrderWithProducts`, basados en los tipos generados por Prisma |
| `src/utils/index.ts` | Funciones `formatCurrency` y `getImagePath`, que distingue entre imágenes de Cloudinary y locales |
| `prisma/schema.prisma` | Modelos `Category`, `Product`, `Order` y `OrderProducts` con sus relaciones |
| `prisma/seed.ts` | Script que carga las categorías y los productos iniciales desde `prisma/data` |
| `prisma7.config.ts` | Configuración de Prisma: ruta del esquema, migraciones, comando del seed y URL de la base de datos |
| `next.config.ts` | Configuración de Next.js; autoriza el dominio de Cloudinary para `next/image` |
 
## 🧠 Cómo funciona
 
**Armado del pedido**
1. La raíz redirige a `/order/cafe`. `OrderSidebar` consulta las categorías con Prisma y las muestra en la barra lateral.
2. `order/[category]/page.tsx` obtiene los productos de la categoría seleccionada y renderiza un `ProductCard` por cada uno.
3. Al presionar "Agregar", `addToOrder` guarda el producto en el store de Zustand. Si ya estaba en el pedido, aumenta su cantidad y recalcula el subtotal.
4. `OrderSummary` lista los productos del pedido y calcula el total con `useMemo`. Desde `ProductDetails` se puede cambiar la cantidad (entre 1 y 5) o eliminar el producto.
5. Al confirmar el pedido, los datos se validan con `OrderSchema`. Si hay errores, se muestran como notificaciones.
6. Si los datos son válidos, se llama a la Server Action `createOrder`, que vuelve a validarlos en el servidor y guarda el pedido junto con sus productos y cantidades en una sola operación de Prisma.
7. Se muestra una notificación de éxito y se vacía el pedido.

**Gestión de pedidos**

8. `/admin/orders` consulta `/admin/orders/api` con SWR cada 60 segundos. El Route Handler devuelve los pedidos con `status: false`, es decir, los pendientes.
9. Cada `OrderCard` tiene un formulario que dispara `completeOrder`. La acción valida el `id` con `OrderIdSchema`, marca el pedido como completado y guarda la fecha en `orderReadyAt`.
10. `/orders` consulta `/orders/api`, que devuelve los últimos 5 pedidos con `orderReadyAt` definido, del más reciente al más antiguo. Esta pantalla también se actualiza cada 60 segundos.
 
**Administración de productos**

11. `/admin/products` obtiene en paralelo el total de productos y los de la página actual con `skip` y `take`. Si el número de página no es válido, redirige al listado.
12. El buscador valida el texto con `SearchSchema` y navega a `/admin/products/search`, que filtra por nombre sin distinguir mayúsculas de minúsculas.
13. Para crear un producto, `AddProductForm` envuelve a `ProductForm`, que carga las categorías desde la base de datos. Los datos se validan con `ProductSchema`, se envían con `createProduct` y, si todo sale bien, se redirige al listado.
14. `ImageUpload` abre el widget de Cloudinary y guarda la URL de la imagen subida en un campo oculto del formulario. `getImagePath` decide si la imagen viene de Cloudinary o de la carpeta local `/products`.
15. Para editar, la página busca el producto por `id` y llama a `notFound()` si no existe. Si existe, `EditProductForm` carga sus datos en `ProductForm`, valida los cambios con `ProductSchema` y llama a `updateProduct`, que revalida el listado.
 
## 📚 Conceptos aplicados
 
- **App Router de Next.js**: Server Components para consultar datos directamente con Prisma, Client Components para la interactividad, layouts anidados y rutas dinámicas (`[category]`, `[id]`).
- **Server Actions** para crear pedidos y crear o editar productos, con `revalidatePath` para actualizar las vistas afectadas.
- **Route Handlers** combinados con **SWR** (`refreshInterval`) para mantener actualizadas las vistas de pedidos.
- **Prisma ORM** con PostgreSQL: modelos relacionales, creación anidada de los productos de un pedido, `include`, paginación con `skip` y `take`, búsqueda con `contains` sin distinguir mayúsculas y un seed para los datos iniciales.
- Instancia única del cliente de Prisma para evitar abrir conexiones nuevas en desarrollo.
- Validación con **Zod** (`safeParse`, `transform`, `refine`) usando los mismos esquemas en el cliente y en el servidor.
- Manejo del estado global del pedido con **Zustand**.
- Estado derivado con `useMemo` (total del pedido y botones de cantidad).
- Subida de imágenes con **Cloudinary** y uso de `next/image` con dominios remotos autorizados.
- Página de error personalizada con `notFound()` y `not-found.tsx`.
- Tipos derivados de Prisma y de las funciones de consulta (`Awaited<ReturnType<...>>`).
- Notificaciones de usuario con `react-toastify`.
- Organización del proyecto por responsabilidades (`app`, `actions`, `components`, `prisma`, `src`).

## 🚀 Cómo ejecutar el proyecto
 
1. Clonar el repositorio:
```bash
   git clone https://github.com/andresmdevco/food-station.git
   cd food-station
```
2. Instalar las dependencias:
```bash
   npm install
```
3. Crear un archivo `.env` en la raíz del proyecto con la URL de tu base de datos PostgreSQL y el nombre de tu cuenta de Cloudinary:
```bash
   DATABASE_URL=tu_url_de_postgresql
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name
```
4. Ejecutar las migraciones para crear las tablas:
```bash
   npx prisma migrate dev
```
5. Cargar las categorías y los productos iniciales:
```bash
   npx prisma db seed
```
6. Ejecutar el proyecto en modo desarrollo:
```bash
   npm run dev
```
7. Abrir [http://localhost:3000](http://localhost:3000) en el navegador.
> La subida de imágenes usa el `uploadPreset` definido en `components/products/ImageUpload.tsx`. Para usar tu propia cuenta de Cloudinary, reemplázalo por un preset de tipo *unsigned* creado en tu cuenta.