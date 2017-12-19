<template lang="pug">
  #app
    img(src='./assets/logo.png')
    h1 Platzi Music
    select(v-model="selectedCountry")
      option(v-for="country in countries" :value="country.value") {{ country.name }}
    spinner(v-show="loading")
    ul
      artist(v-for="artist in artists" v-bind:artist="artist" v-bind:key="artist.mbid")
</template>

<script>
/**
 * No es necesario escribir './api/index.js' ya que al llamarse 'index'
 * es el primero que va a requerir.
 */
import Artist from './components/Artist.vue'
import Spinner from './components/Spinner.vue'
import getArtists from './api'

export default {
  name: 'app',
  data () {
    return {
      artists: [],
      countries: [
        { name: 'Colombia', value: 'colombia' },
        { name: 'Argentina', value: 'argentina' },
        { name: 'España', value: 'spain' }
      ],
      selectedCountry: 'colombia',
      loading: true
    } 
  },
  components: {
    Artist,
    Spinner
  },
  methods: {
    refreshArtists(){
      const self = this
      this.loading = true
      this.artists = []
      getArtists(this.selectedCountry)
        .then(function(artists) {
          self.loading = false
          self.artists = artists
        })
    }
  },
  mounted: function(){
    this.refreshArtists()
  },
  /**
   * Este es otro objeto en el cual le decimos que realice cierta acción cuando haya
   * un cambio en la vista.
   */
  watch: {
    selectedCountry: function(){
      this.refreshArtists()
    }
  }
}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px

h1, h2
  font-weight normal

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
