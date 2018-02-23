<template>
   <div>
    <nav class="navbar is-light">
      <div class="container">
       <h2 class="subtitle" v-if="user">
            {{user.name}}
        </h2>
        <h2 class="subtitle" v-else>
            You're not connected
        </h2>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <a class="button is-light" @click="cnd=true">+</a>
            </p>
            <p class="control">
              <a class="button" href="http://localhost:1337/logout">
                Logout
              </a>
            </p>
          </div>
        </div>
    </div>
    </nav>
    
    <div v-for="topic in topics" :key="topic.id">
      <thread :topic="topic" :user="user"></thread>
    </div>

    <div class="modal" v-bind:class="{ 'is-active' : cnd}">
      <div class="modal-background"></div>
      <div class="modal-card">
            <section class="modal-card-body">
              <div class="field">
                <label class="label">Message</label>
                <div class="control">
                  <textarea class="textarea" placeholder="Textarea" v-model="topic"></textarea>
                </div>
              </div>
              <div class="field is-grouped">
                <div class="control">
                  <button class="button is-link" @click="submit">Submit</button>
                </div>
                <div class="control">
                  <button class="button is-text" @click="cnd=false">Cancel</button>
                </div>
              </div>
            </section>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="cnd=false"></button>
    </div>
  </div>
</template>

<script>
import Api from "@/services/api";
import thread from "./thread";

export default {
  components: {
    thread
  },

  data() {
    return {
      user: {},
      cnd: false,
      topic: "",
      topics: []
    };
  },

  mounted() {
    Api.customApiParam("get", "/user", {
      params: {
        id: this.$route.query.id
      }
    }).then(response => {
      this.user = response.data;
    });

    Api.customApi("get", "/topics").then(response => {
      this.topics = response.data;
    });
  },

  methods: {
    submit() {
      console.log(this.user.id + this.topic);
      Api.customApiParam("post", "/addtopic", {
        author: this.user.name,
        topic: this.topic
      })
        .then(response => {
          this.topic = response.data;
          this.topics.push(this.topic);
          this.topic = "";
          this.cnd = false;
        })
        .catch(err => {
          console.log(err);
          this.cnd = false;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
