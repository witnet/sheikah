import { hardened } from "app/main/crypto/keyPath"

export const passPhrase = "Bitcoin seed"
export const encoding = "hex"
export const basic = {
  seedEntropy: "000102030405060708090a0b0c0d0e0f",
  deriveChildPrivateKey: {
    keyPath: 0,
    derivedKeyBytes: "4e2cdcf2f14e802810e878cf9e6411fc4e712edf19a06bcfcc5d5572e489a3b7",
    derivedChainCode: "d323f1be5af39a2d2f08f5e8f664633849653dbe329802e9847cfc85f8d7b52a"
  },
  deriveHardenedChildPrivateKey: {
    keyPath: hardened(0),
    derivedKeyBytes: "edb2e14f9ee77d26dd93b4ecede8d16ed408ce149b6cd80b0715a2d911a0afea",
    derivedChainCode: "47fdacbd0f1097043b78c63c20c34ef4ed9a111d980047ad16282c7ae6236141"
  },
  derivePublicKeyFromPrivate: {
    derivedKeyBytes: "0339a36013301597daef41fbe593a02cc513d0b55527ec2df1050e2e8ff49c85c2",
    derivedChainCode: "873dff81c02f525623fd1fe5167eac3a55a049de3d314bb42ee227ffed37d508"
  },
  deriveChildPublickey: {
    keyPath: 0,
    derivedKeyBytes: "027c4b09ffb985c298afe7e5813266cbfcb7780b480ac294b0b43dc21f2be3d13c",
    derivedChainCode: "d323f1be5af39a2d2f08f5e8f664633849653dbe329802e9847cfc85f8d7b52a"
  }
}

export const vector1 = {
  seedEntropy: "000102030405060708090a0b0c0d0e0f",
  m0h: {
    keyPath: "m/0'/1",
    derivedKeyBytes: "3c6cb8d0f6a264c91ea8b5030fadaa8e538b020f0a387421a12de9319dc93368",
    derivedChainCode: "2a7857631386ba23dacac34180dd1983734e444fdbf774041578e9b6adb37c19"
  },
  m0h_pub: {
    derivedKeyBytes: "03501e454bf00751f24b1b489aa925215d66af2234e3891c3b21a52bedb3cd711c",
    derivedChainCode: "2a7857631386ba23dacac34180dd1983734e444fdbf774041578e9b6adb37c19"
  },
  m0h_1: {
    keyPath: 1,
    derivedKeyBytes: "03501e454bf00751f24b1b489aa925215d66af2234e3891c3b21a52bedb3cd711c",
    derivedChainCode: "2a7857631386ba23dacac34180dd1983734e444fdbf774041578e9b6adb37c19"
  },
  m0h_1_pub: {
    keyPath: 1,
    derivedKeyBytes: "03501e454bf00751f24b1b489aa925215d66af2234e3891c3b21a52bedb3cd711c",
    derivedChainCode: "2a7857631386ba23dacac34180dd1983734e444fdbf774041578e9b6adb37c19"
  },
  m0h_1_2h: {
    keyPath: "m/0'/1/2'",
    derivedKeyBytes: "cbce0d719ecf7431d88e6a89fa1483e02e35092af60c042b1df2ff59fa424dca",
    derivedChainCode: "04466b9cc8e161e966409ca52986c584f07e9dc81f735db683c3ff6ec7b1503f"
  },
  m0h_1_2h_pub: {
    derivedKeyBytes: "0357bfe1e341d01c69fe5654309956cbea516822fba8a601743a012a7896ee8dc2",
    derivedChainCode: "04466b9cc8e161e966409ca52986c584f07e9dc81f735db683c3ff6ec7b1503f"
  },
  m0h_1_2h_2: {
    keyPath: "m/0'/1/2'/2",
    derivedKeyBytes: "0f479245fb19a38a1954c5c7c0ebab2f9bdfd96a17563ef28a6a4b1a2a764ef4",
    derivedChainCode: "cfb71883f01676f587d023cc53a35bc7f88f724b1f8c2892ac1275ac822a3edd"
  },
  m0h_1_2h_2_pub: {
    derivedKeyBytes: "02e8445082a72f29b75ca48748a914df60622a609cacfce8ed0e35804560741d29",
    derivedChainCode: "cfb71883f01676f587d023cc53a35bc7f88f724b1f8c2892ac1275ac822a3edd"
  },
  m0h_1_2h_2_pub1: {
    keyPath: 2,
    derivedKeyBytes: "02e8445082a72f29b75ca48748a914df60622a609cacfce8ed0e35804560741d29",
    derivedChainCode: "cfb71883f01676f587d023cc53a35bc7f88f724b1f8c2892ac1275ac822a3edd"
  },
  m0h_1_2h_2_1000000000: {
    keyPath: "m/0'/1/2'/2/1000000000",
    derivedKeyBytes: "471b76e389e528d6de6d816857e012c5455051cad6660850e58372a6c3e6e7c8",
    derivedChainCode: "c783e67b921d2beb8f6b389cc646d7263b4145701dadd2161548a8b078e65e9e"
  },
  m0h_1_2h_2_1000000000_pub: {
    derivedKeyBytes: "022a471424da5e657499d1ff51cb43c47481a03b1e77f951fe64cec9f5a48f7011",
    derivedChainCode: "c783e67b921d2beb8f6b389cc646d7263b4145701dadd2161548a8b078e65e9e"
  },
  m0h_1_2h_2_1000000000_pub_chained: {
    derivedKeyBytes: "471b76e389e528d6de6d816857e012c5455051cad6660850e58372a6c3e6e7c8",
    derivedChainCode: "c783e67b921d2beb8f6b389cc646d7263b4145701dadd2161548a8b078e65e9e"
  }
}

