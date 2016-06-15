angular
  .module('cocktailApp')
  .value('cocktailList', [{
    id: 'cf6a9493-cbfe-4d15-90b7-1e730c002e55',
    name: 'Gin and Tonic',
    equipment: [
      {name: 'Highball glass'}
    ],
    ingredients: [{
      name: 'Gin',
      quantity: 25,
      unit: 'ml'
    }, {
      name: 'Tonic Water',
      quantity: 125,
      unit: 'ml'
    }, {
      name: 'Lemon',
      quantity: 1,
      unit: 'slice'
    }, {
      name: 'Ice',
      quantity: 6,
      unit: 'cube'
    }],
    method: [
      'Half fill the glass with ice',
      'Pour over the gin and tonic water and stir',
      'Garnish with a slice of lemon'
    ]
  }, {
    id: '400dc69d-da79-4be7-a363-bb9cb7fb3198',
    name: 'Screwdriver',
    equipment: [
      {name: 'Highball glass'}
    ],
    ingredients: [{
      name: 'Vodka',
      quantity: 25,
      unit: 'ml'
    }, {
      name: 'Orange Juice',
      quantity: 125,
      unit: 'ml'
    }, {
      name: 'Orange',
      quantity: 1,
      unit: 'slice'
    }, {
      name: 'Ice',
      quantity: 6,
      unit: 'cube'
    }],
    method: [
      'Half fill the glass with ice',
      'Pour over the vodka and orange juice and stir',
      'Garnish with a slice of orange'
    ]
  }]);
