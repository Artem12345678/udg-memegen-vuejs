import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import { BootstrapVue } from 'bootstrap-vue';
import Verte from 'verte';

import App from '@/components/App/App.vue';
import AppHeader from '@/components/AppHeader/AppHeader.vue';
import AppFooter from '@/components/AppFooter/AppFooter.vue';
import Home from '@/views/Home.vue';

import { routes } from '@/router';

const localVue = createLocalVue();

localVue.use(VueRouter);
localVue.use(BootstrapVue);

localVue.component('verte', Verte);

const router = new VueRouter({
  routes,
});

describe('App.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(App, {
      localVue,
      router,
      sync: false,
    });
  });

  it('matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders <AppHeader/> component', () => {
    expect(wrapper.find(AppHeader).exists()).toBe(true);
  });

  it('renders <AppFooter/> component', () => {
    expect(wrapper.find(AppFooter).exists()).toBe(true);
  });

  describe('with router', () => {
    beforeEach(() => {
      wrapper = mount(App, {
        localVue,
        router,
        sync: false,
      });
    });

    it('renders <Home/> component by default', () => {
      expect(wrapper.find(Home).exists()).toBe(true);
    });

    it('renders <Home/> component for "/" route path', async () => {
      await router.push('/123');
      await router.push('/');

      await wrapper.vm.$nextTick();
      expect(wrapper.find(Home).exists()).toBe(true);
    });

    it('renders <Home/> component for "home" route name', async () => {
      await router.push('/123');
      await router.push({ name: 'home' });

      await wrapper.vm.$nextTick();

      expect(wrapper.find(Home).exists()).toBe(true);
    });
  });
});
