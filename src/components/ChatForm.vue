<template>
<div style="overscroll-behavior: none;"> 
  <h1 class="text-4xl bg-clip-text text-transparent bg-gradient-to-l from-siteColor-dark to-siteColor-light">
    Gigalogy Chatbot
  </h1>
  <HelloWorld/>
  
  <div class="fixed bottom-5 right-5 flex flex-col justify-center items-end space-y-1">
    <div v-if="isOpenChat" class="flex justify-center items-center">
      <div class="w-72 h-auto bg-white rounded shadow-2xl">
        <nav class="w-full h-10 bg-gradient-to-r from-siteColor-dark to-siteColor-light rounded-tr rounded-tl flex justify-between items-center">
          <div class="flex ">
            <span class="text-xl font-medium text-white ml-4">Gigalogy Chatbot</span>
          </div>
          <div class="cursor-pointer z-50 p-2">
            <button @click="isOpenChat = false" class="transition duration-500 ease-in-out text-white focus:outline-none w-7 h-7 rounded-full text-center items-center flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 14" fill="currentColor" class="h-4 w-4 transform">
                <path d="M.116 4.884l1.768-1.768L8 9.232l6.116-6.116 1.768 1.768L8 12.768.116 4.884z"></path>
              </svg>
            </button>
          </div>
        </nav>
        <div class="overflow-auto overscroll-auto px-1 py-1 h-80" v-chat-scroll="{always: false, smooth: true, scrollonremoved:true}">
          <div class="flex items-end justify-end">
            <div class="flex flex-col space-y-2 text-sm max-w-xs mx-2 order-1 items-end">
              <span class="max-w-12 float-right rounded-lg px-4 py-2 inline-block rounded-br-none bg-siteColor-dark ">
                {{welcomeText}}
              </span>
            </div>
            <img src="../assets/logo.png" alt="My profile" class="w-6 h-6 rounded-full order-2">
          </div>

          <div v-for="message in messages" :key="message.id">
            <div v-if="message.sentMessage" class="flex items-end pt-2">
              <div class="flex flex-col space-y-2 text-sm max-w-xs mx-2 order-2 items-start rounded-lg rounded-bl-none bg-siteColor-light">
                <span class="max-w-10 px-4 py-2 ">
                  {{message.sentMessage}}
                </span>
              </div>
              <span class="text-gray-700 pl-1 text-10px order-2">{{message.timestamp}}</span>
              <img src="../assets/logo.png" alt="My profile" class="w-6 h-6 rounded-full order-1">
            </div>
            <!-- <div v-if="loader">
              <Loader/>
            </div> -->
            <div v-if="message.responseMessage" class="flex items-end justify-end">
              <div class="text-sm max-w-xs mx-2 order-1 items-end">
                <div class="items-end pt-2 msg-box">
                  <div v-if="message.intent=='ask_shop_open'" class="flex flex-col text-sm max-w-xs mx-2 order-2 items-start rounded-lg rounded-br-none bg-siteColor-dark">
                    <span class="max-w-10 float-right px-4 py-2">
                      {{message.responseMessage}}
                    </span>
                  </div>
                  <div v-else-if="message.intent=='no_result'" class="flex flex-col text-sm max-w-xs mx-2 order-2 items-start rounded-lg rounded-br-none bg-siteColor-dark">
                    <span class="max-w-10 float-right px-4 py-2">
                      {{message.responseMessage}}
                    </span>
                  </div>
                  <div v-else-if="message.intent=='inform_zipcode'" class="flex flex-col text-sm max-w-xs mx-2 items-start rounded-lg rounded-br-none bg-siteColor-dark">
                    <iframe class="max-w-12 float-right rounded-lg rounded-br-none " :src="message.responseMessage"></iframe>
                  </div>
                  <div v-else-if="message.intent=='inform_mobile'" class="flex flex-col text-sm max-w-xs mx-2 order-2 items-start rounded-lg rounded-br-none bg-siteColor-dark">
                    <img :src="message.responseMessage" class="max-h-40 max-w-10 float-right rounded-lg rounded-br-none inline-block ">
                  </div>
                  <div v-else-if="message.intent=='ask_eaten'" class="flex flex-col text-sm max-w-xs mx-2 order-2 items-start rounded-lg rounded-br-none bg-siteColor-dark">
                    <img :src="message.responseMessage" class="max-h-40 max-w-10 float-right rounded-lg rounded-br-none inline-block ">
                  </div>
                  <div v-else-if="message.intent=='search_movie'" class="flex flex-col text-sm items-start">
                    <swiper v-if="!readMore[message.id]" class="max-w-13" :options="swiperOption">                     
                      <swiper-slide v-for="data in message.responseMessage.Search.slice(0, limit)" :key="data.imdbID" class="max-w-10 rounded-lg bg-siteColor-dark">
                        <img v-if="data.Poster != 'N/A'" class="rounded-lg rounded-br-none rounded-bl-none" :src="data.Poster" alt="image">
                        <div class="px-2 py-1">
                          <div class="font-bold text-xs mb-2">{{data.Title}}</div>
                          <p class="text-xs">{{data.Year}}</p>
                        </div>
                      </swiper-slide>
                      <swiper-slide v-if="!readMore[message.id] && message.responseMessage.Search.length > limit" class="flex justify-center rounded-lg bg-siteColor-dark">
                        <div class="px-2 py-1 flex items-center ">
                          <button class="font-bold px-3 py-3" @click="showMore(message.id)">
                            Show More
                          </button>
                        </div>
                      </swiper-slide>
                      <div class="swiper-pagination"  slot="pagination"></div>
                    </swiper>
                    <swiper v-if="readMore[message.id]" class="max-w-13" :options="swiperOption">
                      <swiper-slide v-for="data in message.responseMessage.Search" :key="data.index" class="max-w-10 rounded-lg bg-siteColor-dark">
                        <img v-if="data.Poster != 'N/A'" class="rounded-lg rounded-br-none rounded-bl-none" :src="data.Poster" alt="image">
                        <div class="px-2 py-1">
                          <div class="font-bold text-xs mb-2">{{data.Title}}</div>
                          <p class="text-xs">{{data.Year}}</p>
                        </div>
                      </swiper-slide>
                      <div class="swiper-pagination"  slot="pagination"></div>
                    </swiper>
                    
                  </div>
                  <div v-else-if="message.intent=='search_google'" class="flex flex-col text-sm items-start">
                    <swiper v-if="!readMore[message.id]" class="max-w-13" :options="swiperOption">
                      <swiper-slide v-for="data in message.responseMessage.slice(0, limit)" :key="data.index" class="max-w-10 rounded-lg bg-siteColor-dark">
                        <!-- <img class="rounded-lg rounded-br-none rounded-tr-none w-16 h-16" src="../assets/logo.png" alt="image"> -->
                        <div class="px-2 py-1 text-center">
                          <div class="text-xs mb-2">{{data.title}}</div>
                          <a class="btn" :href="data.displayLink">Click Here</a>
                        </div>
                      </swiper-slide>
                      <swiper-slide v-if="!readMore[message.id] && message.responseMessage.length > limit" class="flex justify-center rounded-lg bg-siteColor-dark">
                        <div class="px-2 py-1 flex items-center ">
                          <button class="font-bold px-3 py-3" @click="showMore(message.id)">
                            Show More
                          </button>
                        </div>
                      </swiper-slide>
                      <div class="swiper-pagination"  slot="pagination"></div>
                    </swiper>
                    <swiper v-if="readMore[message.id]" class="max-w-13" :options="swiperOption">
                      <swiper-slide v-for="data in message.responseMessage" :key="data.index" class="max-w-10 rounded-lg bg-siteColor-dark">
                        <!-- <img class="rounded-lg rounded-br-none rounded-tr-none " src="../assets/logo.png" alt="image"> -->
                        <div class="px-2 py-1 text-center">
                          <div class="text-xs mb-2">{{data.title}}</div>
                          <a class="btn" :href="data.displayLink">Click Here</a>
                        </div>
                      </swiper-slide>
                      <!-- <swiper-slide class="rounded-lg flex justify-center">
                        <div class="px-2 py-1 flex items-center ">
                          <button class="font-bold px-3 py-3 rounded-lg bg-siteColor-dark" @click="showLess = true">
                            Show Less
                          </button>
                        </div>
                      </swiper-slide> -->
                      <div class="swiper-pagination"  slot="pagination"></div>
                    </swiper>
                  </div>
                </div>
                <span class="text-gray-700 pl-1 text-10px">{{message.timestamp}}</span>
              </div>
              
              <img src="../assets/logo.png" alt="My profile" class="w-6 h-6 rounded-full order-2">
            </div>
            
          </div>
        </div>
        <form class="bg-gray-300" v-on:submit.prevent="sendMessage">
          <div class="flex justify-center space-x-2 items-center p-1 bg-siteColor-dark">
            <div class="relative ">
              <input v-model="inputMessage" type="text" class="rounded-full pl-6 pr-12 py-2 focus:outline-none h-auto placeholder-gray-100 hover:bg-siteColor-dark bg-siteColor-light text-white text-sm w-60" placeholder="Type a message..."> 
            </div>
            <div class="w-7 h-7 rounded-full items-center flex justify-center"> 
              <button class="flex justify-center items-center transition duration-500 ease-in-out text-white bg-siteColor-light hover:bg-siteColor-dark focus:outline-none w-7 h-7 rounded-full text-center ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5 transform rotate-90">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button> 
            </div>
          </div>
        </form>
      </div>
    </div>
    
    <div class="flex">
      <button v-if="!isOpenChat" v-on:click="openChat" class="flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white hover:bg-siteColor-dark focus:outline-none bg-gradient-to-r from-siteColor-dark to-siteColor-light ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 32" fill="currentColor" class="h-7 w-8 transform text-white">
          <path d="M28 32s-4.714-1.855-8.527-3.34H3.437C1.54 28.66 0 27.026 0 25.013V3.644C0 1.633 1.54 0 3.437 0h21.125c1.898 0 3.437 1.632 3.437 3.645v18.404H28V32zm-4.139-11.982a.88.88 0 00-1.292-.105c-.03.026-3.015 2.681-8.57 2.681-5.486 0-8.517-2.636-8.571-2.684a.88.88 0 00-1.29.107 1.01 1.01 0 00-.219.708.992.992 0 00.318.664c.142.128 3.537 3.15 9.762 3.15 6.226 0 9.621-3.022 9.763-3.15a.992.992 0 00.317-.664 1.01 1.01 0 00-.218-.707z"></path>
        </svg>
      </button>
      <button v-else @click="isOpenChat = false" class="rounded-full h-12 w-12 transition duration-500 ease-in-out text-white hover:bg-siteColor-dark bg-gradient-to-r from-siteColor-dark to-siteColor-light focus:outline-none text-center items-center flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 14" fill="currentColor" class="h-6 w-6 transform">
          <path d="M.116 4.884l1.768-1.768L8 9.232l6.116-6.116 1.768 1.768L8 12.768.116 4.884z"></path>
        </svg>
      </button>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import Api from "@/services/nlu_api";
