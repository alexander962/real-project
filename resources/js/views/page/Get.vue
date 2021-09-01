<template lang="html">
  <div class="w-100">
    <div class="page_get_container w-100">
        <div v-if="page_photo" class="page_get_image">
            <div>
                <img :src="page_photo" />
            </div>
        </div>
        <div class="page_get_top w-100">
            <div class="page_header">
                {{ title }}
                <div class="page_header_line"></div>
            </div>
            <div class="page_description">
                {{ description }}
            </div>
        </div>

        <div class="page_get_middle">
            <timer v-if="is_timer_active" v-bind:text="timer_text" v-bind:time="timer_time"></timer>
            <div class="btn-page" @click="nextPage"><span>{{ button_text }}</span></div>
        </div>
    </div>
  </div>
</template>

<script>
import Timer from '../../components/element/Timer.vue'
export default {
    data() {
        return {
            page_photo: false,
            is_timer_active: false,
            title: "Зарятатка",
            description: "Скачайте на ваш рабочий стол обои прикольные высокого качества размеры 1280х1024 1366х765 1600х1050 1440х900 1920х1080 2560х1440 2560х1600. Все картинки отбираются вручную и тщательно описываются они украсят ваш рабочий стол и поднимут вам настроение.",
            button_text: "Получить"
        }
    },
    components: {
        Timer
    },
    async beforeRouteEnter(to, from, next) {
        axios.post('/api/task/get', { username: to.params.username, task_id: localStorage.taskId, type: 0 })
            .then((res) => {
                const data = res.data.data;
                if (data) {
                    return next(vm => {
                        vm.$emit('update', 'type-' + data.bg_color);
                        for (const key in data) {
                            if (data[key]) vm[key] = data[key]; 
                        }
                        if (res.data.taskId) localStorage.taskId = res.data.taskId;
                    })
                } else {
                    return next();
                }
            }).catch(() => {
                return next();
            });
    },
    methods: {
        nextPage() {
            let username = this.$route.params.username;
            this.$router.push({ name: 'subscribe', params: { username }});
        }
    }
}
</script>

<style lang="css" scoped>
    .page_header_line {
        display: none;
    }
    .page_body.type-3 .page_header_line {
        margin-top: 20px;
        display: block;
        border: 1px solid #CACACA;
            width: 100%;
    }
    .page_get_middle {
        max-width: 400px;
        width: 100%;
    }
    .page_header {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 36px;
        line-height: 150%;

        margin: 33px 0;
    }
    .page_description {
        font-family: Rubik;
        font-style: normal;
        font-weight: 300;
        font-size: 18px;
        line-height: 150%;
        margin-bottom: 50px;
    }

    .page_body.type-3 .page_description, .page_body.type-3 .page_header {
        color:#3F3F3F;
    }
    .page_get_image {
        height: 379px;
    }

    .page_get_image div {
        width: 100%;
        height: 379px;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .page_get_image img {
        width: auto;
        max-height: 100%;
        max-width: 100%;
    }

    @media (max-width: 769px) {
        .page_get_top {
            width: 100%;
        }
    }
</style>


