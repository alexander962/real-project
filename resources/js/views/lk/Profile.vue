<template lang="html">
    <div class="wrapper">
        <div>
            <form class="" @submit.prevent="updateProfile" method="post" enctype="multipart/form-data">
                <div>
                    <!-- Редактирование профиля -->
                    <b-button v-b-toggle.collapse-1 class="m-1">Редактирование профиля</b-button>

                    <b-collapse id="collapse-1" class="mt-2" visible>
                        <img :src="require('../../assets/img/profile2.svg').default" height="50px">

                        <b-card class="photo">Загрузить аватар</b-card>
                        <input type="file" class="" id="photo" accept="image/*" v-on:change="avatarChange">

                        <b-card>Имя пользователя<span class="star">*</span></b-card>
                        <input type="text" v-model="form.name" :placeholder="this.user.name">

                        <b-card>E-mail адрес<span class="star">*</span></b-card>
                        <input type="email" v-model="form.email" :placeholder="this.user.email">

                    </b-collapse>
                </div>

                <div class="d-flex justify-content-start">
                    <button class="btn-create_page" type="submit">Сохранить</button>
                </div>
            </form>


            <form class="" @submit.prevent="passwordReset" method="post" enctype="multipart/form-data">
                <div>
                    <!-- Редактирование пароля -->
                    <b-collapse id="collapse-1" class="mt-4" visible>
                        <ul class="password-error" v-for="password_error in password_errors">
                            <li>{{ password_error[0] }}</li>
                        </ul>

                        <b-card>Старый пароль<span class="star">*</span></b-card>
                        <input type="text" v-model="form.old_password" placeholder="Ввведите старый пароль" required>

                        <b-card>Новый пароль<span class="star">*</span></b-card>
                        <input type="text" v-model="form.new_password" placeholder="Введите новый пароль" required>

                        <b-card>Подтверждение нового пароля<span class="star">*</span></b-card>
                        <input type="text" v-model="form.confirm_new_password" placeholder="Введите заново новый пароль"
                               required>

                    </b-collapse>
                </div>

                <div class="d-flex justify-content-start">
                    <button class="btn-create_page" type="submit">Изменить пароль</button>
                    <span class="password-error">{{ success_message }} </span>
                </div>
            </form>


        </div>
        <profile-widget></profile-widget>
    </div>
</template>

<script>
    import ProfileWidget from './ProfileWidget.vue'

    export default {
        components: {
            ProfileWidget,
        },
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    avatar: '',
                    old_password: '',
                    new_password: '',
                    confirm_new_password: ''
                },
                user: null,
                password_errors: [],
                success_message: ''
            }
        },
        methods: {
            updateProfile() {
                let formData = new FormData();
                formData.append("avatar", this.form.avatar);
                formData.append("name", this.form.name);
                formData.append("email", this.form.email);

                axios.post('./update-profile', formData)
                    .then((res) => {
                        //Perform Success Action
                        alert('Профиль обновлен');
                        this.user = res.data;
                    })
                    .catch((error) => {
                        alert(error.data.errors);
                        // error.response.status Check status code
                    }).finally(() => {
                    //Perform action in always
                });

            },

            passwordReset() {
                let formData = new FormData();
                formData.append("old_password", this.form.old_password);
                formData.append("new_password", this.form.new_password);
                formData.append("confirm_new_password", this.form.confirm_new_password);

                axios.post('./update-password', formData)
                    .then((res) => {
                        //Perform Success Action
                        this.form.old_password = '';
                        this.form.new_password = '';
                        this.form.confirm_new_password = '';
                        this.success_message = res.data.success
                        this.password_errors = [];
                    })
                    .catch((error) => {
                        this.password_errors = error.response.data.errors;
                        // error.response.status Check status code
                    }).finally(() => {
                    //Perform action in always
                });

            },

            avatarChange(event) {
                this.form.avatar = event.target.files[0];
            }
        },
        computed: {},

        created() {
            console.log(111)
            axios.get('./get-user')
                .then(response => {
                    this.user = response.data
                    console.log(response.data)
                });
        }
    }
</script>

<style lang="css" scoped>
    .wrapper {
        width: 100%;
        margin-left: 113px;
        margin-right: 350px;
        margin-top: 178px;
    }

    h2 {
        margin: 0 0 60px 0;
        font-weight: bold;
        font-size: 36px;
    }

    input, select {
        width: 485px;
        height: 57px;

        padding: 24px 17px;
        margin-bottom: 57px;

        color: white;

        background: transparent;
        border: 1px solid #6368A0;
        box-sizing: border-box;
        border-radius: 6px;
    }

    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
        background-repeat: no-repeat;
        background-position-x: 96%;
        background-position-y: 50%;
    }

    .btn-create_page {
        display: flex;
        justify-content: center;
        align-items: center;

        /* width: 264px;
        height: 59px; */
        padding: 16px 50px;
        margin-right: 40px;

        font-family: Comfortaa;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 150%;

        cursor: pointer;

        background: linear-gradient(118.66deg, #FE2363 31.25%, #FE2363 33.84%, #E20042 67.67%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 6px;
    }

    .btn-cancel_create {
        padding: 16px 50px;
        margin-right: 40px;

        font-family: Comfortaa;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 150%;
        color: #6368A0;

        cursor: pointer;

        background-color: transparent;
        border-radius: 6px;
        border: #6368A0 solid 3px;

    }

    .accordion, .card, .card-body, .card-header {
        background: transparent;
        border: transparent;
    }

    .card-body {
        padding: 0.25rem;
    }

    .btn:focus, .btn:active {
        box-shadow: none !important;
        background: transparent !important;
    }

    .btn {
        background: transparent;
        border: none;

        text-align: left;
        font-size: 36px;
        font-weight: 700;
    }

    .star {
        color: #E20042;
        font-size: 30px;
    }

    #photo {
        border: none !important;
    }

    .password-error {
        color: #dc3544;
        margin-bottom: 29px;
    }
</style>
