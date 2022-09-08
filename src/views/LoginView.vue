<template>
  <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
    <div>
      <v-tabs v-model="tab" show-arrows background-color="#008B8B" icons-and-text dark grow>
        <v-tabs-slider></v-tabs-slider>
        <v-tab>
          <div class="caption py-1">Login</div>
        </v-tab>
        <v-tab-item>
          <v-card class="px-4">
            <v-card-text>
              <v-form ref="loginForm" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="E-mail" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="loginPassword" :append-icon="show1 ? 'eye' : 'eye-off'"
                      :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1"
                      label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1">
                    </v-text-field>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="6" xsm="12">
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                    <v-btn x-large block :disabled="!valid" color="#008B8B" @click="validate"> Login </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'LoginView',
  props: {
    source: String,
  },

  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [
      { name: "Login", icon: "mdi-account" },
    ],
    valid: true,
    loginEmail: "",
    loginPassword: "",
    loginEmailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    show1: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 8) || "Min 8 characters"
    }
  }),

  methods: {
    async validate() {
      if (this.$refs.loginForm.validate()) {
        await this.login({
          email: this.loginEmail,
          password: this.loginPassword
        })

        await this.$router.push({ name: 'products.list' })
      }
    },
    
    ...mapActions([
      'login'
    ]),
  },

  computed: {
    ...mapGetters({
      loginInfo: 'loginInfo'
    }),
  }
}
</script>

<style scoped>
caption {
  font-weight: 800 !important;
  font-size: 20px !important;
}

.theme--light.v-btn {
  color: #fff !important;
}
</style>
