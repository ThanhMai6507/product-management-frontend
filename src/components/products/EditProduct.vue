<template>
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
        <div>
            <v-tabs v-model="tab" show-arrows background-color="#008B8B" icons-and-text dark grow>
                <v-tabs-slider></v-tabs-slider>
                <v-tab>
                    <div class="caption py-1">Edit Product</div>
                </v-tab>
                <v-tab-item>
                    <v-card class="px-4">
                        <v-card-text>
                            <v-form ref="editForm" v-model="valid" lazy-validation>
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
                                            @click="edit">Edit</v-btn>
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
    name: 'EditProduct',
    props: {
        source: String,
    },

    data: () => ({
        dialog: true,
        tab: 0,
        tabs: [
            { name: "EditProduct", icon: "mdi-account" },
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
        async edit() {
            try {
                await productService.edit(this.$route.params.id, {
                    user_id: this.user_id,
                    name: this.name,
                    description: this.description,
                    price: this.price
                })
                await this.$router.push({ name: 'products.list' })
                
            } catch(error) {
                console.log(error)
            } 
        }
    },
    async mounted() {
        try {
            const res = await productService.detail(this.$route.params.id)
            this.user_id = res.data.user_id
            this.name = res.data.name
            this.description = res.data.description
            this.price = res.data.price
        } catch(error) {
            console.log(error)
        }
    }
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
