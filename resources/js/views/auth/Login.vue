<template lang="html">
  <div class="auth-form">
    <div class="auth-form_block-main">
      <div>
        <div class="card">
          <router-link to="/">
            <img
              :src="require('../../assets/img/cancel2.png').default"
              class="auth-form_cancel"
            />
          </router-link>
          <h3 class="text-center auth-form_header">ВХОД</h3>

          <div class="card-body">
            <div class="form-group">
              <label for="email">Имя пользователя</label>
              <input
                type="text"
                name="name"
                class="form-control"
                placeholder="Введите логин"
                v-model="name"
                :class="{ invalid: errors.login }"
              />
            </div>
            <p class="text-danger">{{ this.errors.login }}</p>

            <div class="form-group">
              <label for="password">Пароль</label>
              <div class="password-block">
                <input
                  type="password"
                  name="password"
                  class="form-control"
                  id="password"
                  placeholder="Введите пароль"
                  v-model="password"
                  @keyup.enter="performRegister"
                  :class="{ invalid: errors.password }"
                />
                <img
                  :src="require('../../assets/img/none-eye.svg').default"
                  class="password-control"
                  @click="show_hide_password"
                />
              </div>
              <p class="text-danger">{{ this.errors.password }}</p>
              <p class="text-danger">{{ this.errors.message }}</p>
              <router-link
                to="/reset-password"
                style="font-family:Comfortaa; display: block; margin-top: 10px;"
                >Забыли пароль?
              </router-link>
            </div>
            <p class="text-danger">{{ error }}</p>

            <div class="">
              <div class="auth-form_block-ckeck">
                <div class="form-group auth-form_ckeck">
                  <button
                    @click="performLogin"
                    type="button"
                    name="button"
                    class="btn-create_page mr-0"
                  >
                    ВОЙТИ
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div class="auth-form_ckeck-text">
                <router-link to="/register" style="font-family:Comfortaa;"
                  >Создать аккаунт
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import view from '../../assets/img/eye.svg'
import noView from '../../assets/img/none-eye.svg'

export default {
  data() {
    return {
      name: '',
      password: '',
      errors: {
        login: '',
        password: '',
        message: '',
      },
    }
  },
  mounted() {
    //
  },
  methods: {
    performLogin() {
      this.errors.login = ''
      this.errors.message = ''
      this.errors.password = ''
      this.$store
        .dispatch('performLoginAction', {
          name: this.name,
          password: this.password,
        })
        .then(res => {
          this.$router.push('/lk')
        })
        .catch(err => {
          if (err.response.data.errors) {
            err.response.data.errors.name
              ? (this.errors.login = err.response.data.errors.name[0])
              : ''
            err.response.data.errors.password
              ? (this.errors.password = err.response.data.errors.password[0])
              : ''
          } else {
            err.response.data.error
              ? (this.errors.message = err.response.data.error)
              : ''
          }
        })
    },
    show_hide_password() {
      let input = document.getElementById('password')
      let linkA = document.getElementsByClassName('password-control')[0]
      if (input.getAttribute('type') == 'password') {
        linkA.src = view
        input.setAttribute('type', 'text')
      } else {
        linkA.src = noView
        input.setAttribute('type', 'password')
      }
      return false
    },
  },
}
</script>

<style lang="css" scoped>
.card {
  background: #413a80;
  border-radius: 6px;
  max-width: 500px;
  padding: 53px 72px 22px 72px;
  margin: 0 auto;
}

.card-body {
  padding: 0;
}

.auth-form_block-main {
  display: block;
  margin: 0 auto;
}

.auth-form input {
  height: 57px;
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  color: #18163c;
  padding: 17px 0 17px 24px;
  box-shadow: none;
  outline: none;
  border: none;
}

.auth-form input:focus {
  outline: none;
  box-shadow: none;
}

.auth-form input:focus {
  outline: 0;
  outline-offset: 0;
  border: none;
  box-shadow: none;
}

.auth-form input:active {
  outline: 0;
  outline-offset: 0;
  border: none;
  box-shadow: none;
}

.auth-form {
  display: block;
  margin: 0 auto;
  background: #23203f;

  font-family: Rubik;
  color: white;
  padding-top: 50px;
}

input.invalid {
  border: red solid 2px;
  border-radius: 4px;
}

.password-block {
  position: relative;
}

.password-control {
  position: absolute;
  top: 15px;
  right: 15px;
  display: inline-block;
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.password-control_repeat {
  position: absolute;
  top: 15px;
  right: 15px;
  display: inline-block;
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.auth-form_header {
  font-family: Comfortaa;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  text-transform: uppercase;
  color: #ffffff;
  margin-bottom: 55px;
}

.auth-form label {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  color: #ffffff;
}

.auth-form_ckeck {
  width: 100%;
}

.auth-form_ckeck button {
  width: 100%;
}

.auth-form_ckeck-text {
  text-align: center;
}

#inlineRadio1 {
  display: inline-flex;
  align-items: center;
  user-select: none;
  margin-left: -30px;
}

#inlineRadio1::before {
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
  background: #413a80;
}

#inlineRadio1:checked::before {
  border-color: #0b76ef;
  background-color: #0b76ef;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}

.auth-form_ckeck-text {
  font-family: Comfortaa;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 150%;
  color: #ffffff;
}

.btn-create_page {
  font-family: Comfortaa;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 150%;
  text-transform: uppercase;
  color: #ffffff;
  margin-bottom: 24px;
}

.form-group{
  margin-bottom: 0;
}

.form-group_sign-text {
  font-family: Comfortaa;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  color: #ffffff;
  cursor: pointer;
}

.auth-form_cancel {
  position: absolute;
  right: 35px;
  top: -7px;
  cursor: pointer;
}

.router-link-active {
  position: absolute;
  display: inline-block;
  width: 0;
  height: 0;
  padding: 0;
  right: 0px;
  left: auto;
}

.auth-form_block-ckeck {
  margin-top: 32px;
}

@media (max-width: 768px) {
  .auth-form_cancel {
    right: 70px;
    top: -6px;
  }

  .auth-form label {
    font-size: 14px;
  }
}

@media (max-width: 500px) {
  .card {
    background: #413a80;
    border-radius: 6px;
    max-width: 500px;
    padding: 22px 20px 22px 20px;
  }

  .auth-form_header {
    font-family: Comfortaa;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 100%;
    text-transform: uppercase;
    color: #ffffff;
    margin-bottom: 35px;
  }

  .auth-form input {
    height: 50px;
    font-size: 14px;
  }

  .auth-form {
    padding: 40px 20px;
  }

  .btn-create_page {
    font-size: 14px;
  }

  .auth-form_cancel {
    width: 26px;
    height: 26px;
    position: absolute;
    top: -3px;
    right: 18px;
    cursor: pointer;
  }

  .router-link-active {
    position: absolute;
    display: inline-block;
    width: 0;
    height: 0;
    padding: 0;
    right: 0;
    left: auto;
  }
}
</style>
