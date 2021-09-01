<template lang="html">
  <div class="profile-widget">
    <div class="profile-widget_main" @click="openProfileWidget()">
      <img
        :src="require('../../assets/img/avatar.svg').default"
        class="profile-widget_main__avatar"
      />
      <p class="profile-widget_main__text">{{ user ? user.name : 'user' }}</p>
      <img
        :src="require('../../assets/img/arrow.svg').default"
        :class="[
          isArrow
            ? 'profile-widget_main__arrow'
            : 'profile-widget_main__arrow-rotate',
        ]"
      />
    </div>
    <div
      :class="[isArrow ? 'profile-widget_block' : 'profile-widget_block__none']"
    >
      <div class="d-flex flex-column justify-content-start w-75">
        <div class="profile-widget_el">
          <router-link to="/lk/profile">
            <img
              :src="require('../../assets/img/profile.svg').default"
              height="20px"
              class="mr-3"
            />
            Профиль
          </router-link>
        </div>
        <div class="profile-widget_el">
          <router-link to="/support">
            <img
              :src="require('../../assets/img/support.svg').default"
              height="20px"
              class="mr-3"
            />
            Поддержка
          </router-link>
        </div>
      </div>
      <button type="button" class=" btn custom_btn" @click="performLogout">
        Выйти
      </button>
    </div>
    <!-- <button type="button" class=" btn custom_btn" @click="performLogout">Выйти</button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      err: '',
      isArrow: false,
        user: null
    }
  },
  methods: {
    performLogout() {
      this.$store
        .dispatch('performLogoutAction')
        .then(res => {
          this.$router.push('/login')
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    openProfileWidget: function() {
      this.isArrow = !this.isArrow
    },
  },
    beforeCreate() {
        axios
            .get('./check-auth')
            .then(res => {
                if (res.data) {
                    this.user = res.data
                }
            })
            .catch(error => {
                // error.response.status Check status code
            })
            .finally(() => {
                //Perform action in always
            })
    },
}
</script>

<style lang="css" scoped>
.profile-widget {
  position: fixed;
  right: 37px;
  top: 77px;
  width: 285px;
}

.profile-widget_main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto 26px auto;
  cursor: pointer;
}

.profile-widget_main__avatar {
  width: 50px;
  height: 50px;
}

.profile-widget_main__arrow-rotate {
  transform: rotate(180deg);
}

.profile-widget_main__text {
  margin: 0;
}

.profile-widget_el {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 90%;
  margin-bottom: 25px;

  color: #9fa1b7;
}

.profile-widget_el:last-child {
  margin-bottom: 46px;
}

.profile-widget_block {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  /* height: 244px; */

  background-color: #3b3c72;
  border-radius: 6px;
}

.profile-widget_block__none {
  display: none;
}

@media (max-width: 1024px) {
  .profile-widget {
    display: none;
  }
}
</style>
