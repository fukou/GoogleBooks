import Vue from "vue";
import VueRouter from "vue-router";
import Books from "../views/Books.vue";
import BooksDetail from "../views/BooksDetail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Books",
    component: Books
  },
  {
    path: "/books/:id",
    name: "BooksDetail",
    props: true,
    component: BooksDetail
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function() {
  //     return import(/* webpackChunkName: "about" */ "../views/About.vue");
  //   }
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
