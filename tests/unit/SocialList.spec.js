import { shallowMount } from '@vue/test-utils';

import SocialList from '@/components/SocialList/SocialList.vue';
import SocialListItem from '@/components/SocialListItem/SocialListItem.vue';

describe('SocialList.vue', () => {
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

  beforeEach(() => {
    wrapper = shallowMount(SocialList);
    wrapper.setData({ links });
  });

  it('matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders <SocialListItem/> components', () => {
    expect(wrapper.find(SocialListItem).exists()).toBe(true);
  });

  it('renders the right amount of <SocialListItem/> components', () => {
    expect(wrapper.findAll(SocialListItem).length).toBe(links.length);
  });
});
