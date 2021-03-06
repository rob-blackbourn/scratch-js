angular
  .module('cocktailApp')
  .value('cocktailList', [{
    name: 'Gin and Tonic',
    equipment: [
      {name: 'Highball glass'}
    ],
    ingredients: [{
      name: 'Gin',
      quantity: '25',
      unit: 'ml'
    }, {
      name: 'Tonic Water',
      quantity: '125',
      unit: 'ml'
    }, {
      name: 'Lemon',
      quantity: '1',
      unit: 'slice'
    }, {
      name: 'Ice',
      quantity: '6',
      unit: 'cube'
    }],
    method: [
      'Half fill the glass with ice',
      'Pour over the gin and tonic water and stir',
      'Garnish with a slice of lemon'
    ]
  }, {
    name: 'Screwdriver',
    equitpment: [
      {name: 'Highball glass'}
    ],
    ingredients: [{
      name: 'Vodka',
      quantity: '25',
      unit: 'ml'
    }, {
      name: 'Orange Juice',
      quantity: '125',
      unit: 'ml'
    }, {
      name: 'Orange',
      quantity: '1',
      unit: 'slice'
    }, {
      name: 'Ice',
      quantity: '6',
      unit: 'cube'
    }],
    method: [
      'Half fill the glass with ice',
      'Pour over the vodka and orange juice and stir',
      'Garnish with a slice of orange'
    ]
  }]);
