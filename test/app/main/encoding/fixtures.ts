/**
 * Test vectors from SLIP-0032 :
 * Extended serialization format for BIP-32 wallets
 * @type {{
 *        valid: {
 *          keyPath: string;
 *          prvHex: string;
 *          pubHex: string;
 *          prvBech32: string;
 *          pubBech32: string}[]
 *        }}
 */
export const slip32 = {
  valid: [
    {
      keyPath: "m",
      prvHex: "007923408dadd3c7b56eed15567707ae5e5dca089de972e07f3b860450e2a3b70e001837c1be8e299" +
        "5ec11cda2b066151be2cfb48adf9e47b151d46adab3a21cdf67",
      pubHex: "007923408dadd3c7b56eed15567707ae5e5dca089de972e07f3b860450e2a3b70e03d902f35f560e0" +
        "470c63313c7369168d9d7df2d49bf295fd9fb7cb109ccee0494",
      prvBech32: "xprv1qpujxsyd4hfu0dtwa524vac84e09mjsgnh5h9crl8wrqg58z5wmsuqqcxlqmar3fjhkprndzk" +
        "pnp2xlze76g4hu7g7c4r4r2m2e6y8xlvu566tn6",
      pubBech32: "xpub1qpujxsyd4hfu0dtwa524vac84e09mjsgnh5h9crl8wrqg58z5wmsuq7eqte474swq3cvvvcnc" +
        "umfz6xe6l0j6jdl990an7mukyyuemsyjszuwypl",
    },
    {
      keyPath: "m/0",
      prvHex: "0100000000e0e6503ac057cf5dc76e0735e56dd44d193b2e9e271cc2d46bc759c99b021e3c00baa89" +
        "a8bdd61c5e22b9f10601d8791c9f8fc4b2fa6df9d68d336f0eb03b06eb6",
      pubHex: "0100000000e0e6503ac057cf5dc76e0735e56dd44d193b2e9e271cc2d46bc759c99b021e3c0376bf5" +
        "33d4b15510fa9f4124b6e48616f07debcf2ef0cfb185cdc4a576450b475",
      prvBech32: "xprv1qyqqqqqqurn9qwkq2l84m3mwqu672mw5f5vnkt57yuwv94rtcavunxczrc7qpw4gn29a6cw9u" +
        "g4e7yrqrkrerj0cl39jlfkln45dxdhsavpmqm4krfqykk",
      pubBech32: "xpub1qyqqqqqqurn9qwkq2l84m3mwqu672mw5f5vnkt57yuwv94rtcavunxczrc7qxa4l2v75k923p" +
        "75lgyjtdeyxzmc8m6709mcvlvv9ehz22aj9pdr4m6lwmk",
    },
    {
      keyPath: "m/1",
      prvHex: "01000000015c48917d6838b666aeb11eac7c4f98f807779b57c7522e38509719eeb1e7a59200c1bea" +
        "ff0c4db984670a40c69c2947b9d33cd7f6e749c67e1fcb5c6118dda1282",
      pubHex: "01000000015c48917d6838b666aeb11eac7c4f98f807779b57c7522e38509719eeb1e7a59202ea264" +
        "9b3512b9a859ab658a85e2989a7ae39b2518877b2dc0f2b44b785d5788d",
      prvBech32: "xprv1qyqqqqqpt3yfzltg8zmxdt43r6k8cnuclqrh0x6hcafzuwzsjuv7av085kfqpsd74lcvfkucg" +
        "ec2grrfc228h8fne4lkuayuvlsledwxzxxa5y5zefalyg",
      pubBech32: "xpub1qyqqqqqpt3yfzltg8zmxdt43r6k8cnuclqrh0x6hcafzuwzsjuv7av085kfq963xfxe4z2u6s" +
        "kdtvk9gtc5cnfaw8xe9rzrhktwq726yk7za27ydw88adn",
    },
    {
      keyPath: "m/0'",
      prvHex: "0180000000f1c03f5ff97108912fd56761d3fada8879e4173aba45f10da4bbd94b1c49716000c08cf" +
        "331996482c06db3d259ff99be4bf7083824d53185e33191ee7ceb2bf96f",
      pubHex: "0180000000f1c03f5ff97108912fd56761d3fada8879e4173aba45f10da4bbd94b1c497160027f1d8" +
        "7730e460e921b382242911565bf93daf2081ed685b2edd1d01176b2c13c",
      prvBech32: "xprv1qxqqqqqq78qr7hlewyyfzt74vasa87k63pu7g9e6hfzlzrdyh0v5k8zfw9sqpsyv7vcejeyzc" +
        "pkm85jel7vmujlhpquzf4f3sh3nry0w0n4jh7t0jhc039",
      pubBech32: "xpub1qxqqqqqq78qr7hlewyyfzt74vasa87k63pu7g9e6hfzlzrdyh0v5k8zfw9sqylcasaesu3swj" +
        "gdnsgjzjy2kt0unmteqs8kkskewm5wsz9mt9sfuvlxj6p",
    },
    {
      keyPath: "m/1'",
      prvHex: "018000000143cc4bca59c666a5f79265148125802ed2cec46df1c5ca8e6a058dab525a73f1003ef02" +
        "fc53000742891fc90458ba9edc8363d8f1f267e326b1078710c7db34de5",
      pubHex: "018000000143cc4bca59c666a5f79265148125802ed2cec46df1c5ca8e6a058dab525a73f103b5184" +
        "a526dac6abda3d8d54a541471ce83e8c2260d56706053e2780922319f5e",
      prvBech32: "xprv1qxqqqqqpg0xyhjjecen2taujv52gzfvq9mfva3rd78zu4rn2qkx6k5j6w0csq0hs9lznqqr59" +
        "zgleyz93w57mjpk8k837fn7xf43q7r3p37mxn095hysnx",
      pubBech32: "xpub1qxqqqqqpg0xyhjjecen2taujv52gzfvq9mfva3rd78zu4rn2qkx6k5j6w0cs8dgcfffxmtr2h" +
        "k3a34222s28rn5rarpzvr2kwps98cncpy3rr867k5u83k",
    },
    {
      keyPath: "m/44'/0'/0'",
      prvHex: "038000002c80000000800000003da4bc190a2680111d31fadfdc905f2a7f6ce77c6f109919116f253" +
        "d4344521900fe64af825b5b78554c33a28b23085fc082f691b3c712cc1d4e66e133297da87a",
      pubHex: "038000002c80000000800000003da4bc190a2680111d31fadfdc905f2a7f6ce77c6f109919116f253" +
        "d4344521903774c910fcf07fa96886ea794f0d5caed9afe30b44b83f7e213bb92930e7df4bd",
      prvBech32: "xprv1qwqqqqpvsqqqqqyqqqqqq0dyhsvs5f5qzywnr7klmjg972nldnnhcmcsnyv3zme984p5g5seq" +
        "rlxftuztddhs42vxw3gkgcgtlqg9a53k0r39nqafenwzvef0k585enml6g",
      pubBech32: "xpub1qwqqqqpvsqqqqqyqqqqqq0dyhsvs5f5qzywnr7klmjg972nldnnhcmcsnyv3zme984p5g5seq" +
        "dm5eyg0eurl495gd6nefux4etke4l3sk39c8alzzwae9ycw0h6t6ltmssr",
    },
    {
      keyPath: "m/44'/0'/1'",
      prvHex: "038000002c80000000800000012971fa2db0ff5d69e166a406813aa3d9ed09c4adac2e0ce33523da8" +
        "c5609f4f4008855dfda37fe663bffc0136618504e3cbd7d992134609cef6191c729339d5c65",
      pubHex: "038000002c80000000800000012971fa2db0ff5d69e166a406813aa3d9ed09c4adac2e0ce33523da8" +
        "c5609f4f4025d0261853d4c3a379160fb51d2f262ac64e65219139982c4e2180bcef1a233d9",
      prvBech32: "xprv1qwqqqqpvsqqqqqyqqqqqz2t3lgkmpl6ad8skdfqxsya28k0dp8z2mtpwpn3n2g7633tqna85q" +
        "zy9th76xllxvwllcqfkvxzsfc7t6lveyy6xp880vxguw2fnn4wx2mhtjy8",
      pubBech32: "xpub1qwqqqqpvsqqqqqyqqqqqz2t3lgkmpl6ad8skdfqxsya28k0dp8z2mtpwpn3n2g7633tqna85q" +
        "fwsycv984xr5du3vra4r5hjv2kxfejjryfenqkyugvqhnh35geajlgxhp0",
    },
    {
      keyPath: "m/44'/2'/0'",
      prvHex: "038000002c8000000280000000869c5045e5fc789646babcd1961b101bc31e75fe50df8a585c79b05" +
        "dca0ac75800983cd10d8d14160b10b9a4bb63207e9585054a3133619d57b78ea9d5aa3046d2",
      pubHex: "038000002c8000000280000000869c5045e5fc789646babcd1961b101bc31e75fe50df8a585c79b05" +
        "dca0ac7580340fe3b8e89165258bac0cb711613c618d1af63dc321a90b751d0697301441bcc",
      prvBech32: "xprv1qwqqqqpvsqqqqq5qqqqqpp5u2pz7tlrcjert40x3jcd3qx7rre6lu5xl3fv9c7dsth9q436cq" +
        "zvre5gd352pvzcshxjtkceq062c2p22xyekr82hk782n4d2xprdysp4gxc",
      pubBech32: "xpub1qwqqqqpvsqqqqq5qqqqqpp5u2pz7tlrcjert40x3jcd3qx7rre6lu5xl3fv9c7dsth9q436cq" +
        "dq0uwuw3yt9yk96cr9hz9snccvdrtmrmsep4y9h28gxjucpgsducuj4f9r",
    },
    {
      keyPath: "m/49'/0'/0'",
      prvHex: "038000003180000000800000006eaae365ae0e0a0aab84325cfe7cd76c3b909035f889e7d3f1b847a" +
        "9a0797ecb00880d51752bda4190607e079588d3f644d96bfa03446bce93cddfda3c4a99c7e6",
      pubHex: "038000003180000000800000006eaae365ae0e0a0aab84325cfe7cd76c3b909035f889e7d3f1b847a" +
        "9a0797ecb02f1f347891b20f7568eae3ec9869fbfb67bcab6f358326f10ecc42356bd55939d",
      prvBech32: "xprv1qwqqqqp3sqqqqqyqqqqqqm42udj6urs2p24cgvjule7dwmpmjzgrt7yfulflrwz84xs8jlktq" +
        "zyq65t490dyryrq0cretzxn7ezdj6l6qdzxhn5neh0a50z2n8r7vumvllf",
      pubBech32: "xpub1qwqqqqp3sqqqqqyqqqqqqm42udj6urs2p24cgvjule7dwmpmjzgrt7yfulflrwz84xs8jlktq" +
        "tclx3ufrvs0w45w4clvnp5lh7m8hj4k7dvrymcsanzzx44a2kfe6xynfgh",
    },
    {
      keyPath: "m/49'/2'/0'",
      prvHex: "0380000031800000028000000067b7e1dc5c70a93504218ccf40c47ad46d4a9c858196376ce0e853a" +
        "ca7be049800cf222cc2e097049fe2ca76626c19c7e7a3ef971b1f64195758ab3c832463fcf4",
      pubHex: "0380000031800000028000000067b7e1dc5c70a93504218ccf40c47ad46d4a9c858196376ce0e853a" +
        "ca7be049802b07388bd2edaba3c0a2c0856716fd7c9965d212fb2736f7b925f57d922b10ace",
      prvBech32: "xprv1qwqqqqp3sqqqqq5qqqqqqeahu8w9cu9fx5zzrrx0grz844rdf2wgtqvkxakwp6zn4jnmupycq" +
        "r8jytxzuztsf8lzefmxymqecln68muhrv0kgx2htz4neqeyv070gg6dcn7",
      pubBech32: "xpub1qwqqqqp3sqqqqq5qqqqqqeahu8w9cu9fx5zzrrx0grz844rdf2wgtqvkxakwp6zn4jnmupycq" +
        "2c88z9a9mdt50q29sy9vut06lyevhfp97e8xmmmjf040kfzky9vu2pu92u",
    },
    {
      keyPath: "m/84'/0'/0'",
      prvHex: "038000005480000000800000004a53a0ab21b9dc95869c4e92a161194e03c0ef3ff5014ac692f433c" +
        "4765490fc00e14f274d16ca0d91031b98b162618061d03930fa381af6d4caf44b01819ab6d4",
      pubHex: "038000005480000000800000004a53a0ab21b9dc95869c4e92a161194e03c0ef3ff5014ac692f433c" +
        "4765490fc02707a62fdacc26ea9b63b1c197906f56ee0180d0bcf1966e1a2da34f5f3a09a9b",
      prvBech32: "xprv1qwqqqqz5sqqqqqyqqqqqqjjn5z4jrwwujkrfcn5j59s3jnsrcrhnlagpftrf9apnc3m9fy8uq" +
        "rs57f6dzm9qmygrrwvtzcnpspsaqwfslgup4ak5et6ykqvpn2mdggeaxrp",
      pubBech32: "xpub1qwqqqqz5sqqqqqyqqqqqqjjn5z4jrwwujkrfcn5j59s3jnsrcrhnlagpftrf9apnc3m9fy8uq" +
        "fc85cha4npxa2dk8vwpj7gx74hwqxqdp083jehp5tdrfa0n5zdfkg3lp00",
    },
  ],
}