import { uuid } from 'vue-uuid';
import axios from "axios";
import Vue from 'vue';

export default {
  components: {
    // Loader: () => import('@/components/Loader.vue')
    HelloWorld: () => import('@/components/HelloWorld.vue')
  },
  data () {
    return {
      welcomeText: 'Welcome gigalogy chat bot! Ask me what you want to know.',
      inputMessage: '',
      success: '',
      sentMessage: '',
      responseMessage: '',
      user_id: '',
      isOpenChat: false,
      intent: '',
      messages : [],
      timestamp: '',
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 20,
        // centeredSlides: true,
        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: true,
        //   dynamicBullets: true
        // },
      },
      limit: 5,
      responseStatus: false,
      loader: true,
      limitIndex: '',
      readMore: {},
    }
  },
  mounted () {
    this.getNow ()
    this.limit = 5
  },

  methods: {
    sendMessage () {
      this.limit = 5
      this.responseStatus = false
      this.saveMessage ()
      clearInterval(this.interval)
      sessionStorage.sentMessage = this.inputMessage;
      this.sentMessage = sessionStorage.sentMessage;
      console.log("sent message", this.sentMessage)
      // this.loader = true
      // setTimeout(() => {
      //   this.loader = false
      this.getResponse ()
      // }, 2000)
    },
    getResponse () {
      Api.post(`/v1/api/nlu/response`, { text: this.inputMessage, user_id: this.user_id })
      .then((response) => {        
        if(response.data.response){
          var thisResponse = response.data.response.Response
          console.log("thisResponse", thisResponse)
          if (thisResponse == 'False') {
            this.googleSearch ()
          }else {
            this.responseStatus = true
            this.responseMessage = response.data.response
            this.intent = response.data.nlu.intent.name
            console.log("intent", this.intent)
            if (this.intent=='inform_zipcode') {
              var isYoutube = this.responseMessage.match(/(?:youtu|youtube)(?:\.com|\.be)\/([\w\W]+)/i);
              // console.log("isYoutube", isYoutube)
              if (isYoutube) {
                var id = isYoutube[1].match(/watch\?v=|[\w\W]+/gi);
                id = (id.length > 1) ? id.splice(1) : id;
                id = id.toString();
                console.log("Youtube id", id)
                var mp4url = "http://www.youtube.com/embed/";
                this.responseMessage = mp4url + id;
                this.loader = false;
                console.log("Youtube video", this.responseMessage)
              }
            }
            this.loader = false;
            this.saveMessage ()
          }
        }
        else {
          this.googleSearch ()
        }
        
        this.callCloseChat ()
        console.log("message sent", response)
      });
      console.log("inputed message", this.inputMessage)
      
      this.inputMessage = ''
    },
    googleSearch () {
      var sentMessage = sessionStorage.sentMessage;
      axios.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyA3CQX9D-j3PccIQeioe8Je0MoqF8DXHHk&cx=017576662512468239146:omuauf_lfve&q='+sentMessage)
        .then((response) => {
          this.responseStatus = true
          console.log("response from google", response);
          var totalResults = response.data.searchInformation.totalResults
          console.log("total Results response from google", totalResults);
          if(totalResults > 0) {
            this.responseMessage = response.data.items
            this.intent = 'search_google'
          }
          else {
            this.responseMessage = 'No result found'
            this.intent = 'no_result'
          }
          this.loader = false;
          this.saveMessage ()
        })
        .catch((error) => {
          console.log(error);
        })
    },
    saveMessage () {
      console.log("call save message")
      this.getNow()
      if (this.responseStatus){
        var message = {
          id : uuid.v1(),
          timestamp: this.timestamp,
          intent: this.intent,
          user: this.user_id,
          responseMessage: this.responseMessage
        }
      }
      else {
        message = {
          id : uuid.v1(),
          timestamp: this.timestamp,
          user: this.user_id,
          sentMessage: this.inputMessage,
        }
      }
      var messages = [];
      messages = JSON.parse(sessionStorage.getItem('messages')) || [];
      // console.log("get messages from sessionStorage",messages);
      messages.push(message);
      sessionStorage.setItem('messages', JSON.stringify(messages));
      console.log("messages",messages);
      this.getMessages()
    },
    getNow () {
      this.timestamp = moment().format('h:mm a');
      // console.log('timestamp', this.timestamp);

    },
    getMessages () {
      this.messages = JSON.parse(sessionStorage.getItem('messages')) || [];
      
      console.log("get messages", this.messages);
    },
    openChat(){
      this.isOpenChat = true;
      if (!sessionStorage.user_id){
        this.user_id = uuid.v1();
        sessionStorage.user_id = this.user_id;
      }
      if (sessionStorage.user_id) {
        this.user_id = sessionStorage.user_id;
        var user_id = this.user_id
        // console.log("user_id 2", user_id)

        Api.get(`/v1/api/conversation/${ user_id }`)
        .then((response) => {
          console.log("check conversation", response)       
        },(error) => {
          this.createConversation(user_id)
          console.error(error);
        });
      }
      console.log("user_id", this.user_id)

      this.getMessages()
      this.callCloseChat ()
    },
    clearData () {
      console.log("call clear data")
      sessionStorage.removeItem('messages');
      sessionStorage.removeItem('user_id');
      sessionStorage.removeItem('sentMessage');
    },
    createConversation(user_id){
      Api.post(`/v1/api/conversation`, { user_id })
      .then((response) => {
        console.log("conversation created",response)
      });
    },
    callCloseChat () {
      this.limit = 5
      console.log("call Close Chat")
      this.interval = setInterval(this.closeChat, 30*60000)
    },
    closeChat(){
      console.log("closeChat");
      this.isOpenChat = false;
      var user_id = sessionStorage.user_id;
      Api.put(`/v1/api/conversation/${ user_id }`)
      .then((response) => {
        clearInterval(this.interval)
        this.clearData()
        console.log("conversation closed",response)
      });
    },
    showMore(id) {
      console.log("call showMore()")
      Vue.set(this.readMore, id, true);
    },
    showLess(id) {
      console.log("call showLess()")
      Vue.set(this.readMore, id, false);
    },
    // loaderHendelar () {
    //   this.loader = true
    //   setTimeout(() => {
    //     this.loader = false
    //     this.messages = JSON.parse(sessionStorage.getItem('messages')) || [];
    //   }, 2000)
    // }
  },
  
}

</script>

<style  scoped>
</style>
