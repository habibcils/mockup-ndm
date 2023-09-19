<template>
    <div class=" row items-center background-image" style="">

        <div class="container-login" style="width:440px;height:350px;">
            <q-form @submit.prevent.stop="onSubmit" class="q-gutter-md">
                <div class="flex text-center mb-5">
                    <img src="/images/image_logo.webp" class="w-4/6 text-center" alt="">
                </div>
                <h5 class="text-white pb-5">Login to your account</h5>
                <q-input ref="usernameRef" class="mb-2" bg-color="white" outlined v-model="username" type="text" lazy-rules
                    :rules="nameRules" placeholder="Your Username">
                    <template v-slot:prepend>
                        <!-- <q-icon name="person" /> -->
                        <q-icon name="person_outline" />
                    </template>
                </q-input>
                <q-input ref="passwordRef" class="mb-2" v-model="password" outlined bg-color="white"
                    :type="isPwd ? 'password' : 'text'" lazy-rules :rules="nameRules" placeholder="Your Password">
                    <template v-slot:prepend>
                        <q-icon name="lock_outline" />
                        <!-- <q-icon name="check_circle_outline" /> -->
                        <!-- <q-icon name="eye" /> -->
                        <!-- <q-icon name="account_box" /> -->
                    </template>
                    <template v-slot:append>
                        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                            @click="isPwd = !isPwd" />
                    </template>
                </q-input>
                <div class="ss">
                    <q-btn :loading="loading" unelevated size="md" autogrow color="red-9" type="submit"
                        class="full-width text-white" :label="'Login'">
                        <template v-slot:loading>
                            <q-spinner-hourglass class="on-left" />
                            Loading...
                        </template>
                    </q-btn>
                </div>
                <p class="text-white text-center mt-1">Don’t have Account? Register Here</p>
            </q-form>

        </div>

    </div>
</template>

<script>
definePageMeta({
    layout: "empty",
});
import { useQuasar, QSpinnerGears } from 'quasar'
export default {
    setup() {
        const $q = useQuasar()
        return {
            $q
        }

    },
    data() {
        return {
            isPwd: true,
            loading: false,
            password: '',
            username: '',
            nameRules: [
                val => (val && val.length > 0) || 'Please type something'
            ],
        }
    },
    methods: {
        onSubmit() {
            // const username = this.$refs.usernameRef.validate()
            // this.$refs.passwordRef.validate()
            // console.log(username)
            // const { valid } = await this.$refs.ldapForm.validate()

            // if (this.$refs.usernameRef.hasError || this.$refs.passwordRef.hasError) {
            //     return false
            // }

            this.loading = true
            this.$q.notify({
                closeBtn: true,
                icon: 'done',
                color: 'positive',
                progress: true,
                message: 'Submitted'
            })
            setTimeout(() => {
                this.$q.notify({
                    spinner: QSpinnerGears,
                    message: 'Working...',
                    timeout: 3000
                })
            }, 500);
            setTimeout(() => {
                this.$q.notify({
                    closeBtn: true,
                    icon: 'error',
                    color: 'red-9',
                    progress: true,
                    message: 'Login failed, Devs need more space time'
                })
                this.loading = false
            }, 4500);
        }
    }
}
</script>

<style  scoped>
.container-login {
    margin-left: 150px;
}

.background-image {
    height: 100vh;
    background-image: url('/images/image_login.webp');
    background-size: cover;
    background-position: center;
    min-height: 550px;
    height: 100vh;
    min-width: 441px;
}

@media only screen and (max-width: 800px) {
    .container-login {
        margin-left: 100px;
    }
}

@media only screen and (max-width: 700px) {
    .container-login {
        margin-left: 50px;
    }
}

@media only screen and (max-width: 540px) {
    .container-login {
        margin-left: 10px;
        margin-right: 10px;
    }

    .background-image {
        min-width: 341px;
    }
}
</style>