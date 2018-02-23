<template>
    <div class="container">
       <div class="section">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        {{topic.author}} said...
                    </p>
                    <p class="card-header-title">
                        {{postedOn(topic)}}
                    </p>
                </header>
                <div class="card-content">
                    <div class="content">
                    {{topic.content}}
                    </div>
                </div>
                <div class="section">
                    <div class="card" v-for="comment in comments" :key="comment.id">
                        <header class="card-header">
                            <p class="card-header-title">
                                {{comment.author}} said...
                            </p>
                            <p class="card-header-title">
                                {{postedOn(comment)}}
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="content">
                            {{comment.content}}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="section is-low" v-bind:class="{ 'is-hidden' : cndComment}">
                        <div class="field">
                            <label class="label">Comment</label>
                            <div class="control">
                            <textarea class="textarea" placeholder="Textarea" v-model="comment"></textarea>
                            </div>
                        </div>
                        <div class="field is-grouped">
                            <div class="control">
                            <button class="button is-link" @click="submit">Submit</button>
                            </div>
                            <div class="control">
                            <button class="button is-text" @click="cndComment=true">Cancel</button>
                            </div>
                        </div>
                </div>
                <footer class="card-footer">
                    <a class="card-footer-item" v-bind:class="{ 'is-hidden' : liked}" @click="like()">Like</a>
                    <a class="card-footer-item" v-bind:class="{ 'is-hidden' : !liked}" @click="unlike()">Liked</a>
                    <a class="card-footer-item" @click="cndComment = false">Comment</a>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import Api from "@/services/api";
import moment from "moment";
export default {
  props: ["topic", "user"],

  data() {
    return {
      cndComment: true,
      comments: [],
      comment: "",
      liked: false
    };
  },

  methods: {
    submit() {
      Api.customApiParam("post", "/addcomment", {
        author: this.user.name,
        comment: this.comment,
        topicId: this.topic.id
      })
        .then(response => {
          this.comment = response.data;
          this.comments.push(this.comment);
          this.comment = "";
          this.cndComment = true;
        })
        .catch(err => {
          console.log(err);
          this.cndComment = true;
        });
    },

    like() {
      Api.customApiParam("post", "/liketopic", {
        id: this.user.id,
        topicId: this.topic.id
      })
        .then(response => {
          this.liked = !this.liked;
        })
        .catch(err => {
          console.log(err);
        });
    },

    unlike() {
      Api.customApiParam("post", "/unliketopic", {
        id: this.user.id,
        topicId: this.topic.id
      })
        .then(response => {
          this.liked = !this.liked;
        })
        .catch(err => {
          console.log(err);
        });
    },

    postedOn(status) {
        return moment(status.createdAt).fromNow();
    }
  },

  created() {
    Api.customApiParam("get", "/comments", {
      params: {
        id: this.topic.id
      }
    }).then(response => {
      this.comments = response.data;
    });

    if (this.user.topicliked.indexOf(this.topic.id) >= 0) {
      this.liked = true;
    }
  }
}
</script>

<style>

</style>