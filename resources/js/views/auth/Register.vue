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
          <h3 class="text-center auth-form_header">РЕГИСТРАЦИЯ</h3>

          <div class="card-body">
            <div class="form-group">
              <label for="email">Имя пользователя</label>
              <input
                type="text"
                name="name"
                class="form-control"
                placeholder="Введите логин"
                v-model="name"
                :class="{ invalid: errors.name }"
              />
              <p class="text-danger" v-if="errors.name">{{ errors.name[0] }}</p>
            </div>
            <div class="form-group">
              <label for="email">Email адрес</label>
              <input
                type="text"
                name="email"
                class="form-control"
                placeholder="Введите Email"
                v-model="email"
                :class="{ invalid: errors.email }"
              />
              <p class="text-danger" v-if="errors.email">
                {{ errors.email[0] }}
              </p>
            </div>
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
                  :class="{ invalid: errors.password }"
                />
                <img
                  :src="require('../../assets/img/none-eye.svg').default"
                  class="password-control"
                  @click="show_hide_password"
                />
              </div>
              <p class="text-danger" v-if="errors.password">
                {{ errors.password[0] }}
              </p>
            </div>
            <div class="form-group">
              <label for="password_confirmation">Подтвердите пароль</label>
              <div class="password-block">
                <input
                  type="password"
                  id="password-repeat"
                  class="form-control"
                  placeholder="Повторите пароль"
                  v-model="password_confirmation"
                  :class="{ invalid: errors.password }"
                  @keyup.enter="performRegister"
                />

                <img
                  :src="require('../../assets/img/none-eye.svg').default"
                  class="password-control_repeat"
                  @click="show_hide_password_repeat"
                />
              </div>
            </div>

            <div class="form-group auth-form_ckeck">
              <input
                class="form-check-input"
                type="checkbox"
                name="accept_rules"
                id="inlineRadio1"
                value="1"
                required
                v-model="accept_rules"
              />
              <label
                class="form-check-label accept-text"
                style="font-family: Comfortaa;"
                for="inlineRadio1"
                ><span class="auth-form_ckeck-text">
                  Нажимая кнопку “создать аккаунт”, я принимаю
                  <router-link to="/offer"><u>публичную оферту</u></router-link>
                  и
                  <router-link to="/confidentiality"
                    ><u>политику конфиденциальности</u></router-link
                  >
                  сервиса InstaGo.link”
                </span>
              </label>
            </div>

            <p
              class="text-danger auth-form_ckeck-error"
              v-if="errors.accept_rules"
            >
              {{ errors.accept_rules[0] }}
            </p>

            <div>
              <div>
                <div class="form-group auth-form_block-btns">
                  <button
                    @click="performRegister"
                    type="button"
                    name="button"
                    class="btn-create_page mr-0"
                  >
                    СОЗДАТЬ АККАУНТ
                  </button>
                  <router-link to="/login">
                    <span class="form-group_sign-text">Войти</span>
                  </router-link>
                </div>
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
      email: '',
      password: '',
      password_confirmation: '',
      accept_rules: '',
      errors: '',
    }
  },
  methods: {
    performRegister() {
      this.$store
        .dispatch('performRegisterAction', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          accept_rules: this.accept_rules,
          ref: localStorage.referrerCode,
        })
        .then(res => {
          // console.log(res)
          this.$router.push('/lk')
        })
        .catch(err => {
          // console.log(err.response.data.errors)
          this.errors = err.response.data.errors
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
    show_hide_password_repeat() {
      let input = document.getElementById('password-repeat')
      let linkA = document.getElementsByClassName('password-control_repeat')[0]
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
  outline: 0;
  outline-offset: 0;
  border: none;
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
  padding-top: 28px;
  padding-bottom: 28px;
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
  display: flex;
  align-items: center;
  max-width: 310px;
  margin-left: 30px;
  margin-bottom: 40px;
}

.auth-form_ckeck-error {
  margin-top: -30px;
  margin-bottom: 40px;
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
  /* line-height: 150%; */
  color: #ffffff;
}

.auth-form_ckeck-text a {
  line-height: 5px;
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

.auth-form_block-btns {
  text-align: center;
  width: 100%;
}

.auth-form_block-btns button {
  text-align: center;
  width: 100%;
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

.auth-form_ckeck-text u {
  font-family: Comfortaa;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  color: #ffffff;
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
