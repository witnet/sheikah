import walletModule from '@/store/wallet'

const { actions } = walletModule
const { setCurrentTransactionsPage } = actions

describe('Vuex Action setCurrentTransactionsPage', () => {
  it('should dispatch get getTransactions with given page', async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    const state = { errors: {} }
    const page = 1

    await setCurrentTransactionsPage({ commit, dispatch, state }, { page })

    expect(dispatch).toBeCalledWith('getTransactions', { page })
  })

  it('should wait to resolve getTransactions before call setCurrentTransactionPage', async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    const state = { errors: {} }
    const page = 1

    setCurrentTransactionsPage({ commit, dispatch, state }, { page })

    // if it didn't wait, it would call commit
    expect(commit).toHaveBeenCalledTimes(0)
  })

  it('should not call setCurrentTransactionPage if there is an error', async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    const state = {
      errors: {
        getTransactions: true,
      },
    }

    const page = 1

    setCurrentTransactionsPage({ commit, dispatch, state }, { page })

    expect(commit).toHaveBeenCalledTimes(0)
  })
})
