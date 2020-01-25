import { shallowMount, createLocalVue } from '@vue/test-utils';
import { BootstrapVue } from 'bootstrap-vue';

import AppFooter from '@/components/AppFooter/AppFooter.vue';
import SocialList from '@/components/SocialList/SocialList.vue';

const localVue = createLocalVue();

localVue.use(BootstrapVue);

describe('AppFooter.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppFooter, {
      localVue,
    });
  });

  it('matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders <SocialList/> component', () => {
    expect(wrapper.find(SocialList).exists()).toBe(true);
  });
});
