<template lang="html">
  <div class="page_subscription_body">
    <div class="page_avatar_popup" v-bind:class="{ 'd-none': !popupState }">
        <div class="page_avatar_popup_bg">            
        </div>
        <div class="page_avatar_popup_content">
            <div v-if="popupState==1">После подписки <span>вернись</span> на эту страницу для подтверждения</div>
            <div v-if="popupState==2">
                <div class="loader"></div>
                <div>Проверяем подписку...</div>
            </div>
            <div v-if="popupState==3">
                <img :src="require('../../assets/img/attention_icon.svg').default">
                <div>Вы не подписались!</div>
            </div>
            <div v-if="popupState==4">
                <img :src="require('../../assets/img/ok_icon.svg').default">
                <div>Аккаунт найден!</div>
            </div>
        </div>
    </div>
    <div class="page_subscription_container">
        <div class="page_avatar_container">
            <img v-if="instagram_avatar" :src="instagram_avatar">
            <div v-else class="page_avatar_img"></div>
            <div class="page_avatar_info">
                <span>{{ instagram_username }}</span>
                <div class="page_insta_link">
                    <img :src="require('../../assets/img/instagram_icon.svg').default" height="19px"> {{ instagram_username }}
                </div>
            </div>
        </div>
        <div class="page_subscription_description">
            {{ state ? 'Введите ваш логин инстаграма для проверки подписки' : presubscribe_text }}
        </div>
        <div style="text-align:left">
            <timer v-if="is_timer_active" v-bind:text="timer_text" v-bind:time="timer_time"></timer>
            <div v-if="state" class="page_subscription_username">
                <span class="page_subscription_username_left">@</span>
                <div class="page_subscription_username_right">
                    <img :src="require('../../assets/img/question_icon.svg').default">
                    <div class="page_subscription_username_right_popup">
                        <div></div>
                        <span>{{ instagram_username }}</span>
                    </div>
                </div>
                <input v-model="username" type="text" name="" placeholder="Введите ваш логин">
            </div>
            <div class="btn-page" v-if="state" @click="check"><img :src="require('../../assets/img/ok_icon.svg').default" height="19px"><span>Я подписался</span></div>
            <div class="btn-page" v-else @click="setSub"><img :src="require('../../assets/img/add_icon.svg').default" height="19px"><span>Подписаться</span></div>
        </div>
        <div class="page_subscription_sub">
            <div v-if="state" @click="redirectInst">Не подписался?</div>
            <div v-else @click="setSubAlready">Я уже подписался</div>
        </div>
    </div>
  </div>
</template>

<script>
import Timer from '../../components/element/Timer.vue'
export default {
    data() {
        return {
            state: localStorage.taskState,
            popupState: 0,
            username: "",
            presubscribe_text: "Подпишись на мой инстаграм и ссылка для скачивания станет доступна",
            instagram_username: "",
            is_timer_active: false,
            instagram_avatar: false
        }
    },
    components: {
        Timer
    },
    async beforeRouteEnter(to, from, next) {
        const redirect = {path: '/page/' + to.params.username};
        if (!localStorage.taskId) {
            return next(redirect);
        }

        axios.post('/api/task/get/', { username: to.params.username, task_id: localStorage.taskId, type: 1 })
            .then((res) => {
                const data = res.data.data;
                if (data) {
                    return next(vm => {
                        vm.$emit('update', 'type-' + data.bg_color);
                        for (const key in data) {
                            if (data[key]) vm[key] = data[key]; 
                        }
                    })
                } else {
                    return next(redirect);
                }
            }).catch(() => {
                return next(redirect);
            });
    },
    methods: {
        setSub() {
            let vm = this;
            this.state = 1;
            this.popupState = 1;
            localStorage.taskState = 1;
            setTimeout(() => window.location = vm.getUrl(), 3000);
        },
        check() {
            this.popupState = 2;
            axios.post('/api/task/check', { task_id: localStorage.taskId, username: this.username }).then((res) => {
                if (res.data.success) {
                    this.popupState = 4;
                    localStorage.instUsername = this.username;
                    setTimeout(() => this.$router.push({ name: 'page-success', params: { username: this.$route.params.username }}), 3000);
                } else {
                    this.setFailed();
                }
            }).catch((error) => {
                this.setFailed();
            });
        },
        setSubAlready() {
            this.state = 1;
            localStorage.taskState = 1;
        },
        redirectInst() {
            window.open(this.getUrl(), '_blank');
        },
        getUrl() {
            return 'https://www.instagram.com/' + this.$route.params.username;
        },
        setFailed() {
            this.popupState = 3;
            setTimeout(() => this.popupState = 0, 3000);
        }
    }
}
</script>

