<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { API_URL } from '@/services/api'
import router from '@/router'

const user = ref({ name: "", email: "", password: "" })
const loginData = ref({ email: "" , password: "" })

async function createUser() {
  try {
    const response = await axios.post(`${API_URL}/user/create`, user.value)
    localStorage.setItem("user", JSON.stringify(response.data))
    router.push("/profile")
  } catch (err: any) {
    alert(err.response?.data || "Registrierung fehlgeschlagen")
  }
}

async function login() {
  try {
    const response = await axios.post(`${API_URL}/user/login`, loginData.value)
    localStorage.setItem("user", JSON.stringify(response.data))
    router.push('/ranking')
  } catch (err: any) {
    alert(err.response?.data || "Login fehlgeschlagen")
  }
}
</script>

<template>
  <div class="login-page">
    <div class="side left">
      <div class="logo-wrap">
        <h1 class="main-title">BERLINER<br>KOLLEKTIV<br>RANKING</h1>
        <p class="sub-text">

        </p>
      </div>
    </div>

    <div class="divider"></div>

    <div class="side right">
      <div class="auth-container">

        <div class="switch-box">
          <span class="mode-label">Log in</span>
          <label class="switch">
            <input type="checkbox" id="mode-toggle" class="mode-checkbox">
            <span class="slider"></span>
          </label>
          <span class="mode-label">Sign up</span>
        </div>

        <div class="card-area">
          <div class="card-inner">

            <div class="card-front">
              <h2 class="form-title">Log in</h2>
              <form class="form" @submit.prevent="login">
                <input v-model="loginData.email" class="input" placeholder="Email" type="email" required>
                <input v-model="loginData.password" class="input" placeholder="Password" type="password" required>
                <button type="submit" class="btn">Lets go!</button>
              </form>
            </div>

            <div class="card-back">
              <h2 class="form-title">Sign up</h2>
              <form class="form" @submit.prevent="createUser">
                <input v-model="user.name" class="input" placeholder="Name" type="text" required>
                <input v-model="user.email" class="input" placeholder="Email" type="email" required>
                <input v-model="user.password" class="input" placeholder="Password" type="password" required>
                <button type="submit" class="btn">Confirm!</button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background);
  margin: 0; padding: 0;
  overflow: hidden;
}

.side { flex: 1; display: flex; align-items: center; }
.left { justify-content: flex-end; padding-right: 4vw; }
.right { justify-content: flex-start; padding-left: 4vw; }

.main-title {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  color: var(--color-text, #fff);
  line-height: 0.85;
  text-align: right;
  text-shadow: 4px 4px #403049;
}

.sub-text {
  color: #888;
  font-size: 1rem;
  margin-top: 15px;
  max-width: 320px;
  text-align: right;
  margin-left: auto;
}

.divider {
  width: 3px;
  height: 300px;
  background-color: #403049;
}

.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -50px;
}

.switch-box {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 25px;
}

.mode-label { color: var(--color-text, #fff); font-weight: 700; font-size: 0.9rem; }

.switch { position: relative; width: 50px; height: 24px; }
.mode-checkbox { position: absolute; opacity: 0; width: 0; height: 0; }

.slider {
  position: absolute; cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: color-mix(in srgb, var(--color-background) 80%, gray);
  border: 2px solid #403049;
  border-radius: 20px;
}

.slider:before {
  content: ""; position: absolute;
  height: 16px; width: 16px;
  left: 3px; bottom: 2px;
  background-color: #403049;
  transition: 0.3s;
  border-radius: 50%;
}

.mode-checkbox:checked + .slider:before { transform: translateX(24px); }

.auth-container:has(.mode-checkbox:checked) .card-inner {
  transform: rotateY(180deg);
}

.card-area {
  width: 280px;
  height: 320px;
  perspective: 1000px;
}

.card-inner {
  position: relative;
  width: 100%; height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 10px 10px #403049;
  border: 1px solid rgba(188, 89, 241, 0.4);
  border-radius: 10px;
}

.card-front, .card-back {
  border: 1px solid rgba(188, 89, 241, 0.4);
  border-radius: 10px;
  position: absolute;
  width: 100%; height: 100%;
  backface-visibility: hidden;
  background: color-mix(in srgb, var(--color-background) 95%, black);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
}

.card-back { transform: rotateY(180deg); }

.form-title {
  color: #403049; font-size: 1.6rem; font-weight: 900;
  margin-bottom: 20px; text-align: center;
}

.input {
  width: 100%; height: 38px;
  background: var(--color-background);
  border: 2px solid rgba(188, 89, 241, 0.2);
  color: var(--color-text, #fff);
  margin-bottom: 12px; padding: 0 10px;
  border-radius: 5px; font-size: 0.9rem;
}

.btn {
  width: 100%; height: 40px;
  background: #403049; border: none;
  color: #fff; font-weight: 800;
  border-radius: 5px; cursor: pointer;
  box-shadow: 3px 3px #000;
}

.btn:hover {
  background: #BC59F1D8;
}
</style>
