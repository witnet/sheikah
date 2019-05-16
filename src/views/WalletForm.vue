<template>
  <div>
    <!-- Welcome step -->
    <el-card v-if="step === 'welcome'" class="box-card">
      <div slot="header" class="clearfix">
        <span>Hey, listen!</span>
      </div>
      <p
        class="subtitle"
      >This assistant will guide you through the process of creating your own Witnet wallet.</p>
      <p class="text">
        A wallet is an app that keeps your credentials safe and lets you interface with the
        Witnet blockchain in many ways: from transferring Wit to someone else to creating
        smart contracts.
      </p>
      <el-button
        v-on:click="goStep('seedTypeSelection')"
        style="float: right; margin: 3px"
        type="text"
      >Let's do this</el-button>
    </el-card>

    <el-card v-else-if="step === 'seedTypeSelection'" class="box-card">
      <div slot="header" class="clearfix">
        <span>Create your wallet</span>
      </div>
      <p class="text">We will now help you create a new local wallet.</p>
      <div class="list">
        <el-button v-on:click="goStep('newSeedDisclaimer')">Create new seed phrase</el-button>
        <el-button
          v-on:click="goStep('newPrefilledSeed')"
        >Create a wallet prefilled with sample data</el-button>
        <el-button v-on:click="goStep('importSeed')">Import and advanced options</el-button>
        <el-button v-on:click="goStep('welcome')">Cancel</el-button>
      </div>
    </el-card>

    <el-card v-else-if="step === 'newSeedDisclaimer'" class="box-card">
      <div slot="header" class="clearfix">
        <span>IMPORTANT</span>
      </div>
      <p>
        You will be shown a 12 word seed phrase. This seed phrase is very important. If you are
        ever locked out of your wallet or lose access for any reason, you can regain access to
        your wallet again from any computer using your seed phrase.
      </p>
      <p>
        You should never share your seed phrase with anyone. We at Witnet do not store your seed
        phrase and will never ask you to share it with us. If you lose your seed phrase, you will
        permanently lose access to your wallet and your funds.
      </p>
      <p>
        If someone finds or sees your seed phrase, they will have access to your wallet and all
        of your funds.
      </p>
      <p>
        We recommend storing your seed phrase on paper somewhere safe. Do not store it in a file
        on your computer or anywhere electronically.
      </p>
      <el-button v-on:click="gotStep('seedTypeSelection')">Back</el-button>
      <el-button v-on:click="goStep('walletSeedPhraseBackup')">I will be carefull, I promise</el-button>
    </el-card>

    <el-card v-else-if="step === 'walletSeedPhraseBackup'" class="box-card">
      <div slot="header" class="clearfix">
        <span>Wallet seed phrase backup</span>
      </div>
      <p>Your 12 word seed phrase:</p>
      <div class="seed">
        <p>blood future hammer aerobic anothe basic</p>
        <p>blood future hammer aerobic anothe basic</p>
      </div>
      <p>
        Please copy these 12 words onto a piece of paper which you will be able to safely store
        and secure. You must write the complete words in the exact order they are presented to
        you.
      </p>
      <p>
        We do not store your seed phrase - if you exit this setup or fail to write down your
        seed phrase, we cannot help you access your wallet.
      </p>
      <el-button v-on:click="gotStep('newSeedDisclaimer')">Back</el-button>
      <el-button v-on:click="goStep('seedValidation')">Next</el-button>
    </el-card>

    <el-card v-else-if="step === 'seedValidation'" class="box-card">
      <div slot="header" class="clearfix">
        <span>Wallet seed validation</span>
      </div>
      <p>Your 12 word seed phrase:</p>
      <div class="seed">
        <p>blood future hammer aerobic anothe basic</p>
        <p>blood future hammer aerobic anothe basic</p>
      </div>
      <p>
        Please copy these 12 words onto a piece of paper which you will be able to safely store
        and secure. You must write the complete words in the exact order they are presented to
        you.
      </p>
      <p>
        We do not store your seed phrase - if you exit this setup or fail to write down your
        seed phrase, we cannot help you access your wallet.
      </p>
      <el-button v-on:click="gotStep('walletSeedPhraseBackupt')">Back</el-button>
      <el-button v-on:click="goStep('encryptionPassword')">Next</el-button>
    </el-card>

    <el-card v-else-if="step === 'encryptionPassword'" class="box-card">
      <div slot="header" class="clearfix">
        <span>Wallet seed validation</span>
      </div>

      <p>
        <strong>PLEASE NOTE:</strong> this password encrypts your Witnet wallet only on this
        computer. This is not your backup and you cannot restore your wallet with this password.
        Your seed phrase is still your ultimate backup.
      </p>
      <el-input placeholder="Password"/>
      <el-input placeholder="Repeat password"/>

      <el-button v-on:click="gotStep('seedValidation')">Back</el-button>
      <router-link to="/main">Next</router-link>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'WalletForm',
  data () {
    return {
      step: 'welcome',
    }
  },
  methods: {
    goStep (step) {
      this.step = step
    },
  },
}
</script>

<style>
.seed {
  align-items: center;
  border: 2px dashed grey;
  border-radius: 2px;
  color: #909090;
  font-size: 16px;
}
.text {
  font-size: 14px;
}
.list {
  display: flex;
  flex-direction: column;
}

.list > button {
  margin: 0;
}
.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}

.link {
  text-align: right;
}

.subtitle {
  color: #333;
  margin-bottom: 30px;
}

.text {
  color: #909090;
  margin-bottom: 20px;
}
</style>