<style lang="css" scoped>
    .page_subscription_body {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
    }
    .page_subscription_container { 
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 450px;
        align-items: center;
    }
    .page_avatar_container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 228px;
        height: 227px;

        background: #17163C;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 6px;
        align-items: center;
    }

    .page_avatar_container > img {
        max-height: 97px;
        max-width: 97px;
        border-radius: 100px;
    }
    .page_avatar_container > .page_avatar_img {
        -webkit-mask: url('../../assets/img/avatar.svg') no-repeat center;
        mask: url('../../assets/img/avatar.svg') no-repeat center;
        max-height: 97px;
        max-width: 97px;
        border-radius: 100px;
        width: 100%;
        height: 100%;
        background: #6368A0;
        box-shadow: 0px 7.76px 7.76px rgb(0 0 0 / 25%);
    }
    .page_body.type-1 .page_avatar_container > .page_avatar_img {
        background: #9094C1;
    }
    .page_body.type-2 .page_avatar_container > .page_avatar_img {
        background: #58A5BF;
    }
    .page_body.type-3 .page_avatar_container > .page_avatar_img {
        background: #CACACA;
    }
    .page_body.type-4 .page_avatar_container > .page_avatar_img {
        background: #8E5C99;
    }
    .page_body.type-5 .page_avatar_container > .page_avatar_img {
        background: #34639A;
    }
    .page_body.type-6 .page_avatar_container > .page_avatar_img {
        background: #5E73BE;
    }
    .page_body.type-7 .page_avatar_container > .page_avatar_img {
        background: #3C6080;
    }
    .page_avatar_info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 150%;
    }
    .page_avatar_info span {
        margin-bottom: 10px;
    }
    .page_subscription_description {
        font-family: Montserrat;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 150%;
        text-align: center;
        margin-top: 53px;
    }
    .page_subscription_sub div {
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 150%;
        margin-top: 10px;
        cursor:pointer;

        text-decoration-line: underline;
    }
    .page_body.type-3 .page_subscription_sub div {
        color: #898989;
    }
    .page_avatar_popup {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
    }
    .page_avatar_popup_bg {
        width: 100%;
        height: 100%;
        background: #000000;
        opacity: 0.35;
    }

    .page_avatar_popup_content {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        left: 50%;
        max-width: 352px;
        width: 80%;

        background: #3B3C72;
        border-radius: 6px;
        padding: 42px 53px;

        font-family: Comfortaa;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 150%;

        text-align: center;
        
    }

    .page_avatar_popup_content img {
        width: 55px;
        height: auto;
        margin-bottom: 30px;
    }

    .page_avatar_popup_content span {
        color: #fe2363;
    }

    .page_subscription_username {
        position: relative;
        margin-bottom: 27px;
    }

    input {
        outline: none;
        border: 2px solid transparent;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 6px 30px;

        height: 40px;

        background: #17163C;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 6px;

        font-family: Comfortaa;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 150%;
        color: #fff;
    }
    input:hover, input:focus {
        border-color: rgba(43, 46, 78, .6);
    }
    .page_subscription_username_left {
        position: absolute;
        top: 6px;
        left: 10px;
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 150%;
    }
    .page_subscription_username_right {
        position: absolute;
        top: 2px;
        right: 2px;
        width: 35px;
        height: 35px;
    }

    .page_subscription_username_right img {
        position: absolute;
        top: 9px;
        right: 11px;
    }

    .page_subscription_username_right_popup {
        position: absolute;
        top: -190px;
        right: -2px;
        width: 320px;
        background-color: #fff;
        border-radius: 5px;
        opacity: 0;
        z-index: -1;
        -webkit-transition: all .6s;
        transition: all .6s;
    }

    .page_subscription_username_right img:hover + .page_subscription_username_right_popup {
        opacity: 1;
        z-index: 999;
    }

    .page_subscription_username_right_popup:before {
        content: '';
        position: absolute;
        right: 10px;
        bottom: -19px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 20px solid #3C4070;
        z-index: -1;
    }

    .page_subscription_username_right_popup div {
        height: 141px;
    }
    .page_subscription_username_right_popup span {
        display: block;
        background-color: #3B3C72;
        padding-left: 20px;
        text-align: left;
        line-height: 40px;
        border-radius: 0 0 5px 5px;
        color: #ffffff82;
    }

    .loader, .loader:after {
        border-radius: 50%;
        width: 70px;
        height: 70px;
    }
    .loader {
            margin: 20px auto 40px auto;
        font-size: 10px;
        position: relative;
        text-indent: -9999em;
        border-top: 5px solid #ffffff00;
        border-right: 5px solid #ffffff;
        border-bottom: 5px solid #ffffff;
        border-left: 5px solid #ffffff;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation: load 1.1s infinite linear;
        animation: load8 1.1s infinite linear;
    }
    .page_body.type-3 .page_subscription_username_right_popup {
        border: 1px solid #CACACA;
    }
    .page_body.type-1 .page_avatar_container, .page_body.type-1 input, .page_body.type-1 .page_avatar_popup_content, .page_body.type-1 .page_subscription_username_right_popup span {
        background: #6368A0;
    }

    .page_body.type-2 .page_avatar_container, .page_body.type-2 input, .page_body.type-2 .page_avatar_popup_content, .page_body.type-2 .page_subscription_username_right_popup span {
        background: #14779A;
    }
    .page_body.type-3 .page_avatar_container, .page_body.type-3 input, .page_body.type-3 .page_avatar_popup_content {
        background: #FFFFFF;
        border: 1px solid #CACACA;
        box-shadow: none;
        color: #3F3F3F;
    }
    .page_body.type-3 .page_subscription_username_right_popup span {
        background-color: #3F3F3F;
        color: #fff;
    }
    .page_body.type-1 .page_subscription_username_right_popup:before {
        border-top-color: #6368A0;
    }
    .page_body.type-2 .page_subscription_username_right_popup:before {
        border-top-color: #14779A;
    }
    .page_body.type-3 .page_subscription_username_right_popup:before {
        border-top-color: #3F3F3F;
    }
    .page_body.type-4 .page_subscription_username_right_popup:before {
        border-top-color: #5C3A63;
    }
    .page_body.type-5 .page_subscription_username_right_popup:before {
        border-top-color: #153351;
    }
    .page_body.type-6 .page_subscription_username_right_popup:before {
        border-top-color: #423F86;
    }
    .page_body.type-7 .page_subscription_username_right_popup:before {
        border-top-color: #1A2C3C;
    }
    .page_body.type-4 .page_avatar_container, .page_body.type-4 input, .page_body.type-4 .page_avatar_popup_content, .page_body.type-4 .page_subscription_username_right_popup span {
        background-color: #5C3A63;
    }
    .page_body.type-5 .page_avatar_container, .page_body.type-5 input, .page_body.type-5 .page_avatar_popup_content, .page_body.type-5 .page_subscription_username_right_popup span {
        background: #153351;
    }
    .page_body.type-6 .page_avatar_container, .page_body.type-6 input, .page_body.type-6 .page_avatar_popup_content, .page_body.type-6 .page_subscription_username_right_popup span {
        background: #423F86;
    }
    .page_body.type-7 .page_avatar_container, .page_body.type-7 input, .page_body.type-7 .page_avatar_popup_content, .page_body.type-7 .page_subscription_username_right_popup span {
        background: #1A2C3C;
    }

    @-webkit-keyframes load {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
        }
        @keyframes load8 {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
</style>


