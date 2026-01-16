<script setup lang="ts">


import axios from 'axios'
import { API_URL } from '@/services/api.ts'
import router from '@/router'
import { ref } from 'vue'

const user  = ref({
  name: "",
  email: "",
  password: ""
})

function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}


async function createUser() {
  if (!isValidEmail(user.value.email)) {
    alert("Please enter a valid email address.")
    return
  }

  try {
    // Wir schicken den User direkt an das Backend.
    // Das Backend prüft jetzt intern Name und Email!
    const response = await axios.post(
      `${API_URL}/user/create`,
      user.value,
      { headers: { "Content-Type": "application/json" } }
    )

    // Wenn wir hier landen, war alles erfolgreich (Status 200)
    localStorage.setItem("user", JSON.stringify(response.data))
    alert("Account erfolgreich erstellt")
    router.push("/profile")

  } catch (err: any) {
    // Wenn das Backend einen Fehler (wie 409) schickt, landen wir hier
    if (err.response && err.response.status === 409) {
      // Hier wird "Username oder E-Mail bereits vergeben" angezeigt
      alert(err.response.data)
    } else {
      // Allgemeiner Fehler (z.B. Server down)
      alert("Registrierung fehlgeschlagen. Bitte versuche es später erneut.")
    }
  }
}

const loginData = ref({
  email: "",
  password: ""
})

async function login() {
  try {
    const response = await axios.post(`${API_URL}/user/login`, loginData.value, {
      headers: { "Content-Type": "application/json" }
    })
    localStorage.setItem("user", JSON.stringify(response.data))
    router.push('/ranking')
  } catch (err: any) {

    if (err.response && err.response.data) {
      alert(err.response.data)
    } else {
      alert("Login failed. Please check your credentials.")
    }
  }
}

</script>


<template>
  <!-- From Uiverse.io by andrew-demchenk0 -->
  <div class="wrapper">
    <div class="card-switch">
      <label class="switch">
        <input  type="checkbox" class="toggle">
        <span class="slider"></span>
        <span class="card-side"></span>

        <div class="flip-card__inner">
          <div class="flip-card__front">
            <div class="title">Log in</div>
            <form class="flip-card__form" action="">
              <input v-model="loginData.email" class="flip-card__input" name="email" placeholder="Email" type="email">
              <input v-model="loginData.password" class="flip-card__input" name="password" placeholder="Password" type="password">
              <button @click.prevent="login" class="flip-card__btn">Lets go!</button>
            </form>
          </div>

          <div class="flip-card__back">
            <div class="title">Sign up</div>
            <form class="flip-card__form" action="">
              <input v-model="user.name" class="flip-card__input" placeholder="Name" type="text">
              <input v-model="user.email" class="flip-card__input" name="email" placeholder="Email" type="email">
              <input v-model="user.password" class="flip-card__input" name="password" placeholder="Password" type="password">
              <button @click.prevent="createUser" class="flip-card__btn">Confirm!</button>
            </form>
          </div>

        </div>
      </label>
    </div>
  </div>
</template>

<style>

/* From Uiverse.io by andrew-demchenk0 */
.wrapper {
  --input-focus: #8b5ea4;
  --bg-color: color-mix(in srgb, var(--color-background) 80%, black);
  --main-color: rgba(64, 48, 73, 0.76);

  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.switch {
  transform: translateY(-200px);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 50px;
  height: 20px;
}

.card-side::before {
  position: absolute;
  content: 'Log in';
  left: -70px;
  top: 0;
  width: 100px;
  text-decoration: underline;
  font-weight: 600;
}

.card-side::after {
  position: absolute;
  content: 'Sign up';
  left: 70px;
  top: 0;
  width: 100px;
  text-decoration: none;
  font-weight: 600;
}

.toggle {
  opacity: 0;
  width: 0;
  height: 0;
  outline: none;
}

.slider {
  box-sizing: border-box;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--bg-color);
  transition: 0.3s;
}

.slider:before {
  box-sizing: border-box;
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  border: 2px solid var(--main-color);
  border-radius: 5px;
  left: -2px;
  bottom: 2px;
  background-color: var(--input-focus);
  box-shadow: 0 3px 0 var(--main-color);
  transition: 0.3s;
}

.toggle:checked + .slider {
  background-color: var(--bg-color);
}

.toggle:checked + .slider:before {
  transform: translateX(30px);
}

.toggle:checked ~ .card-side:before {
  text-decoration: none;
}

.toggle:checked ~ .card-side:after {
  text-decoration: underline;
}

/* card */

.flip-card__inner {
  width: 300px;
  height: 350px;
  position: relative;
  background-color: transparent;
  perspective: 1000px;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.toggle:checked ~ .flip-card__inner {
  transform: rotateY(180deg);
}

.toggle:checked ~ .flip-card__front {
  box-shadow: none;
}

.flip-card__front, .flip-card__back {
  padding: 20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background: color-mix(in srgb, var(--color-background) 80%, black);
  gap: 20px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
}

.flip-card__back {
  width: 100%;
  transform: rotateY(180deg);
}

.flip-card__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.title {
  margin: 20px 0 20px 0;
  font-size: 35px;
  text-align: center;
  font-weight: 700;
  color: #ff33cc;
}

.flip-card__input {
  width: 250px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 15px;
  font-weight: 600;
  color: var(--font-color);
  padding: 5px 10px;
  outline: none;
}

.flip-card__input::placeholder {
  color: var(--font-color-sub);
  opacity: 0.8;
}

.flip-card__input:focus {
  border: 2px solid var(--input-focus);
}

.flip-card__btn {
  margin: 20px 0 20px 0;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: inherit;
}

.flip-card__btn:hover {
  background-color: var(--main-color);
  color: var(--bg-color);
}

.flip-card__btn:active {
  box-shadow: 0px 0px var(--main-color);
  transform: translate(3px, 3px);
}

</style>

