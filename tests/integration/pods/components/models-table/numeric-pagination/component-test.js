import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('models-table/numeric-pagination', 'Integration | Component | models table/numeric pagination', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{models-table/numeric-pagination}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#models-table/numeric-pagination}}
      template block text
    {{/models-table/numeric-pagination}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
