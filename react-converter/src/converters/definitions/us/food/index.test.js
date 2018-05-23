import { StickConverter } from './butter'
import { PoundConverter } from '../customary/mass'

describe('butter', () => {

    it('should convert a stick of butter to pounds', () => {
        const sticks = 1;
        const pounds = StickConverter.convert(sticks, PoundConverter)
        expect(pounds.valueOf()).toBe(0.25)
    })

})