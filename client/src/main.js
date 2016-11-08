import Vue from 'vue'
import App from './App'
/**
* This is the Vuex store and it is
* avaible to all your components
*/
import store from './store'
/**
* This is the Router
*/
import router from './router'

require('./includes')

/* eslint-disable no-new */
new Vue({
  store, // injects the Store into all components
  router, // make Router work with the application
  el: '#app',
  render: h => h(App),
})
