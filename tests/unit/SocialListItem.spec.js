import { shallowMount } from '@vue/test-utils';

import SocialListItem from '@/components/SocialListItem/SocialListItem.vue';

describe('SocialListItem.vue', () => {
  let wrapper;

  const links = [
    {
      url: 'https://www.github.com/Artem12345678',
      icon: 'github',
    },
    {
      url: 'https://www.instagram.com/ystimenkoartem',
      icon: 'instagram',
    },
  ];

  it('matches snapshot', () => {
    wrapper = shallowMount(SocialListItem, {
      propsData: {
        url: links[0].url,
        icon: links[0].icon,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders Github icon', () => {
    wrapper = shallowMount(SocialListItem, {
      propsData: {
        url: links[0].url,
        icon: links[0].icon,
      },
    });

    expect(wrapper.find('.social__link').exists()).toBe(true);
    expect(wrapper.find('.social__link').attributes('href')).toBe(links[0].url);
    expect(wrapper.find('.social__link img').attributes('src')).toBe(
      SocialListItem.computed.image(),
    );
  });

  it('renders Instagram icon', () => {
    wrapper = shallowMount(SocialListItem, {
      propsData: {
        url: links[1].url,
        icon: links[1].icon,
      },
    });

    expect(wrapper.find('.social__link').exists()).toBe(true);
    expect(wrapper.find('.social__link').attributes('href')).toBe(links[1].url);
    expect(wrapper.find('.social__link img').attributes('src')).toBe(
      SocialListItem.computed.image(),
    );
  });
});
