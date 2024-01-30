import Community from '@/components/Community.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { createMocks } from '../../utils'

describe('Community.vue', () => {
  describe('should render properly', () => {
    test('should render properly the card with the twitter link', async () => {
      const wrapper = mount(Community, createMocks({ storeModules: {} }))
      wrapper.setData({
        socials: [
          {
            header: 'Witnet Foundation Twitter account >',
            content:
              'Follow Witnet Foundation on Twitter to get daily updates on the progress of the project.',
            img: '/img/twitter.d88b4583.svg',
            url: 'https://twitter.com/witnet_io',
          },
          {
            header: 'Witnet Community on Discord >',
            content:
              'Join the official Witnet community Discrod room to discuss with the rest of the community and get direct support from the developers.',
            img: '/img/discord.30e7a828.svg',
            url: 'https://discord.gg/X4uurfP',
          },
          {
            header: 'Witnet Foundation official blog on Medium >',
            content:
              'Follow Witnet Foundation on Medium to read different articles stating our vision and future roadmap.',
            img: '/img/medium.483cac1e.svg',
            url: 'https://medium.com/witnet',
          },
          {
            header: 'Witnet Foundation contact email >',
            content:
              'You can write us directly for any inquiry not appropriate for any of the other channels.',
            img: '/img/email.7256781b.svg',
            url: 'mailto:info@witnet.foundation?subject=Witnet project',
          },
          {
            header: 'Witnet Community on Telegram >',
            content:
              'Join other members of the Witnet Community at the official Telegram group.',
            img: '/img/telegram.ab0d9980.svg',
            url: 'https://t.me/witnetio',
          },
          {
            header: 'Witnet GitHub repository >',
            content:
              'GitHub is where the Witnet protocol development takes place. Are you a programmer? Your contributions are more than welcome!',
            img: '/img/github.5285b1ae.svg',
            url: 'https://github.com/witnet',
          },
          {
            header: 'Witnet Community subreddit >',
            content:
              'The space for linking articles, informal discussion, kitten pictures and occasional memes.',
            img: '/img/reddit.98268878.svg',
            url: 'https://reddit.com/r/witnet',
          },
        ],
      })
      expect(
        wrapper.find('[data-test="https://twitter.com/witnet_io"]').exists(),
      ).toBe(true)
    })

    test('should render properly the card with the discord link', async () => {
      const wrapper = mount(Community, createMocks({ storeModules: {} }))
      wrapper.setData({
        socials: [
          {
            header: 'Witnet Foundation Twitter account >',
            content:
              'Follow Witnet Foundation on Twitter to get daily updates on the progress of the project.',
            img: '/img/twitter.d88b4583.svg',
            url: 'https://twitter.com/witnet_io',
          },
          {
            header: 'Witnet Community on Discord >',
            content:
              'Join the official Witnet community Discrod room to discuss with the rest of the community and get direct support from the developers.',
            img: '/img/discord.30e7a828.svg',
            url: 'https://discord.gg/X4uurfP',
          },
          {
            header: 'Witnet Foundation official blog on Medium >',
            content:
              'Follow Witnet Foundation on Medium to read different articles stating our vision and future roadmap.',
            img: '/img/medium.483cac1e.svg',
            url: 'https://medium.com/witnet',
          },
          {
            header: 'Witnet Foundation contact email >',
            content:
              'You can write us directly for any inquiry not appropriate for any of the other channels.',
            img: '/img/email.7256781b.svg',
            url: 'mailto:info@witnet.foundation?subject=Witnet project',
          },
          {
            header: 'Witnet Community on Telegram >',
            content:
              'Join other members of the Witnet Community at the official Telegram group.',
            img: '/img/telegram.ab0d9980.svg',
            url: 'https://t.me/witnetio',
          },
          {
            header: 'Witnet GitHub repository >',
            content:
              'GitHub is where the Witnet protocol development takes place. Are you a programmer? Your contributions are more than welcome!',
            img: '/img/github.5285b1ae.svg',
            url: 'https://github.com/witnet',
          },
          {
            header: 'Witnet Community subreddit >',
            content:
              'The space for linking articles, informal discussion, kitten pictures and occasional memes.',
            img: '/img/reddit.98268878.svg',
            url: 'https://reddit.com/r/witnet',
          },
        ],
      })
      expect(
        wrapper.find('[data-test="https://discord.gg/X4uurfP"]').exists(),
      ).toBe(true)
    })

    test('should render properly the card with the discord link', async () => {
      const wrapper = mount(Community, createMocks({ storeModules: {} }))
      wrapper.setData({
        socials: [
          {
            header: 'Witnet Foundation Twitter account >',
            content:
              'Follow Witnet Foundation on Twitter to get daily updates on the progress of the project.',
            img: '/img/twitter.d88b4583.svg',
            url: 'https://twitter.com/witnet_io',
          },
          {
            header: 'Witnet Community on Discord >',
            content:
              'Join the official Witnet community Discrod room to discuss with the rest of the community and get direct support from the developers.',
            img: '/img/discord.30e7a828.svg',
            url: 'https://discord.gg/X4uurfP',
          },
          {
            header: 'Witnet Foundation official blog on Medium >',
            content:
              'Follow Witnet Foundation on Medium to read different articles stating our vision and future roadmap.',
            img: '/img/medium.483cac1e.svg',
            url: 'https://medium.com/witnet',
          },
          {
            header: 'Witnet Foundation contact email >',
            content:
              'You can write us directly for any inquiry not appropriate for any of the other channels.',
            img: '/img/email.7256781b.svg',
            url: 'mailto:info@witnet.foundation?subject=Witnet project',
          },
          {
            header: 'Witnet Community on Telegram >',
            content:
              'Join other members of the Witnet Community at the official Telegram group.',
            img: '/img/telegram.ab0d9980.svg',
            url: 'https://t.me/witnetio',
          },
          {
            header: 'Witnet GitHub repository >',
            content:
              'GitHub is where the Witnet protocol development takes place. Are you a programmer? Your contributions are more than welcome!',
            img: '/img/github.5285b1ae.svg',
            url: 'https://github.com/witnet',
          },
          {
            header: 'Witnet Community subreddit >',
            content:
              'The space for linking articles, informal discussion, kitten pictures and occasional memes.',
            img: '/img/reddit.98268878.svg',
            url: 'https://reddit.com/r/witnet',
          },
        ],
      })
      expect(
        wrapper.find('[data-test="https://discord.gg/X4uurfP"]').exists(),
      ).toBe(true)
    })

    test('should render properly the card with the medium link', async () => {
      const wrapper = mount(Community, createMocks({ storeModules: {} }))
      wrapper.setData({
        socials: [
          {
            header: 'Witnet Foundation Twitter account >',
            content:
              'Follow Witnet Foundation on Twitter to get daily updates on the progress of the project.',
            img: '/img/twitter.d88b4583.svg',
            url: 'https://twitter.com/witnet_io',
          },
          {
            header: 'Witnet Community on Discord >',
            content:
              'Join the official Witnet community Discrod room to discuss with the rest of the community and get direct support from the developers.',
            img: '/img/discord.30e7a828.svg',
            url: 'https://discord.gg/X4uurfP',
          },
          {
            header: 'Witnet Foundation official blog on Medium >',
            content:
              'Follow Witnet Foundation on Medium to read different articles stating our vision and future roadmap.',
            img: '/img/medium.483cac1e.svg',
            url: 'https://medium.com/witnet',
          },
          {
            header: 'Witnet Foundation contact email >',
            content:
              'You can write us directly for any inquiry not appropriate for any of the other channels.',
            img: '/img/email.7256781b.svg',
            url: 'mailto:info@witnet.foundation?subject=Witnet project',
          },
          {
            header: 'Witnet Community on Telegram >',
            content:
              'Join other members of the Witnet Community at the official Telegram group.',
            img: '/img/telegram.ab0d9980.svg',
            url: 'https://t.me/witnetio',
          },
          {
            header: 'Witnet GitHub repository >',
            content:
              'GitHub is where the Witnet protocol development takes place. Are you a programmer? Your contributions are more than welcome!',
            img: '/img/github.5285b1ae.svg',
            url: 'https://github.com/witnet',
          },
          {
            header: 'Witnet Community subreddit >',
            content:
              'The space for linking articles, informal discussion, kitten pictures and occasional memes.',
            img: '/img/reddit.98268878.svg',
            url: 'https://reddit.com/r/witnet',
          },
        ],
      })
      expect(
        wrapper.find('[data-test="https://medium.com/witnet"]').exists(),
      ).toBe(true)
    })

    test('should render properly the card with the mail link', async () => {
      const wrapper = mount(Community, createMocks({ storeModules: {} }))
      wrapper.setData({
        socials: [
          {
            header: 'Witnet Foundation Twitter account >',
            content:
              'Follow Witnet Foundation on Twitter to get daily updates on the progress of the project.',
            img: '/img/twitter.d88b4583.svg',
            url: 'https://twitter.com/witnet_io',
          },
          {
            header: 'Witnet Community on Discord >',
            content:
              'Join the official Witnet community Discrod room to discuss with the rest of the community and get direct support from the developers.',
            img: '/img/discord.30e7a828.svg',
            url: 'https://discord.gg/X4uurfP',
          },
          {
            header: 'Witnet Foundation official blog on Medium >',
            content:
              'Follow Witnet Foundation on Medium to read different articles stating our vision and future roadmap.',
            img: '/img/medium.483cac1e.svg',
            url: 'https://medium.com/witnet',
          },
          {
            header: 'Witnet Foundation contact email >',
            content:
              'You can write us directly for any inquiry not appropriate for any of the other channels.',
            img: '/img/email.7256781b.svg',
            url: 'mailto:info@witnet.foundation?subject=Witnet project',
          },
          {
            header: 'Witnet Community on Telegram >',
            content:
              'Join other members of the Witnet Community at the official Telegram group.',
            img: '/img/telegram.ab0d9980.svg',
            url: 'https://t.me/witnetio',
          },
          {
            header: 'Witnet GitHub repository >',
            content:
              'GitHub is where the Witnet protocol development takes place. Are you a programmer? Your contributions are more than welcome!',
            img: '/img/github.5285b1ae.svg',
            url: 'https://github.com/witnet',
          },
          {
            header: 'Witnet Community subreddit >',
            content:
              'The space for linking articles, informal discussion, kitten pictures and occasional memes.',
            img: '/img/reddit.98268878.svg',
            url: 'https://reddit.com/r/witnet',
          },
        ],
      })
      expect(
        wrapper
          .find(
            '[data-test="mailto:info@witnet.foundation?subject=Witnet project"]',
          )
          .exists(),
      ).toBe(true)
    })

    test('should render properly the card with the telegram link', async () => {
      const wrapper = mount(Community, createMocks({ storeModules: {} }))
      wrapper.setData({
        socials: [
          {
            header: 'Witnet Foundation Twitter account >',
            content:
              'Follow Witnet Foundation on Twitter to get daily updates on the progress of the project.',
            img: '/img/twitter.d88b4583.svg',
            url: 'https://twitter.com/witnet_io',
          },
          {
            header: 'Witnet Community on Discord >',
            content:
              'Join the official Witnet community Discrod room to discuss with the rest of the community and get direct support from the developers.',
            img: '/img/discord.30e7a828.svg',
            url: 'https://discord.gg/X4uurfP',
          },
          {
            header: 'Witnet Foundation official blog on Medium >',
            content:
              'Follow Witnet Foundation on Medium to read different articles stating our vision and future roadmap.',
            img: '/img/medium.483cac1e.svg',
            url: 'https://medium.com/witnet',
          },
          {
            header: 'Witnet Foundation contact email >',
            content:
              'You can write us directly for any inquiry not appropriate for any of the other channels.',
            img: '/img/email.7256781b.svg',
            url: 'mailto:info@witnet.foundation?subject=Witnet project',
          },
          {
            header: 'Witnet Community on Telegram >',
            content:
              'Join other members of the Witnet Community at the official Telegram group.',
            img: '/img/telegram.ab0d9980.svg',
            url: 'https://t.me/witnetio',
          },
          {
            header: 'Witnet GitHub repository >',
            content:
              'GitHub is where the Witnet protocol development takes place. Are you a programmer? Your contributions are more than welcome!',
            img: '/img/github.5285b1ae.svg',
            url: 'https://github.com/witnet',
          },
          {
            header: 'Witnet Community subreddit >',
            content:
              'The space for linking articles, informal discussion, kitten pictures and occasional memes.',
            img: '/img/reddit.98268878.svg',
            url: 'https://reddit.com/r/witnet',
          },
        ],
      })
      expect(wrapper.find('[data-test="https://t.me/witnetio"]').exists()).toBe(
        true,
      )
    })
  })
})
