export const pendingTransactions = [
  {
    status: "unconfirmed",
    address: "wit1qre9fq64r5jgv0t3m8q3tvnqwphxm9xpacvrdhe5",
    receiver: true,
    amount: "+1"
  },
  {
    status: "timelocked",
    address: "Genesis block",
    receiver: true,
    amount: "+0.1",
    vestingTime: "(Vesting on October 21th 2019)"
  }
]

export const confirmedTransactions = [
  {
    address: "wit1qre9fq64r5jgv0t3m8q3tvnqwphxm9xpacvrdhe5",
    receiver: true,
    amount: "+0.1",
    block: "92673",
    date: "April 23 at 14:38"
  },
  {
    address: "wit1qre9fq64r5jgv0t3m8q3tvnqwphxm9xpacvrdhe5",
    receiver: false,
    amount: "-0.1",
    block: "92673",
    date: "April 23 at 14:38"
  },
  {
    address: "wit1qre9fq64r5jgv0t3m8q3tvnqwphxm9xpacvrdhe5",
    receiver: true,
    amount: "+0.1",
    block: "92673",
    date: "April 23 at 14:38"
  }
]

export const confirmedOptions = [
  {
    text: "Option 1",
    onClick: () => {
      console.log("CLICKED 2")

      return
    }
  },
  {
    text: "Option 2",
    onClick: () => {
      console.log("CLICKED 2")

      return
    }
  },
  {
    text: "Option 3",
    onClick: () => {
      console.log("CLICKED 3")

      return
    }
  }
]

export const balanceData = {
  availableBalance: "3.141592",
  timelocked: "1",
  unconfirmed: "0.1",
  total: "4.241592"
}

export const paymentRequest = [{
  creationDate: "May 17, 2018",
  expirationDate: "May 15, 2018",
  status: "still into force",
  from: "Satoshi Nakamoto",
  amount: "1",
  actions: confirmedOptions
},
{
  creationDate: "May 17, 2018",
  expirationDate: "May 15, 2018",
  status: "expired",
  from: "Nick Szabo",
  amount: "1",
  actions: confirmedOptions
},
{
  creationDate: "May 17, 2018",
  status: "never funded",
  from: "Hal Finney",
  amount: "1",
  actions: confirmedOptions
}]

export const marketplaceProducts = [{
  title: "n-of-m multisig",
  author: "aesedepece",
  cover: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  alt: "example",
  rating: "4.5",
  tags: ["multisig", "parametric"]
},
{
  title: "Pay to Alice or Bob, based on API response",
  author: "aesedepece",
  cover: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  alt: "example",
  rating: "4.5",
  tags: ["bet", "oracle", "parametric"]
},
{
  title: "Crypto-heirship",
  author: "aesedepece",
  cover: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  alt: "example",
  rating: "4.5",
  tags: ["oracle", "parametric"]
},
{
  title: "Pay if flight is delayed",
  author: "aesedepece",
  cover: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  alt: "example",
  rating: "4.5",
  tags: ["oracle", "parametric"]
},
{
  title: "Pay if it rains",
  author: "aesedepece",
  cover: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  alt: "example",
  rating: "4.5",
  tags: ["oracle", "parametric", "weather"]
}
]