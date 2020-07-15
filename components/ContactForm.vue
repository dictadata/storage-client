<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-8 ml-auto mr-auto">
          <h2 class="text-center">stay in touch</h2>
          <p>to receive information and updates on dicta data project status,
            ask a question or just send a note. Sincerely, thank you!
          </p>
          <form class="contact-form" v-on:submit.prevent="onContact()">
            <div class="row">
              <div class="col-md-6">
                <label>Name</label>
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="nc-icon nc-single-02"></i>
                  </span>
                  <input type="text" class="form-control" placeholder="Name" v-model="contactInfo.name">
                </div>
              </div>
              <div class="col-md-6">
                <label>Email</label>
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="nc-icon nc-email-85"></i>
                  </span>
                  <input type="email" class="form-control" placeholder="Email" v-model="contactInfo.email">
                </div>
              </div>
            </div>
            <label>Message</label>
            <textarea class="form-control" rows="4" placeholder="What projects are you interested in?" v-model="contactInfo.message"></textarea>
            <div class="row">
              <div class="col-md-4 ml-auto mr-auto">
                <input v-if="send_status" type="text" v-model="send_status" readonly />
                <button class="btn btn-danger btn-lg btn-fill">Send</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Notify, Account } from '../client'

export default {
  name: 'ContactForm',
  data() {
    return {
      contactInfo: {
        name: '',
        email: '',
        message: ''
      },
      send_status: ''
    }
  },
  methods: {
    onContact: function() {
      // validate form
      if (this.contactInfo.name.length === 0 || this.contactInfo.email.length === 0 || this.contactInfo.message.length === 0) {
        this.send_status = 'Please fill out all fields.'
        return
      }
      if (this.contactInfo.message.length < 20 && !/\s/.test(this.contactInfo.message)) {
        this.send_status = 'ok' // some bots are sending one word in message, let them think they sent something
        return
      }

      let that = this
      that.send_status = 'sending message'

      let message = {
        subject: "Message from www.dictadata.org",
        text: this.contactInfo.name + "\n" +
          this.contactInfo.email + "\n" +
          this.contactInfo.message + "\n"
      }

      // console.log(message);
      // console.log(process.env.VUE_APP_DICTA_API);
      let account = new Account('dicta')
      account.password = 'data'
      account.roles = ['Public', 'Notify']

      let notify = new Notify(account)
      notify.sendMessage(message)
        .then(function (result) {
          // console.log(response.data.result);
          // console.log(response);
          if (result === 'ok')
            that.send_status = 'message sent'
          else
            that.send_status = 'notify ' + result
        })
        .catch(function (error) {
          // console.log(error);
          that.send_status = error.message
        })
    }
  }
}
</script>
<style>
</style>
