<template lang="html">
  <div class="page_thanks_body">
    <div class="page_thanks_container">
        <div class="page_thanks_content">
            <div class="page_thanks_icon">
                <img :src="require('../../assets/img/ok_icon.svg').default">
            </div>
            <div class="page_header">
                {{ popup_title }}
            </div>
            <div class="page_header_line"></div>
            <span>
                {{ popup_text }}
            </span>
            <div class="btn-page" @click="get"><span>{{ popup_button_text }}</span></div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            popup_title: "Спасибо!",
            popup_text: "Успешно\r\n\r\nМожете получить материалы, нажав по кнопке ниже.",
            popup_button_text: "Получить материалы",
            popup_button_url: ""
        }
    },
    async beforeRouteEnter(to, from, next) {
        const redirect = {path: '/page/' + to.params.username};
        if (!localStorage.taskId) {
            return next(redirect);
        }

        axios.post('/api/task/get/', { username: to.params.username, task_id: localStorage.taskId, type: 2 })
            .then((res) => {
                const data = res.data.data;
                if (data) {
                    return next(vm => {
                        for (const key in data) {
                            vm.$emit('update', 'type-' + data.bg_color);
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
        get() {
            window.location = this.popup_button_url;
        }
    }
}
</script>

<style lang="css" scoped>
    .page_thanks_body {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
    }
    .page_thanks_container {
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        height: 100%;
        width: 100%;
    }
    .page_thanks_content {
        background: #3B3C72;
        position: relative;
        max-width: 580px;
        min-width: 420px;
        padding: 60px 40px;
        background: rgba(255, 255, 255, .1);
        -webkit-box-shadow: 5px 5px 40px rgb(0 0 0 / 20%);
        box-shadow: 5px 5px 40px rgb(0 0 0 / 20%);
        border-radius: 7px;
        margin-top: 50px;
    }
    .page_body.type-1 .page_thanks_content {
        background: #6368A0;
    }
    .page_body.type-2 .page_thanks_content {
        background: #14779A;
    }
    .page_body.type-3 .page_thanks_content {
        background: #FFFFFF;
        border: 1px solid #CACACA;
        box-shadow: none;
    }
    .page_body.type-4 .page_thanks_content {
        background: #5C3A63;
    }
    .page_body.type-5 .page_thanks_content {
        background: #153351;
    }
    .page_body.type-6 .page_thanks_content {
        background: #423F86;
    }
    .page_body.type-7 .page_thanks_content {
        background: #1A2C3C;
    }
    .page_thanks_icon {
        width: 141px;
        height: 141px;
        position: absolute;
        top: -44px;
        right: -44px;
        background: #FE2363;
        border-radius: 100%;
    }
    img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 63px;
        height: 50px;
    }
    .page_header {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 36px;
        line-height: 150%;
        margin-bottom: 45px;
    }
    .page_header_line {
        display: none;
    }
    .page_body.type-3 .page_header_line {
        display: block;
        width: calc(100% + 80px);
        height: 1px;
        margin-left: -40px;
        margin-top: -20px;
        margin-bottom: 20px;
        background: #CACACA;
    }
    .page_thanks_content > span {
        display: block;
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        line-height: 150%;
        margin-bottom: 40px;
    }
    @media (max-width: 769px) {
        .page_thanks_content {
            min-width: 310px;
            max-width: 310px;
        }
        .page_thanks_icon {
            width: 80px;
            height: 80px;
            top: -30px;
            right: -20px;
        }

        .page_thanks_icon img {
            width: 40px;
        }
    }
</style>


