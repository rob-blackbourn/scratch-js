import uuid from './uuid'

describe('uuid', () => {

    it('should create a uuid', () => {
        const id = uuid()
        expect(id).toBeDefined()
    })

    it('should create different uuids', () => {
        const id1 = uuid(), id2 = uuid()
        expect(id1 !== id2).toBeTruthy()
    })
    
})