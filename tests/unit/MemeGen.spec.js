import { createLocalVue, mount } from '@vue/test-utils';
import { BootstrapVue } from 'bootstrap-vue';
import Verte from 'verte';

import MemeGen from '@/components/MemeGen/MemeGen.vue';

const localVue = createLocalVue();

localVue.use(BootstrapVue);

localVue.component('verte', Verte);

describe('MemeGen.vue', () => {
  let wrapper;

  const data = {
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

  const onFileChangeHandler = jest.fn();
  const onSaveHandler = jest.fn();
  const render = jest.fn();

  beforeEach(() => {
    wrapper = mount(MemeGen, {
      localVue,
      sync: false,
      methods: {
        onFileChangeHandler,
        onSaveHandler,
        render,
      },
    });

    wrapper.setData(data);
  });

  it('matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('returnes canvas element from canvasElement computed property', () => {
    expect(wrapper.vm.canvasElement).toBe(wrapper.find({ ref: 'canvas' }).element);
  });

  it('returnes 2d context of canvas element from canvasContext computed property', () => {
    expect(wrapper.vm.canvasContext.canvas).toBe(wrapper.find({ ref: 'canvas' }).element);
  });

  describe('File input element', () => {
    it('exists', () => {
      expect(wrapper.find('[name="file"]').exists()).toBe(true);
    });

    it('triggers onFileChange() method', () => {
      wrapper.find('[name="file"]').trigger('change');

      expect(onFileChangeHandler).toBeCalled();
    });
  });

  describe('Top Text input element', () => {
    it('exists', () => {
      expect(wrapper.find('[name="topText"]').exists()).toBe(true);
    });

    it('has right default value', () => {
      expect(wrapper.find('[name="topText"]').element.value).toBe(data.topText);
    });

    it('updates corresponding model property', () => {
      const newValue = 'Top Text Test';

      wrapper.find('[name="topText"]').setValue(newValue);

      expect(wrapper.vm.$data.topText).toBe(newValue);
      expect(wrapper.find('[name="topText"]').element.value).toBe(newValue);
    });
  });

  describe('Bottom Text input element', () => {
    it('exists', () => {
      expect(wrapper.find('[name="bottomText"]').exists()).toBe(true);
    });

    it('has right default value', () => {
      expect(wrapper.find('[name="bottomText"]').element.value).toBe(data.bottomText);
    });

    it('updates corresponding model property', () => {
      const newValue = 'Bottom Text Test';

      wrapper.find('[name="bottomText"]').setValue(newValue);

      expect(wrapper.vm.$data.bottomText).toBe(newValue);
      expect(wrapper.find('[name="bottomText"]').element.value).toBe(newValue);
    });
  });

  describe('Font Size input element', () => {
    it('exists', () => {
      expect(wrapper.find('[name="fontSize"]').exists()).toBe(true);
    });

    it('has right default value', () => {
      expect(wrapper.find('[name="fontSize"]').element.value).toBe(data.fontSize);
    });

    it('updates corresponding model property', () => {
      const newValue = '50';

      wrapper.find('[name="fontSize"]').setValue(newValue);

      expect(wrapper.vm.$data.fontSize).toBe(newValue);
      expect(wrapper.find('[name="fontSize"]').element.value).toBe(newValue);
    });
  });

  describe('Font Family select element', () => {
    it('exists', () => {
      expect(wrapper.find('[name="fontFamily"]').exists()).toBe(true);
    });

    it('renders the right amount of options', () => {
      expect(wrapper.find('[name="fontFamily"]').findAll('option').length).toBe(
        data.fontFamilyOptions.length,
      );
    });

    it('has right default value', () => {
      expect(wrapper.find('[name="fontFamily"]').element.value).toBe(data.fontFamily);
    });

    it('updates corresponding model property', async () => {
      const newValue = 'Pacifico';

      wrapper
        .find('[name="fontFamily"]')
        .findAll('option')
        .at(3)
        .setSelected();

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.$data.fontFamily).toBe(newValue);
      expect(wrapper.find('[name="fontFamily"]').element.value).toBe(newValue);
    });
  });

  describe('Mime Type select element', () => {
    it('exists', () => {
      expect(wrapper.find('[name="mimeType"]').exists()).toBe(true);
    });

    it('renders the right amount of options', () => {
      expect(wrapper.find('[name="mimeType"]').findAll('option').length).toBe(
        data.mimeTypeOptions.length,
      );
    });

    it('has right default value', () => {
      expect(wrapper.find('[name="mimeType"]').element.value).toBe(data.mimeType);
    });

    it('updates corresponding model property', async () => {
      const newValue = 'image/gif';

      wrapper
        .find('[name="mimeType"]')
        .findAll('option')
        .at(3)
        .setSelected();

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.$data.mimeType).toBe(newValue);
      expect(wrapper.find('[name="mimeType"]').element.value).toBe(newValue);
    });
  });

  describe('Colorpicker element', () => {
    it('exists', () => {
      expect(wrapper.find('[name="fontColor"]').exists()).toBe(true);
      expect(wrapper.find({ ref: 'verte' }).exists()).toBe(true);
    });

    it('shows up on click', () => {
      const previousState = wrapper.find({ ref: 'verte' }).vm.isMenuActive;

      wrapper.find('[name="fontColor"]').trigger('click');

      expect(wrapper.find({ ref: 'verte' }).vm.isMenuActive).toBe(!previousState);
    });

    it('updates corresponding model property', async () => {
      const newValue = 'rgb(255,255,255)';

      wrapper.find({ ref: 'verte' }).vm.$emit('input', newValue);

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.$data.fontColor).toBe(newValue);
      expect(wrapper.find('[name="fontColor"]').element.value).toBe(newValue);
    });
  });

  describe('Save As button element', () => {
    it('exists', () => {
      expect(wrapper.find('[name="save"]').exists()).toBe(true);
    });

    it('triggers onSaveHandler() method', () => {
      wrapper.find('[name="save"]').trigger('click');

      expect(onSaveHandler).toBeCalled();
    });
  });

  describe('Results section', () => {
    beforeEach(() => {
      wrapper.setData({
        results: [
          {
            topText: 'Top Text Test',
            bottomText: 'Bottom Text Test',
            imageUrl: 'imageUrl',
          },
        ],
      });
    });

    it('exists', () => {
      expect(wrapper.find('.app__results .row').exists()).toBe(true);
    });

    it('renders the right amount of elements', () => {
      expect(wrapper.findAll('.app__results .row .col-md-4').length).toBe(
        wrapper.vm.$data.results.length,
      );
    });

    it('renders right Top Text string', () => {
      expect(
        wrapper
          .findAll('.app__results .row .col-md-4 p.card-text')
          .at(0)
          .text(),
      ).toBe(`Top Text: ${wrapper.vm.$data.results[0].topText}`);
    });

    it('renders right Bottom Text string', () => {
      expect(
        wrapper
          .findAll('.app__results .row .col-md-4 p.card-text')
          .at(1)
          .text(),
      ).toBe(`Bottom Text: ${wrapper.vm.$data.results[0].bottomText}`);
    });

    it('renders right href attribute for the Download link element', () => {
      expect(wrapper.find('.app__results .row .col-md-4 .btn-success').attributes('href')).toBe(
        wrapper.vm.$data.results[0].imageUrl,
      );
    });

    describe('Delete button element', () => {
      it('exists', () => {
        expect(wrapper.find('.app__results .row .col-md-4 .btn-danger').exists()).toBe(true);
      });

      it('deletes corresponding element on click', async () => {
        wrapper.find('.app__results .row .col-md-4 .btn-danger').trigger('click', 0);

        await wrapper.vm.$nextTick();

        expect(wrapper.findAll('.app__results .row .col-md-4 .btn-danger').length).toBe(
          wrapper.vm.$data.results.length,
        );
      });
    });
  });
});
