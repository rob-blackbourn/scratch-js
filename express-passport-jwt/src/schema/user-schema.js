const UserSchema = {
  type: 'object',
  required: ['email', 'password', 'permissions'],
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    permissions: {
      type: 'array',
      minItems: 0,
      uniqueItems: true,
      items: {
        type: 'object',
        required: ['target', 'roles'],
        properties: {
          target: {
            type: 'string'
          },
          roles: {
            type: 'array',
            minItems: 0,
            items: {
              type: 'string'
            }
          }
        }
      }
    }
  }
}

export default UserSchema
