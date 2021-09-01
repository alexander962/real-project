<template>
  <div class="auth-form">
    <div class="auth-form_block-main">
      <div>
        <div class="card card-default">
          <h3 class="text-center auth-form_header">ВОССТАНОВИТЬ ПАРОЛЬ</h3>
          <div class="card-body">
            <!-- <ul v-if="errors">
              <li v-for="error in errors" v-bind:key="error">{{ msg }}</li>
            </ul> -->
            <form
              autocomplete="off"
              @submit.prevent="resetPassword"
              method="post"
            >
              <div class="form-group">
                <label for="email">E-mail</label>
                <input
                  type="text"
                  id="email"
                  class="form-control"
                  placeholder="Введите свою почту"
                  v-model="email"
                  :class="{ invalid: errors.email }"
                />
                <p class="text-danger">
                  {{
                    this.errors && this.errors.email
                      ? this.errors.email[0]
                      : ''
                  }}
                </p>
              </div>
              <div class="form-group">
                <label for="password">Пароль</label>
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  placeholder=""
                  v-model="password"
                  :class="{ invalid: errors.password }"
                />
                <p class="text-danger">
                  {{
                    this.errors && this.errors.password
                      ? this.errors.password[0]
                      : ''
                  }}
                </p>
              </div>
              <div class="form-group auth-form_block">
                <label for="password_confirmation">Подтвердите пароль</label>
                <input
                  type="password"
                  id="password_confirmation"
                  class="form-control"
                  placeholder=""
                  v-model="password_confirmation"
                  :class="{ invalid: errors.password }"
                />
                <p class="text-danger">
                  {{
                    this.errors && this.errors.password_confirmation
                      ? this.errors.password_confirmation[0]
                      : ''
                  }}
                </p>
              </div>
              <button type="submit" class="btn-create_page m-auto">
                ОБНОВИТЬ ПАРОЛЬ
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      token: '',
      email: '',
      password: '',
      password_confirmation: '',
      has_error: false,
      errors: '',
    }
  },
  methods: {
    resetPassword() {
      axios
        .post('/api/auth/reset/password', {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          token: this.$route.params.token,
        })
        .then(result => {
          console.log(result.data)
          this.$router.push('/login')
        })
        .catch(err => {
          console.log(err.response.data)
          console.log(err.response.data.errors)
          this.errors = err.response.data.errors
        })
    },
  },
}
</script>

<style lang="css" scoped>
.card {
  background: #413a80;
  border-radius: 6px;
  max-width: 500px;
  padding: 53px 72px 72px 72px;
  margin: 0 auto;
}

.card-body {
  padding: 0;
}

.auth-form_header {
  margin-bottom: 40px;
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
}

input.invalid {
  border: red solid 2px;
  border-radius: 4px;
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
  padding-top: 40px;
  padding-bottom: 50px;
}

.auth-form label {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  color: #ffffff;
}

.auth-form_cancel {
  position: absolute;
  right: 35px;
  top: -5px;
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

.btn-create_page {
  width: 100%;
}

.auth-form_block {
  margin-bottom: 60px;
}

@media (max-width: 768px) {
  .auth-form_cancel {
    width: 26px;
    height: 26px;
    position: absolute;
    right: 30px;
    top: 2px;
    cursor: pointer;
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
    padding: 17px 0 17px 24px;
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
    right: 10px;
    top: -5px;
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

@media (max-width: 340px) {
  .auth-form_cancel {
    width: 26px;
    height: 26px;
    position: absolute;
    right: -1px;
    top: -5px;
    cursor: pointer;
  }
}
</style>
