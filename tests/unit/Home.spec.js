import { shallowMount, createLocalVue } from '@vue/test-utils';
import { BootstrapVue } from 'bootstrap-vue';
import Verte from 'verte';

import Home from '@/views/Home.vue';
import MemeGen from '@/components/MemeGen/MemeGen.vue';

const localVue = createLocalVue();

localVue.use(BootstrapVue);

localVue.component('verte', Verte);

describe('Home.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Home, {
      localVue,
    });
  });

  it('matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders <MemeGen/> component', () => {
    expect(wrapper.find(MemeGen).exists()).toBe(true);
  });
});
