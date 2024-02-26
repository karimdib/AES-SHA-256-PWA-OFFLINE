
<script>
import { inject } from 'vue'
import CryptoJS from 'crypto-js'

export default {
  data() {
    return {
      cryptojs: inject('cryptojs'),
      show: false,
      inputFilled: false,
      input: '',
      psw: 'Secret Passphrase',
      fakeText: '',
      decryptedText: '',
      textCrypted: '',
      classDecrypt: false
    }
  },
  methods: {
    hi() {
      const uuid = CryptoJS.lib.WordArray.random(16);
      this.fakeText = CryptoJS.enc.Hex.stringify(uuid);
    },
    changeClass() {
      this.show = true;
    },
    validateInput() {
      this.inputFilled = this.input.trim() !== '';
    },
    encrypt(data, password) {
      try {
        const salt = CryptoJS.lib.WordArray.random(128 / 8);
        const key = CryptoJS.PBKDF2(password, salt, { keySize: 512 / 32, iterations: 1000 });
        const encrypted = CryptoJS.AES.encrypt(data, key, { iv: salt }).toString();
        if (!encrypted) {
          console.error('Encryption failed.');
          return null;
        }
        this.textCrypted = salt.toString() + encrypted;
        return this.textCrypted;
      } catch (error) {
        console.error('Encryption failed:', error.message);
        return null;
      }
    },
    decrypt(textCrypted, psw) {
      try {
        const salt = CryptoJS.enc.Hex.parse(textCrypted.substring(0, 32));
        const encryptedData = textCrypted.substring(32);
        const key = CryptoJS.PBKDF2(psw, salt, { keySize: 512 / 32, iterations: 1000 });
        const decrypted = CryptoJS.AES.decrypt(encryptedData, key, { iv: salt });
        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

        if (decryptedText.trim() === '') {
          throw new Error('Decryption failed: Empty result');
        }

        this.classDecrypt = true;
        return decryptedText;
      } catch (error) {
        console.error('Decryption failed:', error.message);
        return null;
      }
    },
    decryptMessage() {
      if (this.textCrypted && this.psw) {
        this.decryptedText = this.decrypt(this.textCrypted, this.psw);
      } else {
        console.error("Input or password is empty.");
      }
    }
  },
  created() {
    this.hi()
  }

}
</script>
<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        Encrypt your message
      </div>
      <div class="card-body">
        <div class="input-group xx input-group-sm mb-3 xx">
          <span class="input-group-text span d-flex justify-content-center">Write</span>
          <textarea class="form-control input-text" aria-label="With textarea" placeholder="Write your message"
            v-model="input" @input="validateInput"></textarea>
        </div>
        <div class="card-text">
          <div class="result " :class="{ 'show': show && inputFilled, 'remove': !(show && inputFilled) }">
            <div class=" input-group input-group-sm mb-3 xx">
              <span class="input-group-text span d-flex justify-content-center" id="inputGroup-sizing-sm">AES
                Encrypt</span>
              <div type="text" class="form-control input-text text-start" aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm">
                <p>{{ encrypt(input, psw) }}</p>
              </div>
            </div>
            <div class="input-group input-group-sm mb-3 xx">
              <span class="input-group-text span d-flex justify-content-center" id="inputGroup-sizing-sm">SHA256</span>
              <div type="text" class="form-control input-text" aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm">
                <p>{{ cryptojs.SHA256(fakeText).toString() }}</p>
              </div>
            </div>
            <div class=" input-group input-group-sm mb-3 xx ">
              <span class="input-group-text span d-flex justify-content-center d-flex justify-content-center"
                id="inputGroup-sizing-sm decrypt" :class="{ 'ff': classDecrypt }">AES
                Decrypt</span>
              <div type="text" class="form-control input-text decrypt-div " :class="{ 'decrypt-block': classDecrypt }"
                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-html="decryptedText" readonly>
              </div>
            </div>
            <div class="element"></div>
          </div>
        </div>
        <button type="submit" href="#" class="btn btn-primary mx-3" id="button-encrypt"
          @click="changeClass()">Send</button>
        <button type="button" class="btn btn-secondary" id="button-decrypt" @click="decryptMessage()">Decrypt</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use './app.scss';

.remove {
  display: none !important;
}



#button-decrypt {
  background-image: url('../public/blu.png');
  color: white !important;
}

#button-encrypt {
  background-image: url('../public/blurry-gradient-haikei.png');
  color: white !important;
  border-color: currentColor;
}


@media screen and (max-width:550px) {

  body {
    display: block !important;

  }

  .container {
    max-width: 390px;

    .span {
      width: 100% !important;
      height: 30px;
    }
  }
}

@media screen and (min-width:551px) {
  body {
    display: flex !important;
  }

  .container {
    max-width: 700px !important;

    .span {
      border-radius: 4px 1px 1px 4px !important;
    }

    .input-text {
      border-radius: 1px 4px 4px 1px !important;

    }

  }

  @media screen and (max-width:576px) {
    body {
      display: block !important;
    }

    .container {
      max-width: 500px !important;
    }

  }
}
</style>

