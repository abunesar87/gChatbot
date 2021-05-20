import Vue from 'vue'
import App from './App.vue'
import './css/tailwind.css'
import UUID from "vue-uuid";
import VueChatScroll from 'vue-chat-scroll'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'

// import style (<= Swiper 5.x)
// import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper)
Vue.use(VueChatScroll) 
Vue.use(UUID);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
