import {isPastDay, formatDate, getDiffDays} from '../src/client/js/dateHandler'

describe('Test for isPastDay function', ()=>{
    test('Verify that a past day', () => {
        expect(isPastDay('2023-05-17')).toBe(true);
    })

    test('Verify that not a past day', () => {
        expect(isPastDay('2025-05-17')).toBe(false);
    })
})

describe('Test for getDiffDays function', ()=>{
    test('Verify that function count the diff days correctly', () => {
        expect(getDiffDays('2023-05-17','2023-05-20')).toBe(3);
    })
})

describe('Test for formatDate function', ()=>{
    test('Verify that function create format correctly', () => {
        expect(formatDate('2023-May-15')).toBe('2023-05-15');
    })
})