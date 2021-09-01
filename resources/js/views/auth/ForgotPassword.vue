<template>
  <div class="auth-form">
    <div class="auth-form_block-main">
      <div>
        <div class="card card-default">
          <router-link to="/">
            <img
              :src="require('../../assets/img/cancel2.png').default"
              class="auth-form_cancel"
            />
          </router-link>
          <h3 class="text-center auth-form_header">ВОССТАНОВИТЬ ПАРОЛЬ</h3>
          <div class="card-body">
            <form
              autocomplete="off"
              @submit.prevent="requestResetPassword"
              method="post"
            >
              <div class="form-group auth-form_block">
                <label for="email">Email</label>
                <input
                  type="text"
                  id="email"
                  class="form-control"
                  placeholder="Введите Email"
                  v-model="email"
                  :class="{ invalid: errors.email }"
                />
                <p class="mt-2" v-if="response && response === success">
                  {{ response }}
                </p>
                <p
                  class="text-danger"
                  v-if="response && response !== success"
                >
                  {{ response }}
                </p>
                <p class="text-danger" v-if="errors && errors.email">
                  {{ errors.email[0] }}
                </p>
              </div>
              <button type="submit" class="btn-create_page m-auto">
                ВОССТАНОВИТЬ
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
      email: null,
      errors: '',
      response: '',
      success: 'Письмо для сброса пароля отправлено.',
    }
  },
  methods: {
    requestResetPassword() {
      this.errors = ''
      this.response = ''
      axios
        .post('/api/auth/reset-password', { email: this.email })
        .then(result => {
          this.response = result.data.message
          // console.log(result.data);
        })
        .catch(err => {
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
  border: none;
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
  padding-top: 100px;
}

.auth-form_header {
  font-family: Comfortaa;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 150%;
  color: #FFFFFF;
  margin-bottom: 0;
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
  margin-bottom: 20px;
  margin-top: 48px;
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
    margin-bottom: 0px;
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
