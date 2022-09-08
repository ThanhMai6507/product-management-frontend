<template>
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
        <div>
            <v-tabs v-model="tab" show-arrows background-color="#008B8B" icons-and-text dark grow>
                <v-tabs-slider></v-tabs-slider>
                <v-tab>
                    <div class="caption py-1">Create Product</div>
                </v-tab>
                <v-tab-item>
                    <v-card class="px-4">
                        <v-card-text>
                            <v-form ref="createForm" v-model="valid" lazy-validation>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field v-model="user_id"
                                            label="User_id" 
                                            :rules="[rules.required, rules.min]"
                                            required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="name" label="Name product"
                                            :rules="[rules.required, rules.min]"
                                            required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="description"
                                            label="Description" 
                                            ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="price"
                                            :rules="[rules.required, rules.min]"
                                            label="Price" >
                                        </v-text-field>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                    <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                                        <v-btn x-large block :disabled="!valid" color="#008B8B"
                                            @click="create">Create</v-btn>
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
import productService from '@/services/product'

export default {
    name: 'CreateProduct',
    props: {
        source: String,
    },

    data: () => ({
        dialog: true,
        tab: 0,
        tabs: [
            { name: "CreateProduct", icon: "mdi-account" },
        ],
        valid: true,
        user_id: "",
        name: "",
        description: "",
        price: "",
        rules: {
            required: value => !!value || "Required.",
        }
    }),

    methods: {
         async create() {
            await productService.create({
                user_id: this.user_id,
                name: this.name,
                description: this.description,
                price: this.price
            })
            await this.$router.push({ name: 'products.list' })
        }
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
