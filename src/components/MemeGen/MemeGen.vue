<template>
  <div class="app">
    <div class="googleFontFix">Fix</div>

    <div class="app__toolbar">
      <div class="form-row">
        <b-input-group prepend="File" class="col-lg-4 app__control">
          <b-form-file
            @change="onFileChangeHandler"
            accept="image/jpeg,image/png,image/gif"
            placeholder="Select"
            name="file"
          />
        </b-input-group>

        <b-input-group prepend="Top Text" class="col-lg-4 app__control">
          <b-form-input v-model="topText" name="topText" />
        </b-input-group>

        <b-input-group prepend="Bottom Text" class="col-lg-4 app__control">
          <b-form-input v-model="bottomText" name="bottomText" />
        </b-input-group>
      </div>

      <div class="form-row">
        <b-input-group prepend="Font" class="col-lg-4 app__control">
          <b-form-select v-model="fontFamily" :options="fontFamilyOptions" name="fontFamily" />
        </b-input-group>

        <verte ref="verte" value="#f0f" @input="fontColor = $event" picker="square" model="rgb" />
        <div class="input-group col-lg-4 app__control">
          <div class="input-group-prepend">
            <label class="input-group-text" for="color">Color</label>
          </div>
          <input
            class="form-control"
            readonly
            type="text"
            @click="toggleColorPicker"
            :value="fontColor"
            name="fontColor"
          />
        </div>

        <b-input-group prepend="Font Size" class="col-lg-4 app__control">
          <b-form-input
            style="flex-grow: 1; width: auto;"
            type="range"
            min="15"
            max="50"
            v-model="fontSize"
            name="fontSize"
          />
        </b-input-group>
      </div>
    </div>

    <div class="app__canvas">
      <canvas ref="canvas" id="canvas" />
    </div>

    <div class="app__save">
      <b-input-group class="col-lg-6 app__control">
        <b-form-select v-model="mimeType" :options="mimeTypeOptions" name="mimeType" />

        <template v-slot:append>
          <b-button @click="onSaveHandler" name="save" variant="info">Save As</b-button>
        </template>
      </b-input-group>
    </div>

    <div class="app__results">
      <div class="row">
        <div class="col-md-4" v-for="(item, index) in results" :key="index">
          <div class="card mb-5">
            <img class="card-img-top" alt="A custom meme" :src="item.imageUrl" />
            <div class="card-body">
              <p class="card-text">Top Text: {{ item.topText }}</p>
              <p class="card-text">Bottom Text: {{ item.bottomText }}</p>
              <a :href="item.imageUrl" download="meme" class="btn btn-success">Download</a>
              <button @click="onDeleteHandler(index)" class="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemeGen',
  data() {
    return {
      topText: 'Start Of Debug',
      bottomText: 'End Of Debug',
      fontFamily: 'Arial',
      fontSize: '25',
      fontColor: 'rgb(255, 0, 255)',
      mimeType: 'image/jpeg',
      imageUrl: 'https://i.imgflip.com/2cp1.jpg',
      fontFamilyOptions: [
        { value: null, text: 'Choose...', disabled: true },
        { value: 'Arial', text: 'Arial' },
        { value: 'Comic Sans MS', text: 'Comic Sans MS' },
        { value: 'Pacifico', text: 'Pacifico' },
      ],
      mimeTypeOptions: [
        { value: null, text: 'Choose...', disabled: true },
        { value: 'image/jpeg', text: 'JPG' },
        { value: 'image/png', text: 'PNG' },
        { value: 'image/gif', text: 'GIF' },
      ],
      results: [],
    };
  },

  computed: {
    canvasElement() {
      return this.$refs.canvas;
    },

    canvasContext() {
      return this.canvasElement.getContext('2d');
    },
  },

  mounted() {
    this.render();
  },

  updated() {
    this.render();
  },

  methods: {
    toggleColorPicker() {
      this.$refs.verte.isMenuActive = !this.$refs.verte.isMenuActive;
    },

    onFileChangeHandler(event) {
      const reader = new FileReader();

      reader.onload = () => {
        this.imageUrl = reader.result;

        this.render();
      };

      reader.readAsDataURL(event.target.files[0]);
    },

    onSaveHandler(event) {
      event.preventDefault();

      let snapshot;

      if (this.mimeType === 'image/gif') {
        // eslint-disable-next-line no-undef
        const gif = new GIF({
          workers: 2,
          quality: 10,
        });

        gif.addFrame(this.canvasElement, { delay: 200 });

        gif.on('finished', blob => {
          const reader = new FileReader();

          reader.onload = () => {
            snapshot = reader.result;

            this.results.push({
              topText: this.topText,
              bottomText: this.bottomText,
              imageUrl: snapshot,
            });
          };

          reader.readAsDataURL(blob);
        });

        gif.render();
      } else {
        snapshot = this.canvasElement.toDataURL(this.mimeType);

        this.results.push({
          topText: this.topText,
          bottomText: this.bottomText,
          imageUrl: snapshot,
        });
      }
    },

    onDeleteHandler(index) {
      this.results.splice(index, 1);
    },

    render() {
      const image = new Image();

      image.addEventListener('load', () => {
        this.canvasElement.width = image.width;
        this.canvasElement.height = image.height;

        this.canvasContext.drawImage(image, 0, 0);

        this.canvasContext.textAlign = 'center';
        this.canvasContext.textBaseline = 'middle';
        this.canvasContext.font = `${this.fontSize}px ${this.fontFamily}`;
        this.canvasContext.fillStyle = this.fontColor;
        this.canvasContext.fillText(this.topText, this.canvasElement.width / 2, 50);
        this.canvasContext.fillText(
          this.bottomText,
          this.canvasElement.width / 2,
          this.canvasElement.height - 50,
        );
      });

      image.setAttribute('crossorigin', 'anonymous'); // tainted canvas fix
      image.setAttribute('src', this.imageUrl);
    },
  },
};
</script>

<style lang="scss">
#canvas {
  max-width: 100%;
  max-height: 100%;
}

.googleFontFix {
  font-family: 'Pacifico', cursive;

  position: absolute;

  visibility: hidden;
  clip: rect(0 0 0 0);

  width: 1px;
  height: 1px;
  margin: -1px;
}

.verte__guide {
  display: none !important;
}

.app {
  &__control {
    margin-top: 1.5rem;
  }

  &__canvas {
    display: flex;

    margin-top: 1rem;
    padding: 20px;

    justify-content: center;
    align-items: center;
  }

  &__save {
    display: flex;

    align-items: center;
    justify-content: center;
  }

  &__results {
    margin-top: 2.5rem;
  }
}
</style>
