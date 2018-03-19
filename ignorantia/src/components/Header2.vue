<template>
  <v-container grid-list-md text-xs-center>
    <v-layout wrap>
      <v-flex id="cabf" xs12 sm12 md12>
        <img id="cabecera" src="../assets/HLogotext.jpg" title="Ignorantia Universitae" alt="Ignorantia Universitae">
        <v-flex xs12 sm12 md12><v-card-text><span class="subcab">Elevando barreras al conocimiento</span></v-card-text></v-flex>
      </v-flex>
      <v-flex xs12 sm12 md12>
        <v-toolbar dense id="tbmenu" >
          <v-toolbar-title class="hidden-sm-and-down">IGNORANTIA</v-toolbar-title>
          <v-spacer class="hidden-sm-and-down">{{parseXml()}}</v-spacer>
          <v-btn color="white" href="#Home" flat><span class="boton">HOME</span></v-btn>
          <v-btn color="white"  href="#Test" flat><span class="boton">APRENDE</span></v-btn>
          <v-btn color="white"  href="#About" flat><span class="boton">ABOUT</span></v-btn>
        </v-toolbar>
      </v-flex>
      <v-flex xs12 sm12 md12>
        <v-card dark class="secondary">
          <v-card-text id="p1" class="px-0">{{pregunta1}}</v-card-text>
          <img :src=src1 title="codigo1" alt="muerte">
        </v-card>
      </v-flex>
      </v-layout>
  </v-container>

</template>

<script>
export default {
  data: function () {
    return {
      name: 'header2',
      pregunta1: '',
      src1: ''
    }
  },
  methods: {
    parseXml () {
      let sel = this
      let xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          console.log(this)
          sel.gestionarXml(this.responseXML)
          console.log('imin')
        } else {
          console.log('WTF', this.readyState, this.status)
        }
      }
      xhttp.open('GET', 'https://rawgit.com/Ulisesuarez/TESTGO/master/ignorantia/src/assets/preguntas.xml', true)
      xhttp.send()
      console.log('hola')
    },

    gestionarXml (xmldoc) {
      console.log(xmldoc.getElementsByTagName('question')[0].childNodes[1].innerHTML, 'queee')

      this.$data.pregunta1 = xmldoc.getElementsByTagName('question')[0].childNodes[1].innerHTML
      this.$data.src1 = xmldoc.getElementsByTagName('question')[0].childNodes[5].innerHTML
      console.log(this.$data.src1)
    }
  }
}

</script>

<style scoped>
  #cabecera{
    width:100%;
  }
  #cabf{
    margin-bottom: -3.5em;
  }
  .subcab{
      float:right;
      position:relative;
      left:0.8em;
      top:-3.5em;
      z-index: 999;
      font-weight: bold;
      color:#7D0000;
      font-size:1.4em ;
      margin-bottom: -5em;
    }

  @media only screen and (max-width: 900px) {
    .subcab{
      float:right;
      top:-3em;
      left:1em;
      z-index: 999;
      font-size:1em ;

    }
  }

 @media only screen and (max-width: 599px) {
  .subcab{
    float:right;
    top:-3.4em;
    left:1em;
    z-index: 999;
    font-size:0.9em ;

  }
  }
  @media only screen and (max-width: 320px) {
    .subcab{
      float:right;
      top:-3.5em;
      left:1.2em;
      z-index: 999;
      font-size:0.8em ;

    }
  }

  #tbmenu{
    background-color:#68A6BF ;
    color:white;
    margin-top:-50%;
  }
  .boton {
  font-weight: bold;
  }

</style>
