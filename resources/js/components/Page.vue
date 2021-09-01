<template>
    <div class="page_body" :class="type">
        <div class="page_container">
            <router-view @update="updateClass" />
        </div>
        <div class="page_footer">
            <div class="page_made_by">
                Сделано при помощи <span>InstaGo</span>
            </div>
            <div class="page_policy">
                Политика конфиденциальности
            </div>
        </div>
    </div>
</template>

<script>

export default {
  data() {
    return {
        type: ""
    }
  },
  name: 'Page',
  methods: {
    updateClass(className) {
        this.type = className;
    }
  }
}
</script>

<style>
    .page_body {
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, #23203F 0%, #241E47 100%);        
    }
    .page_body.type-1 {
        background: linear-gradient(180deg, #9397C2 0%, #6368A0 100%);
    }
    .page_body.type-2 {
        background: linear-gradient(307deg, #76BBD0 19.55%, #2F87A6 83.49%);
    }
    .page_body.type-3 {
        background: #F9F9F9;
        color: #3F3F3F;
    }
    .page_body.type-4 {
        background: linear-gradient(102.16deg, #CB8AD5 0%, #AA70B3 30.34%, #945E9D 99.35%);
    }
    .page_body.type-5 {
        background: linear-gradient(102.61deg, #2C5380 0%, #173D62 37.31%, #003452 100%);
    }
    .page_body.type-6 {
        background: linear-gradient(131.23deg, #5E73BE 13.05%, #332367 73.35%);
    }
    .page_body.type-7 {
        background: linear-gradient(111.16deg, #1B2C3C 0%, #020305 69.56%);
    }
    .page_container {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-line-pack: center;
        align-content: center;
        position: relative;
        min-height: calc(100vh - 60px);
        padding: 40px 100px;
        /* justify-content: center; */
    }
    .page_footer {
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0 26px 0px;
    }
    .page_made_by {
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 150%;
    }
    .page_made_by span {
        color: #ff9cb9;
    }
    .page_policy {
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 10px;
        line-height: 150%;

        text-decoration-line: underline;

        color: #9FA1B7;
    }
    .page_body.type-2 .page_policy {
        color: #FFFFFF;
    }
    .page_body.type-3 .page_policy {
        color: #3F3F3F;
    }
    .page_body.type-4 .page_policy {
        color: #EAEAEA;
    }
    .page_body.type-5 .page_policy, .page_body.type-7 .page_policy {
        color: #9FA1B7;
    }
    .page_body.type-6 .page_policy {
        color: #FFFFFF;
    }
    .page_body.type-2 .page_made_by span, .page_body.type-3 .page_made_by span, .page_body.type-5 .page_made_by span, .page_body.type-6 .page_made_by span, .page_body.type-7 .page_made_by span {
        color: #e20042;
    }

    @media (max-width: 769px) {
        .page_container {
            padding: 10px;
        }
    }
</style>