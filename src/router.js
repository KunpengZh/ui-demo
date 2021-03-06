import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("./views/HomePage.vue")
    },
    {
      path: "/tagsmanagement",
      name: "TagsManagement",
      component: () => import("./views/DocCenter/TagsManagement.vue")
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("./views/Dashboard/HomeDashBoard.vue")
    },
    {
      path: "/doccenter",
      name: "DocCenter",
      component: () => import("./views/DocCenter/DocCenter.vue")
    },
    {
      path: "/docinput",
      name: "DocumentInput",
      component: () => import("./views/DocCenter/DocumentInput.vue")
    },
    {
      path: "/aualityinput",
      name: "QualityInput",
      component: () => import("./views/QualityInput.vue")
    }
  ]
});
