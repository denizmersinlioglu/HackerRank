import { expect, describe, it } from '@jest/globals'
import { bomberMan, getRandomInt } from '../src'

describe('Endeavour case', () => {
  it('should create', () => {
    const expected = Math.round(new Date().getTime())

    const result = getRandomInt(expected, expected + 1)

    expect(result).toEqual(expected)
  })

  it('should return exact number when range is one', () => {
    const expected = Math.round(new Date().getTime())

    const result = getRandomInt(expected, expected + 1)

    expect(result).toEqual(expected)
  })

  it('bomberman should have right grid', () => {
    // Given
    let grid = ['.......', '...O.O.', '....O..', '..O....', 'OO...OO', 'OO.O...']
    const expectedGrid = ['.......', '...O.O.', '...OO..', '..OOOO.', 'OOOOOOO', 'OOOOOOO']

    // When
    grid = bomberMan(9, grid)

    // Then
    expect(grid).toEqual(expectedGrid)
  })
})
