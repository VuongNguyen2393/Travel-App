import {handleCreateTrip} from '../src/client/js/formHandler'

describe('Test for handleSubmit function', ()=>{
    test('Verify that handleSubmit is defined', () => {
        expect(handleCreateTrip).toBeDefined();
    })
})