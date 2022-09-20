

<template>
  <div class="content">
    <div class="center">
      <form class="in" id="form">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input class="form-control" id="email" aria-describedby="emailHelp" v-model="email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="password" v-model="password">
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" v-model="checkMe" >
          <label class="form-check-label" for="exampleCheck1" >Check me out</label>
        </div>
        <a class="btn btn-primary" @click="checkLoginPassword(password, email)">Submit</a>
      </form>
    </div>
  </div>
</template>

<script>
  import router from "../router/index.js"
  export default ({
    setup() {
    const checkLoginPassword = (email, password) => {
      if(email == "admin" && password == "admin"){
        router.push({ path: '/WeatherView' })
      }
      else{
        alert("WRONG PASSWORD OR LOGIN")
      }
    }
      
      return{
        router,
        checkLoginPassword
      }
    },
  })
</script>

<style scoped>
  .content {
    display: table;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  
  .center {
    display: table-cell;
    vertical-align: middle;
  }
  .in{
    margin-left: auto;
    margin-right: auto;
    width: 400px;
  }
  </style>
