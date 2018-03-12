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
          <v-spacer class="hidden-sm-and-down"></v-spacer>
          <v-btn color="white" href="#Home" flat><span class="boton">HOME</span></v-btn>
          <v-btn color="white"  href="#Test" flat><span class="boton">APRENDE</span></v-btn>
          <v-btn color="white"  href="#About" flat><span class="boton">ABOUT</span></v-btn>
        </v-toolbar>
      </v-flex>
      <v-flex xs12 sm6 md4 v-for="i in 2" :key="i">
        <v-card dark class="secondary">
          <v-card-text class="px-0">{{parseXml()}}</v-card-text>
        </v-card>
      </v-flex>
      </v-layout>
  </v-container>

</template>

<script>
export default {
  name: 'header2',
  methods: {
    parseXml () {
      let xmlhttp = new XMLHttpRequest()
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '  <questions>\n' +
        '    <question id="que001">\n' +
        '      <text>¿Que muestra por consola el siguiente código?</text>\n' +
        '      <type>radio</type>\n' +
        '      <image>img/pregunta1.png</image>\n' +
        '      <option correct="y">false</option>\n' +
        '      <option>true</option>\n' +
        '      <option>No compila</option>\n' +
        '      <type>checkbox</type>\n' +
        '      <suboption>Porque  hay que escribir import para cada paquete importado</suboption>\n' +
        '      <suboption>porque […]  es un error de sintaxis</suboption>\n' +
        '      <suboption>porque no se puede declarar una variable sin la palabra reservada variable</suboption>\n' +
        '      <suboption>todas las anteriores son correctas</suboption>\n' +
        '    </question>\n' +
        '    <question id="que002">\n' +
        '      <text>¿Qué recibe como argumentos y que devuelve la siguiente función?</text>\n' +
        '      <type>select multiple</type>\n' +
        '      <image>img/pregunta2.png</image>\n' +
        '      <option>Recibe punteros de variables y devuelve direcciones de memoria.</option>\n' +
        '      <option>Recibe direcciones de memoria y devuelve punteros.</option>\n' +
        '      <option correct="y">No recibe ningún parámetro y devuelve direcciones de memoria.</option>\n' +
        '      <option correct="y">No recibe ningún parámetro y devuelve punteros. </option>\n' +
        '    </question>\n' +
        '    <question id="que003">\n' +
        '      <text> ¿Que muestra por consola el siguiente código?</text>\n' +
        '      <type>text</type>\n' +
        '      <image>img/pregunta3.png</image>\n' +
        '      <option correct="y">0</option>\n' +
        '      <option correct="y">1</option>\n' +
        '      <option correct="y">2</option>\n' +
        '      <option correct="y">0</option>\n' +
        '      <option correct="y">0</option>\n' +
        '      <option correct="y">0</option>\n' +
        '    </question>\n' +
        '    <question id="que004">\n' +
        '      <text>¿Que muestra por consola el siguiente código?</text>\n' +
        '      <type>select</type>\n' +
        '      <image>img/pregunta4.png</image>\n' +
        '      <option>7</option>\n' +
        '      <option>4</option>\n' +
        '      <option>3</option>\n' +
        '      <option correct="y">invalid operation: a + b (mismatched types int8 and int16)</option>\n' +
        '    </question>\n' +
        '    <question id="que005">\n' +
        '      <text>Puede utilizarse la declaración abreviada  ":=" para definir variables globales?</text>\n' +
        '      <type>button</type>\n' +
        '      <option>Sí </option>\n' +
        '      <option correct="y">No</option>\n' +
        '    </question>\n' +
        '    <question id="que006">\n' +
        '      <text>¿Cual de las siguientes declaraciones es correcta?</text>\n' +
        '      <type>radio</type>\n' +
        '      <option>const Pi = math.Pi</option>\n' +
        '      <option>const Pi = 3.1416</option>\n' +
        '      <option correct="y">Ambas</option>\n' +
        '      <option>Ninguna</option>\n' +
        '    </question>\n' +
        '    <question id="que007">\n' +
        '      <type>button</type>\n' +
        '      <text>Siendo que los Arrays son de type valor, ¿Al pasar un array a una función,\n' +
        '        le pasamos una copia del Array o una referencia al Array?</text>\n' +
        '      <option>Referencia</option>\n' +
        '      <option correct="y">Copia </option>\n' +
        '    </question>\n' +
        '    <question  id="que008">\n' +
        '      <text>¿Cuál es la secuencia del output generado por el siguiente código?</text>\n' +
        '      <type>select</type>\n' +
        '      <image>img/pregunta8.png</image>\n' +
        '      <option>Siempre \\n1\\n2\\n3</option>\n' +
        '      <option>Siempre \\n2\\n1\\n3</option>\n' +
        '      <option>3</option>\n' +
        '      <option correct="y">A veces \\n1\\n2\\n3 y otras \\n2\\n1\\n3 </option>\n' +
        '    </question>\n' +
        '    <question id="que009">\n' +
        '      <text>¿Que especificador de formato  deberíamos emplear para imprimir un boolean?</text>\n' +
        '      <type>datalist</type>\n' +
        '      <option>%b</option>\n' +
        '      <option correct="y">%t</option>\n' +
        '      <option>%s</option>\n' +
        '    </question>\n' +
        '    <question id="que010">\n' +
        '      <text>¿Cual es la salida del siguiente código?</text>\n' +
        '      <type>select</type>\n' +
        '      <option>0000</option>\n' +
        '      <option>0123</option>\n' +
        '      <option>0044</option>\n' +
        '      <option correct="y">3210</option>\n' +
        '      <option>4444</option>\n' +
        '    </question>\n' +
        '    <question id="que011">\n' +
        '      <text>¿Te ha gustado este test?</text>\n' +
        '      <type>checkbox</type>\n' +
        '      <option correct="y">Sí</option>\n' +
        '      <option correct="y">Mucho</option>\n' +
        '      <option correct="y">Es lo mejor que me ha pasado nunca!</option>\n' +
        '      <option correct="y">^^</option>\n' +
        '    </question>\n' +
        '\n' +
        '  </questions>\n'
      xmlhttp.send(xml);
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
