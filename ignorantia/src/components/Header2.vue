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
        <v-card id="contenedor" dark class="secondary">
          <v-card-text id="p1" class="px-0">{{pregunta1}}</v-card-text>
          <img v-if="showImage" id="img1" v-bind:src=src1 title="codigo1" :alt=src1>
          <v-flex xs12 sm12 md12>
            <v-btn id="b0" @click="setButtonAnswer(0)" class="answer"></v-btn>
          <v-btn id="b1" @click="setButtonAnswer(1)" class="answer"></v-btn></v-flex>
        </v-card>
        <v-btn id="boton" @click="siguiente"></v-btn>
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
      src1: '',
      ArrayRespuestas: [],
      indice: 0,
      XMLparseado: null,
      tipoActual: '',
      showImage: true,
      showButtons: false,
      respuestaButton: {
        valor: '',
        correct: ''
      }
    }
  },
  methods: {
    parseXml () {
      let sel = this
      let xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          // console.log(this)
          sel.gestionarXml(this.responseXML)
          sel.XMLparseado = this.responseXML
          // console.log('imin')
        } else {
          // console.log('WTF', this.readyState, this.status)
        }
      }
      xhttp.open('GET', 'https://rawgit.com/Ulisesuarez/TESTGO/master/ignorantia/src/assets/preguntas.xml', true)
      xhttp.send()
      console.log('hola')
    },
    gestionarXml (xmldoc) {
      console.log('COMENZANDO GESTIONAR')
      let flagRespuestas
      if (document.getElementById('formulario')) {
        let oldform = document.getElementById('formulario')
        oldform.parentNode.removeChild(oldform)
      }
      this.$data.pregunta1 = this.indice + 1 + ') ' + xmldoc.getElementsByTagName('question')[this.indice].childNodes[1].innerHTML
      if (xmldoc.getElementsByTagName('question')[this.indice].childNodes[5].localName === 'image') {
        this.showImage = true
        flagRespuestas = xmldoc.getElementsByTagName('question')[this.indice].childNodes[5]
        this.$data.src1 = xmldoc.getElementsByTagName('question')[this.indice].childNodes[5].innerHTML.toString()
        document.getElementById('img1').style.width = 80 + '%'
      } else {
        this.showImage = false
        flagRespuestas = xmldoc.getElementsByTagName('question')[this.indice].childNodes[3]
        this.$data.src1 = ''
      }
      // console.log(document.getElementById("contenedor"))
      let formnode = document.createElement('FORM')
      formnode.style.textAlign = 'left'
      formnode.style.marginLeft = 10 + '%'
      formnode.id = 'formulario'
      this.tipoActual = xmldoc.getElementsByTagName('question')[this.indice].childNodes[3].innerHTML

      switch (this.tipoActual) {
        case 'radio':
          this.radio(formnode, flagRespuestas)
          break
        case 'select multiple':
          this.selectMultiple(formnode, flagRespuestas)
          break
        case 'text':
          this.text(formnode, flagRespuestas)
          break
        case 'select':
          this.selectMultiple(formnode, flagRespuestas)
          break
        case 'button':
          this.showButtons = true
          this.button(flagRespuestas)
          break
        default:
          console.log('default')
      }

      console.log(formnode)
      let submit = document.getElementById('boton')
      submit.innerHTML = 'Contestar'
      submit.style.marginLeft = 70 + '%'
      submit.style.fontWeight = 'bold'

      document.getElementById('contenedor').appendChild(formnode)
    },
    siguiente () {
      switch (this.tipoActual) {
        case 'radio':
          this.checkRadio()
          break
        case 'select multiple':
          this.checkSelectMultiple()
          break
        case 'text':
          this.checkText()
          break
        case 'select':
          this.checkSelectMultiple()
          break
        case 'button':
          this.checkButton()
          break

        default:
          console.log('default')
      }
      if (this.indice === 3) {
        console.log('thats soem crazy chit')
        this.showButtons = true
      }
      console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
    },
    radio (formnode, flagRespuestas) {
      let valorRespuesta = 0
      if (flagRespuestas.nextSibling.nextSibling != null) {
        console.log('entrado en el if')
        while (flagRespuestas.nextSibling.nextSibling && flagRespuestas.nextSibling.nextSibling.localName === 'option') {
          console.log('principio del while')
          console.log(flagRespuestas.nextSibling.nextSibling)
          flagRespuestas = flagRespuestas.nextSibling.nextSibling
          let inputnode = document.createElement('INPUT')
          console.log(this.tipoActual)
          inputnode.setAttribute('type', this.tipoActual)
          console.log(flagRespuestas.attributes.correct.nodeValue === 'y')
          inputnode.setAttribute('value', this.indice + 1 + '-' + valorRespuesta)
          inputnode.setAttribute('name', 'answer')
          if (flagRespuestas.attributes.correct.nodeValue === 'y') {
            console.log('WTF')
            inputnode.setAttribute('correct', 'y')
          } else {
            inputnode.setAttribute('correct', 'n')
          }
          console.log(inputnode.type)
          console.log('nodevalue of flagresppuestas')
          console.log(flagRespuestas.childNodes[0].nodeValue)
          let text = document.createElement('SPAN')
          text.innerHTML = flagRespuestas.childNodes[0].nodeValue
          formnode.appendChild(inputnode)
          formnode.appendChild(text)
          formnode.appendChild(document.createElement('BR'))
          console.log('FIN del while')
          valorRespuesta++
        }
      }
    },
    selectMultiple (formnode, flagRespuestas) {
      let valorRespuesta = 0
      let selectNode = document.createElement('SELECT')
      if (this.tipoActual === 'select multiple') {
        selectNode.setAttribute('multiple', '')
      } else {
        selectNode.setAttribute('class', 'uniSelect')
        selectNode.style.appearance = 'menulist !important'
        selectNode.style.MozAppearance = 'menulist !important'
      }
      selectNode.setAttribute('name', 'answer')
      selectNode.style.backgroundColor = '#68A6BF'
      if (flagRespuestas.nextSibling.nextSibling != null) {
        console.log('entrado en el if')
        while (flagRespuestas.nextSibling.nextSibling && flagRespuestas.nextSibling.nextSibling.localName === 'option') {
          console.log('principio del while')
          console.log(flagRespuestas.nextSibling.nextSibling)
          flagRespuestas = flagRespuestas.nextSibling.nextSibling
          let inputnode = document.createElement('OPTION')
          console.log(this.tipoActual)

          console.log(flagRespuestas.attributes.correct.nodeValue === 'y')
          inputnode.setAttribute('value', this.indice + 1 + '-' + valorRespuesta)
          inputnode.style.backgroundColor = '#68A6BF'
          if (flagRespuestas.attributes.correct.nodeValue === 'y') {
            console.log('WTF')
            console.log(formnode)
            inputnode.setAttribute('correct', 'y')
          } else {
            inputnode.setAttribute('correct', 'n')
          }
          console.log(inputnode.type)
          console.log('nodevalue of flagresppuestas')
          console.log(flagRespuestas.childNodes[0].nodeValue)

          inputnode.innerHTML = flagRespuestas.childNodes[0].nodeValue
          selectNode.appendChild(inputnode)
          valorRespuesta++
          console.log('FIN del while')
        }
      }
      formnode.appendChild(selectNode)
    },
    text (formnode, flagRespuestas) {
      let valorRespuesta = 0
      if (flagRespuestas.nextSibling.nextSibling != null) {
        console.log('entrado en el if')
        while (flagRespuestas.nextSibling.nextSibling && flagRespuestas.nextSibling.nextSibling.localName === 'option') {
          console.log('principio del while')
          console.log(flagRespuestas.nextSibling.nextSibling)
          flagRespuestas = flagRespuestas.nextSibling.nextSibling
          let inputnode = document.createElement('INPUT')
          console.log(this.tipoActual)
          inputnode.setAttribute('type', this.tipoActual)
          console.log(flagRespuestas.attributes.correct.nodeValue === 'y')
          inputnode.setAttribute('name', 'answer')
          if (flagRespuestas.attributes.correct.nodeValue === 'y') {
            console.log('WTF')
            inputnode.setAttribute('correct', flagRespuestas.childNodes[0].nodeValue)
          } else {
            inputnode.setAttribute('correct', 'n')
          }
          console.log(inputnode.type)
          console.log('nodevalue of flagresppuestas')
          console.log(flagRespuestas.childNodes[0].nodeValue)
          let label = document.createElement('SPAN')
          label.innerText = 'Num. ' + String.fromCharCode(97 + valorRespuesta) + ':'
          formnode.appendChild(label)
          formnode.appendChild(inputnode)
          formnode.appendChild(document.createElement('BR'))
          console.log('FIN del while')
          valorRespuesta++
        }
      }
    },
    button (flagRespuestas) {
      document.getElementById('b0').style.display = 'inline-block'
      document.getElementById('b1').style.display = 'inline-block'
      document.getElementById('b0').style.backgroundColor = '#212121'
      document.getElementById('b1').style.backgroundColor = '#212121'
      this.respuestaButton.valor = ''
      let valorRespuesta = 0
      let arrayButtons = document.getElementsByClassName('answer')
      if (flagRespuestas.nextSibling.nextSibling != null) {
        console.log('entrado en el if')
        console.log(arrayButtons)
        console.log(arrayButtons.length)
        for (let index = 0; index < 2; index++) {
          console.log(index)
          console.log('Aqui!')
          console.log(arrayButtons[index])
          console.log(arrayButtons[valorRespuesta])
          console.log(flagRespuestas.nextSibling.nextSibling)
          flagRespuestas = flagRespuestas.nextSibling.nextSibling
          console.log(this.tipoActual)
          arrayButtons[valorRespuesta].setAttribute('type', this.tipoActual)
          arrayButtons[valorRespuesta].setAttribute('name', 'answer')
          arrayButtons[valorRespuesta].setAttribute('valor', this.indice + 1 + '-' + valorRespuesta)
          console.log(flagRespuestas.attributes.correct.nodeValue === 'y')
          console.log('hasta aqui llegas premoh')
          arrayButtons[valorRespuesta].innerHTML = flagRespuestas.childNodes[0].nodeValue
          if (flagRespuestas.attributes.correct.nodeValue === 'y') {
            console.log('WTF')
            arrayButtons[valorRespuesta].setAttribute('correct', 'y')
          } else {
            arrayButtons[valorRespuesta].setAttribute('correct', 'n')
          }
          console.log(arrayButtons[valorRespuesta])
          valorRespuesta++
        }
      }
    },
    setButtonAnswer (elboton) {
      console.log(document.getElementById('b' + elboton))
      console.log(document.getElementById('b' + elboton).attributes.valor.nodeValue)
      console.log(document.getElementById('b' + elboton).attributes.correct.nodeValue)
      this.respuestaButton.valor = document.getElementById('b' + elboton).attributes.valor.nodeValue
      this.respuestaButton.correct = document.getElementById('b' + elboton).attributes.correct.nodeValue
      document.getElementById('b0').style.backgroundColor = '#212121'
      document.getElementById('b1').style.backgroundColor = '#212121'
      document.getElementById('b' + elboton).style.backgroundColor = '#68A6BF'

      console.log(this.respuestaButton.valor)
    },
    checkRadio () {
      let radios = document.getElementsByName('answer')
      let respuesta = ''
      let RespCorreccion = {}
      console.log(radios)
      for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
          console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
          console.log(radios[i].attributes.correct.nodeValue)
          respuesta = radios[i].value
          RespCorreccion = {
            valor: respuesta,
            correct: radios[i].attributes.correct.nodeValue
          }
          break
        }
      }
      if (respuesta === '') {
        alert('Si no la sabes tendrás que escoger al azar')
      } else {
        this.ArrayRespuestas.push(RespCorreccion)
        this.indice++
        console.log(this.indice)
        console.log('porquenosepasa')
        this.gestionarXml(this.XMLparseado)
      }
    },
    checkSelectMultiple () {
      let select = document.getElementsByName('answer')
      console.log(select)
      let respuestas = []
      let options = select[0]
      for (let i = 0, iLen = options.length; i < iLen; i++) {
        if (options[i].selected) {
          respuestas.push({
            valor: options[i].value,
            correct: options[i].attributes.correct.nodeValue
          })
        }
      }
      if (respuestas.length === 0) {
        alert('Si no la sabes tendrás que escoger al azar')
      } else {
        if (respuestas.length === 1) {
          respuestas = respuestas[0]
        }
        this.ArrayRespuestas.push(respuestas)
        this.indice++
        console.log(this.indice)
        this.gestionarXml(this.XMLparseado)
      }
      console.log('biieen')
      console.log(respuestas)
    },
    checkText () {
      let text = document.getElementsByName('answer')
      console.log(text)
      let respondidoTodas = true
      let respuestas = []
      let options = text
      for (let i = 0, iLen = options.length; i < iLen; i++) {
        if (options[i].textLength > 0) {
          respuestas.push({
            valor: options[i].value,
            correct: options[i].attributes.correct.nodeValue
          })
        } else {
          respondidoTodas = false
        }
      }
      if (!respondidoTodas) {
        alert('Si no los sabes tendrás que escribirlos al azar')
      } else {
        this.ArrayRespuestas.push(respuestas)
        this.indice++
        console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO')
        console.log(this.ArrayRespuestas[2][0].correct)
        console.log(this.ArrayRespuestas[2][0].valor)
        this.gestionarXml(this.XMLparseado)
      }
    },
    checkButton () {
      if (this.respuestaButton.valor === '') {
        alert('De esta tampoco te libras')
      } else {
        document.getElementById('b0').style.display = 'none'
        document.getElementById('b1').style.display = 'none'
        this.indice++
        this.ArrayRespuestas.push(this.respuestaButton)
        this.gestionarXml(this.XMLparseado)
        console.log(this.ArrayRespuestas.length)
      }
    }
  }
}

</script>

<style>
  #img1{
    width: 50%;
    height: 50%;
  }
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
  select{

    -moz-appearance: menulist !important;
    -webkit-appearance: menulist !important;
    appearance: menulist !important;
  }
  .uniSelect{

    -moz-appearance: menulist !important;
    -webkit-appearance: menulist !important;
    appearance: menulist !important;
  }
  #formulario{
    padding-top: 1.5%;
    padding-bottom: 2%;
  }
  #b0{
    display: none;
  }
  #b1{
    display: none;
  }
</style>
