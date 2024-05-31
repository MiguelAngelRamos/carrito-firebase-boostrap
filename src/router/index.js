import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
      // name: 'home',
      // component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/home',
      name: 'home',
      meta: { requiresAuth: true },
      component: () => import('../views/HomeView.vue')
    }, {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },

    {
      path: '/admin',
      name: 'admin',
      meta: { requiresAuth: true },
      component: () => import('../views/admin/AdminLayout.vue'),
      children: [
        {
          path: 'admin-productos',
          name: 'admin-productos',
          meta: { requiresAuth: true },
          component: () => import('../views/admin/AdminView.vue')
        },
        {
          path: 'nuevo',
          name: 'nuevo-producto',
          meta: { requiresAuth: true },
          component: () => import('../views/admin/NewProductView.vue')
        },
        {
          path: 'editar/:id',
          name: 'editar-producto',
          meta: { requiresAuth: true },
          component: () => import('../views/admin/EditProductView.vue')
        },
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  onAuthStateChanged(auth, (user) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (!user && requiresAuth) {
      return next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    }

    if (user && to.path === '/login') {
      return next('/home');
    }

    next();
  });
});
export default router


// El query: { redirect: to.fullPath } es una forma de pasar información adicional a la ruta a la que estás redirigiendo.

// En este caso, estás pasando un objeto query con una propiedad redirect que tiene el valor de to.fullPath. Aquí, to es el objeto de ruta al que se está intentando navegar, y fullPath es la ruta completa como una cadena, incluyendo la consulta y el fragmento.

// El propósito de esto es recordar a qué ruta estaba intentando acceder el usuario antes de ser redirigido a la página de inicio de sesión. De esta manera, después de que el usuario inicie sesión, puedes redirigirlo de vuelta a la ruta original en lugar de a una ruta predeterminada.

// Por ejemplo, si un usuario intenta acceder a /admin/editar/123 sin estar autenticado, será redirigido a /login. Pero la URL en el navegador será /login?redirect=%2Fadmin%2Feditar%2F123. Después de que el usuario inicie sesión, puedes leer el parámetro redirect de la consulta y redirigir al usuario a /admin/editar/123.
