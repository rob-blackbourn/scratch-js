const BookSchema = {
  type: 'object',
  required: ['isbn', 'title', 'author', 'publisher'],
  properties: {
    isbn: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    author: {
      type: 'string'
    },
    publisher: {
      type: 'string'
    }
  }
}

export default BookSchema
