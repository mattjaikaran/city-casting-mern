const InvoiceEdit = require("./InvoiceEdit")

// @ponicode
describe("componentDidMount", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["George", "Pierre Edouard", "Edmond"], ["Jean-Philippe", "George", "George"], ["Pierre Edouard", "Edmond", "Anas"]]
        inst = new InvoiceEdit.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})
