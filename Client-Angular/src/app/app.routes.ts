import { Routes } from '@angular/router';
import { UsersPage } from './pages/users/users.page';
import { ProductsPage } from './pages/products/products.page';
import { CoursesPage } from './pages/courses/courses.page';
import { OrdersPage } from './pages/orders/orders.page';
import { BooksPage } from './pages/books/books.page';

/**
 * Definición de las rutas principales de la aplicación.
 *
 * @remarks
 * Este archivo contiene la configuración de enrutamiento
 * utilizada por Angular Router para mapear las URLs
 * a los componentes correspondientes.
 *
 * Incluye:
 * - Rutas de navegación principales
 * - Redirección por defecto para rutas no existentes
 *
 * @see {@link UsersPage}
 * @see {@link ProductsPage}
 * @see {@link CoursesPage}
 * @see {@link OrdersPage}
 * @see {@link BooksPage}
 */
export const routes: Routes = [

  /**
   * Ruta de usuarios.
   *
   * @remarks
   * Renderiza el componente `UsersPage`, encargado
   * de mostrar y gestionar el listado de usuarios.
   */
  { path: 'users', component: UsersPage },

  /**
   * Ruta de productos.
   *
   * @remarks
   * Renderiza el componente `ProductsPage`, encargado
   * de mostrar y gestionar el listado de productos.
   */
  { path: 'products', component: ProductsPage },

  /**
   * Ruta de cursos.
   *
   * @remarks
   * Renderiza el componente `CoursesPage`, encargado
   * de mostrar y gestionar el listado de cursos.
   */
  { path: 'courses', component: CoursesPage },

  /**
   * Ruta de pedidos.
   *
   * @remarks
   * Renderiza el componente `OrdersPage`, encargado
   * de mostrar y gestionar el listado de pedidos.
   */
  { path: 'orders', component: OrdersPage },

  /**
   * Ruta de libros.
   *
   * @remarks
   * Renderiza el componente `BooksPage`, encargado
   * de mostrar y gestionar el listado de libros.
   */
  { path: 'books', component: BooksPage },

  /**
   * Ruta comodín.
   *
   * @remarks
   * Captura cualquier ruta no definida y redirige
   * automáticamente a la ruta de usuarios.
   */
  { path: '**', redirectTo: 'users' },
];