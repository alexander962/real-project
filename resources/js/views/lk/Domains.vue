<template lang="html">
    <div class="wrapper">
        <div>
            <b-button v-b-toggle.collapse-1 class="mt-2">Домены</b-button>

            <router-link to="/lk/instructions">
                <a href="" class="info d-block mt-3">
                    <u>Подробная инструкция по добавлению домена</u>
                </a>
            </router-link>

            <router-link to="/lk/instructions">
                <a href="" class="info d-block mt-3">
                    <u>Подробная инструкция по подтверждению домена на стороне Facebook</u>
                </a>
            </router-link>


            <form class="" @submit.prevent="bindDomain" method="post">
                <div>
                    <!-- Редактирование профиля -->
                    <b-button v-b-toggle.collapse-2 class="mt-5" style="font-size: 24px">Укажите имя домена</b-button>

                    <b-collapse id="collapse-1" class="mt-4 ml-2" visible>
                        <input type="text" v-model="form.domain" placeholder="domain.com">
                        <button class="btn-create_page" type="submit">Привязать домен</button>
                        <span>{{ success_message }}</span>
                    </b-collapse>
                </div>

                <div class="d-flex justify-content-start">
                </div>
            </form>

            <p class="info">Если у вас нет доменного имени, вы можете зарегестрирвоать его в REG.RU</p>
            <p class="info mt-4">Для подключения сначала добавьте новую А-запись для вашего домена с IP, а затем введите
                ваш домен и нажмите “Подключить домен”.</p>


            <div style="position: relative;">
                <input id="ip" type="text" readonly :placeholder="ip">
                <input type="hidden" :id="'copyId'" :value="ip">

                <span @click.stop.prevent="copyLink" class="copyIcon">
                <img :src="require('../../assets/img/copy-profile.svg').default" height="20px">
            </span>
            </div>

            <table class="table table-dark mt-5">
                <thead>
                <tr>
                    <th scope="col">Домены</th>
                    <th scope="col">Статус</th>
                    <th scope="col">Страниц</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="domain in domains">
                    <td>{{ domain.name }}</td>
                    <td>{{ domain.status == 1 ? 'Привязан' : 'Ошибка ?'}}</td>
                    <td>
                        <button @click="showPages(domain)">{{ domain.subscription_pages.length }}</button>
                    </td>
                </tr>
                </tbody>
            </table>

            <div v-if="showPageList" class="pageList">
                <p></p>
                <ul class="list-group" v-if="pageLists.length > 0" v-for="pageList in pageLists">
                    <li class="list-group-item" style="background: #3B3C72;">{{ pageList.page_name }}</li>
                </ul>
            </div>
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
                    domain: '',
                },
                user: null,
                success_message: '',
                domains: [],
                ip: '',
                showPageList: false,
                pageLists: []
            }
        },
        methods: {
            bindDomain() {
                let formData = new FormData();
                formData.append("domain", this.form.domain);

                axios.post('./bind-domain', formData)
                    .then((res) => {
                        alert(res.data.message);
                        this.form.domain = '';
                        this.domains = res.data.domains;
                    })
                    .catch((error) => {
                        this.password_errors = error.response.data.errors;
                        // error.response.status Check status code
                    }).finally(() => {
                    //Perform action in always
                });
            },

            showPages(domain) {
                console.log(domain)
                this.pageLists = domain.subscription_pages;
                this.showPageList = true;
            },

            copyLink() {
                let testingCodeToCopy = document.querySelector('#copyId');
                testingCodeToCopy.setAttribute('type', 'text');
                testingCodeToCopy.select();

                try {
                    var successful = document.execCommand('copy');
                    var msg = successful ? 'successful' : 'unsuccessful';
                    alert('Testing code was copied ' + msg);
                } catch (err) {
                    alert('Oops, unable to copy');
                }

                /* unselect the range */
                testingCodeToCopy.setAttribute('type', 'hidden')
                window.getSelection().removeAllRanges()
            }

        },

        created() {
            axios.get('./get-user')
                .then(response => {
                    this.user = response.data;
                    this.domains = this.user.domains;
                });

            axios.get('./get-service-ip')
                .then(response => {
                    this.ip = response.data;
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
        display: inline-block;
        justify-content: center;
        align-items: center;
        padding: 13px 50px;
        margin-right: 40px;
        margin-left: 40px;
        font-family: Comfortaa;
        color: white;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 150%;
        cursor: pointer;
        background: linear-gradient(118.66deg, #FE2363 31.25%, #FE2363 33.84%, #E20042 67.67%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 6px;
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

    .info {
        width: 668px;
        height: 20px;
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 150%;
        color: #ABA7A7;
    }

    #ip {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 10px 45px;
        margin-top: 50px;
        width: 210px;
        height: 45px;
        background: #17163C;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 6px;
    }

    .table {
        width: 844px;
        height: 180px;
        background: #3B3C72;
        opacity: 0.5;
        border-radius: 4.44739px;
        color: white
    }

    thead {
        width: 844px;
        height: 41px;
        background: #3B3C72;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 4.44739px 4.44739px 0px 0px;
        color: white
    }

    tr {
        text-align: center;
    }

    th {
        text-align: center;
    }

    .copyIcon {
        position: absolute;
        z-index: 10000;
        left: 21%;
        top: 25%;
        cursor: pointer
    }
</style>
