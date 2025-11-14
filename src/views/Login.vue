<template>
  <main class="login">
    <form class="form">
      <div class="title">Welcome,<br><span>sign up to continue</span></div>
      <input class="input" name="email" placeholder="Email" type="email">
      <input class="input" name="password" placeholder="Password" type="password">
      <button class="button-confirm">Let`s go →</button>
    </form>
  </main>
</template>

<style>

.form {
  width: 300px;
  --input-focus: #f8f8f8;
  --font-color: #fefefe;
  --font-color-sub: #7e7e7e;
  background: color-mix(in srgb, var(--color-background) 80%, black);
  --main-color: rgba(64, 48, 73, 0.76);
  padding: 20px;
  background: color-mix(in srgb, var(--color-background) 80%, black);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
}

.title {
  color: var(--font-color-sub);
  font-weight: 600;
  font-size: 30px;
  line-height: 1.5;
}

.title span {
  color: var(--font-color-sub);
  font-weight: 600;
  font-size: 17px;
}

.input {
  width: 98%;
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

.input::placeholder {
  color: var(--font-color-sub);
  opacity: 0.8;
}

.input:focus {
  border: 2px solid var(--input-focus);
}

.button-confirm {
  margin: 50px auto 0 auto;
  width: 40%;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 17px;
  font-weight: 600;
  color: var(--font-color);
  cursor: pointer;
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}

</style>



