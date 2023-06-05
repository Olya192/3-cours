import {describe, expect, test} from '@jest/globals';
import { getTime } from './level2';


describe('Проверка', () => {
   test('Проверка на формат', () => {
        const res = getTime(2.14)
        expect(res).toEqual('02.14')
    })
})