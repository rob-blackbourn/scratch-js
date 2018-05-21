import { Length } from './domains'

describe('domain', () => {

    describe('length', () => {

        it('should find locale detail for more specific defined locale', () => {
            const detail = Length.localeDetail('en-GB')
            expect(detail).toBeDefined()
            expect(detail.name).toBe("length")
        })

        it('should find locale detail for default locale', () => {
            const detail = Length.localeDetail()
            expect(detail).toBeDefined()
            expect(detail.name).toBeDefined()
        })

        it('should find locale detail for the same locale', () => {
            const detail = Length.localeDetail('en-GB')
            expect(detail).toBeDefined()
            expect(detail.name).toBe("length")
            const detail2 = Length.localeDetail('en-GB')
            expect(detail2).toBeDefined()
            expect(detail2.name).toBe("length")
        })
    })
})