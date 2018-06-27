import {sha256Hasher} from "../../../../app/main/hashers/sha256"

const sha256fixtures = {
  hasher: sha256Hasher,
  pairs: [
    ["Hello, World!", "dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f"]
  ]
}

export default sha256fixtures