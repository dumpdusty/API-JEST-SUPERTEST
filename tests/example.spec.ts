describe('simple math functions positive', () => {
    it('verify sum', () => {
        expect(4 + 4).toEqual(8)
    })

    it('verify diff', () => {
        expect(4 - 4).toEqual(0)
    })

    it('verify mult', () => {
        expect(4 * 4).toEqual(16)
    })

    it('verify div', () => {
        expect(4 / 4).toEqual(2)
    })
})

describe('simple math functions negative', () => {
    it('verify sum', () =>{
        expect(4 + 4).not.toEqual(9)
    })

    it('verify diff', () =>{
        expect(4 - 4).not.toEqual(1)
    })

    it('verify mult', () =>{
        expect(4 * 4).not.toEqual(1)
    })

    it('verify div', () =>{
        expect(4 / 4).not.toEqual(0)
    })

    it('verify div-2', () =>{
        expect(4 / 4).not.toEqual(2)
    })
})