export const vector2 = {
  seedEntropy: "fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c99969" +
    "3908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542",
  m0: {
    keyPath: "m/0",
    derivedKeyBytes: "abe74a98f6c7eabee0428f53798f0ab8aa1bd37873999041703c742f15ac7e1e",
    derivedChainCode: "f0909affaa7ee7abe5dd4e100598d4dc53cd709d5a5c2cac40e7412f232f7c9c"
  },
  m0_pub: {
    derivedKeyBytes: "02fc9e5af0ac8d9b3cecfe2a888e2117ba3d089d8585886c9c826b6b22a98d12ea",
    derivedChainCode: "f0909affaa7ee7abe5dd4e100598d4dc53cd709d5a5c2cac40e7412f232f7c9c"
  },
  m0_2147483647h: {
    keyPath: "m/0/2147483647'",
    derivedKeyBytes: "877c779ad9687164e9c2f4f0f4ff0340814392330693ce95a58fe18fd52e6e93",
    derivedChainCode: "be17a268474a6bb9c61e1d720cf6215e2a88c5406c4aee7b38547f585c9a37d9"
  },
  m0_2147483647h_pub: {
    derivedKeyBytes: "03c01e7425647bdefa82b12d9bad5e3e6865bee0502694b94ca58b666abc0a5c3b",
    derivedChainCode: "be17a268474a6bb9c61e1d720cf6215e2a88c5406c4aee7b38547f585c9a37d9"
  }, m0_2147483647h_1: {
    keyPath: "m0/2147483647'/1",
    derivedKeyBytes: "704addf544a06e5ee4bea37098463c23613da32020d604506da8c0518e1da4b7",
    derivedChainCode: "f366f48f1ea9f2d1d3fe958c95ca84ea18e4c4ddb9366c336c927eb246fb38cb"
  },
  m0_2147483647h_1_pub: {
    derivedKeyBytes: "03a7d1d856deb74c508e05031f9895dab54626251b3806e16b4bd12e781a7df5b9",
    derivedChainCode: "f366f48f1ea9f2d1d3fe958c95ca84ea18e4c4ddb9366c336c927eb246fb38cb"
  },
  m0_2147483647h_1_2147483646h: {
    keyPath: "m0/2147483647'/1/2147483646'",
    derivedKeyBytes: "f1c7c871a54a804afe328b4c83a1c33b8e5ff48f5087273f04efa83b247d6a2d",
    derivedChainCode: "637807030d55d01f9a0cb3a7839515d796bd07706386a6eddf06cc29a65a0e29"
  },
  m0_2147483647h_1_2147483646h_pub: {
    derivedKeyBytes: "02d2b36900396c9282fa14628566582f206a5dd0bcc8d5e892611806cafb0301f0",
    derivedChainCode: "637807030d55d01f9a0cb3a7839515d796bd07706386a6eddf06cc29a65a0e29"
  },
  m0_2147483647h_1_2147483646h_2: {
    keyPath: "m0/2147483647'/1/2147483646'/2",
    derivedKeyBytes: "bb7d39bdb83ecf58f2fd82b6d918341cbef428661ef01ab97c28a4842125ac23",
    derivedChainCode: "9452b549be8cea3ecb7a84bec10dcfd94afe4d129ebfd3b3cb58eedf394ed271"
  },
  m0_2147483647h_1_2147483646h_2_pub: {
    derivedKeyBytes: "024d902e1a2fc7a8755ab5b694c575fce742c48d9ff192e63df5193e4c7afe1f9c",
    derivedChainCode: "9452b549be8cea3ecb7a84bec10dcfd94afe4d129ebfd3b3cb58eedf394ed271"
  }

}