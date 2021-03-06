import _ from 'lodash'
import { flashReducers } from './flashReducers'

describe('Flash reducers', ()=> {
  it('should return the initial state', ()=> {
    expect(flashReducers(undefined, {})).to.eql({ messages: [] })
  })

  context('Given State Has Messages', ()=> {
    const messages = [
      { id: 'abc' },
      { id: 'def' },
      { id: 'ghi' },
    ]
    const stateWithMessages = { messages }

    describe('REMOVE_FLASH action', ()=> {
      let removeFlashAction
      beforeEach(() => {
        removeFlashAction = {
          type: 'REMOVE_FLASH',
          payload: {
            flash_id: _.sample(messages).id,
          },
        }
      })

      it('does nothing when the flash_id isn\'t contained', ()=> {
        function assertStateUnchanged(state, flash_id) {
          removeFlashAction.payload.flash_id = flash_id
          expect(
            flashReducers(state, removeFlashAction)
          ).to.eql(state)
        }
        assertStateUnchanged(stateWithMessages, void 0)
        assertStateUnchanged(stateWithMessages, 'not-contained')
        assertStateUnchanged(stateWithMessages, 99)
        assertStateUnchanged(stateWithMessages, {})
        assertStateUnchanged(stateWithMessages, '')
      })


      it('removes a message by id', ()=> {
        const nextState = flashReducers(stateWithMessages, removeFlashAction)
        const expectedMessages = _.reject(messages, {
          id: removeFlashAction.payload.flash_id,
        })
        expect(nextState).to.eql({
          messages: expectedMessages,
        })
      })
    })
  })
})
