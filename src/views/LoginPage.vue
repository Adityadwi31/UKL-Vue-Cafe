<template>
  <section class="full-screen" style="background-color: rgb(2, 9, 26)">
    <div class="form-container">
      <p class="title">Login</p>
      <form class="form" @submit.prevent="login">
        <div class="input-group">
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder=""
            v-model="email"
          />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder=""
            v-model="password"
          />
        </div>
        <div><br></div>
        <button class="sign" @click="login">Sign in</button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";

export default {
  data() {
    return {
      password: "",
      email: "",
    };
  },
  methods: {
    login() {
      let data = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("http://localhost:8000/api/login", data)
        .then((response) => {
          localStorage.setItem("token", response.data.jwt);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("id_user", response.data.id_user);
          localStorage.setItem("nama", response.data.nama);

          if (response.data.role === "admin") {
            location.href = "/admin";
          } else if (response.data.role === "manager") {
            location.href = "/manager";
          } else if (response.data.role === "kasir") {
            location.href = "/kasir";
          }
        })
        .catch((error) => {
          console.log(error);
          swal({
            icon: "error",
            title: "Password/email salah",
            button: true,
          });
        });
    },
  },
};
</script>

<style>
.full-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
body {
  margin: 0;
}
.form-container {
  width: 320px;
  border-radius: 0.75rem;
  background-color: rgba(17, 24, 39, 1);
  padding: 2rem;
  color: rgb(0, 0, 0);
  margin: auto;
  margin-top: 10%;
}

.title {
  text-align: center;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
}

.form {
  margin-top: 1.5rem;
}

.input-group {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.input-group label {
  display: block;
  color: rgb(91, 121, 172);
  margin-bottom: 4px;
}

.input-group input {
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid rgba(55, 65, 81, 1);
  outline: 0;
  background-color: rgba(17, 24, 39, 1);
  padding: 0.75rem 1rem;
  color: rgba(243, 244, 246, 1);
}

.input-group input:focus {
  border-color: rgba(167, 139, 250);
}

.forgot {
  display: flex;
  justify-content: flex-end;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgba(156, 163, 175, 1);
  margin: 8px 0 14px 0;
}

.forgot a,
.signup a {
  color: rgba(243, 244, 246, 1);
  text-decoration: none;
  font-size: 14px;
}

.forgot a:hover,
.signup a:hover {
  text-decoration: underline rgba(167, 139, 250, 1);
}

.sign {
  display: block;
  width: 100%;
  background-color: rgba(167, 139, 250, 1);
  padding: 0.75rem;
  text-align: center;
  color: rgba(17, 24, 39, 1);
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
}

.social-message {
  display: flex;
  align-items: center;
  padding-top: 1rem;
}

.line {
  height: 1px;
  flex: 1 1 0%;
  background-color: rgba(55, 65, 81, 1);
}

.social-message .message {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgba(156, 163, 175, 1);
}

.social-icons {
  display: flex;
  justify-content: center;
}

.social-icons .icon {
  border-radius: 0.125rem;
  padding: 0.75rem;
  border: none;
  background-color: transparent;
  margin-left: 8px;
}

.social-icons .icon svg {
  height: 1.25rem;
  width: 1.25rem;
  fill: #fff;
}

.signup {
  text-align: center;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgba(156, 163, 175, 1);
}
</style>
