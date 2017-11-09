import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  currentSelector: computed(
    'esMujer',
    'esHombre',
    'estaEnProceso',
    'estaDescalificado',
    function() {
      if (
        !this.get('esMujer')
            && !this.get('esHombre')
            && !this.get('estaEnProceso')
            && !this.get('estaDescalificado')
      ) {
        return '*';
      }

      let selectors = [];

      if (this.get('esMujer')) {
        selectors.push('.mujer');
      }

      if (this.get('esHombre')) {
        selectors.push('.hombre');
      }

      if (this.get('estaEnProceso')) {
        selectors.push('.enProceso');
      }

      if (this.get('estaDescalificado')) {
        selectors.push('.descalificado');
      }

      return selectors.join(', ');
    }
  ),

  actions: {
    applyFilter() {
      var $container = Ember.$('#portfolio');

      $container.isotope({transitionDuration: '0.65s'});

      $container.isotope({filter: this.get('currentSelector')});

      return false;
    }
  }
});
