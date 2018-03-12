<template>

        <header>
     <img id="cabecera" src="../assets/HLogotext.jpg" title="Ignorantia Universitae" alt="Ignorantia Universitae">
            <span class="titulo">   <h2 id="subEncabezado">{{subEncabezado}}</h2> </span>
        <!--Menu horizontal-->

        <span class="MenuHorizontal">
               <nav>
               <ul>
                   <li><a href="#Home">Home</a></li>
                   <li><a href="#Tests">Área de Estudio</a></li>
                   <li><a href="#About">Sobre nosotros</a></li>

             </ul>
               </nav>
       </span>




           </header>

</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      subEncabezado:'Levantando barreras al conocimiento',

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#cabecera{
  width:99%;
  margin-left: 0.5%;

}
h1, h2 {
  font-weight: normal;
}
#subEncabezado{
  color: rgb(111, 0, 6);
  font-size:1.5em;
  margin-left:60%;
  margin-top:-2em;

}
.MenuHorizontal{

  float:left;
  margin-top:0;
  margin-left:0.5%;
  background-color:#68A6BF ;
  padding-left: 29.5%;

}


.MenuHorizontal ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;

}

.MenuHorizontal li {
  float: left;
  background-color: #68A6BF;
}

.MenuHorizontal li a {
  display: block;
  color: #ffffff;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-family: sans-serif;
  font-size: 1.5em;
  font-weight: bold;
}

.MenuHorizontal li:hover{

}

.MenuHorizontal li:hover a {
  float: left;
}

</style>
