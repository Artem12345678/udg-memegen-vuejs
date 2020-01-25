import { shallowMount, createLocalVue } from '@vue/test-utils';
import { BootstrapVue } from 'bootstrap-vue';

import AppHeader from '@/components/AppHeader/AppHeader.vue';

const localVue = createLocalVue();

localVue.use(BootstrapVue);

describe('AppHeader.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppHeader, {
      localVue,
    });
  });

  it('matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
