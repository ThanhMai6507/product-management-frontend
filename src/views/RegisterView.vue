<template>
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
        <div>
            <v-tabs v-model="tab" show-arrows background-color="#008B8B" icons-and-text dark grow>
                <v-tabs-slider></v-tabs-slider>
                <v-tab>
                    <div class="caption py-1">Register</div>
                </v-tab>
                <v-tab-item>
                    <v-card class="px-4">
                        <v-card-text>
                            <v-form ref="registerForm" v-model="valid" lazy-validation>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field v-model="fullname" :rules="[rules.required]"
                                            label="Full Name" maxlength="20" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="email" :rules="emailRules" label="E-mail"
                                            required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="password"
                                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                            :rules="[rules.required, rules.min]"
                                            :type="show1 ? 'text' : 'password'" name="input-10-1"
                                            label="Password" hint="At least 8 characters" counter
                                            @click:append="show1 = !show1"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="confirmpassword"
                                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                            :rules="[rules.required, rules.min]"
                                            :type="show1 ? 'text' : 'password'" name="input-10-1"
                                            label="Confirm Password" counter @click:append="show1 = !show1">
                                        </v-text-field>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                    <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                                        <v-btn x-large block :disabled="!valid" color="#008B8B"
                                            @click="validate">Register</v-btn>
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
import authService from '@/services/auth'

export default {
    name: 'RegisterView',
    props: {
        source: String,
    },

    data: () => ({
        dialog: true,
        tab: 0,
        tabs: [
            { name: "Register", icon: "mdi-account-outline" }
        ],
        valid: true,
        fullname: "",
        email: "",
        password: "",
        confirmpassword: "",
        emailRules: [
            v => !!v || "Required",
            v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        show1: false,
        rules: {
            required: value => !!value || "Required.",
            min: v => (v.length >= 8) || "Min 8 characters",
            same: v => (v === this.password) || "Password must match"
        }

    }),

    methods: {
         async validate() {
            if (this.$refs.registerForm.validate()) {
                await authService.register({
                    name: this.fullname,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.confirmpassword
                })
                await this.$router.push({ name: 'login' })
            }
        },
    },
}
</script>

<style>
caption {
    font-weight: 600 !important;
    font-size: 20px !important;
}

.theme--light.v-btn {
    color: #fff !important;
}
</style>
