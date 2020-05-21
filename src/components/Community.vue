<template>
  <div data-test="community-page" class="container">
    <CommunityCard
      v-for="social in socials"
      :key="social.content"
      :data-test="social.url"
      class="card"
      :url="social.url"
    >
      <template v-slot:header>
        {{ social.header }}
      </template>
      <template v-slot:content>
        {{ social.content }}
      </template>
      <template v-slot:icon-social>
        <img class="icon-social" :src="social.img" alt="github icon" />
      </template>
    </CommunityCard>
  </div>
</template>

<script>
import { openInExternalApp } from '@/utils'
import CommunityCard from './card/CommunityCard'

export default {
  name: 'Community',
  components: {
    CommunityCard,
  },
  data() {
    return {
      socials: [
        {
          header: 'Witnet Foundation Twitter account >',
          content:
            'Follow Witnet Foundation on Twitter to get daily updates on the progress of the project.',
          img: require('@/resources/svg/social/twitter.svg'),
          url: 'https://twitter.com/witnet_io',
        },
        {
          header: 'Witnet Community on Discord >',
          content:
            'Join the official Witnet community Discrod room to discuss with the rest of the community and get direct support from the developers.',
          img: require('@/resources/svg/social/discord.svg'),
          url: 'https://discord.gg/X4uurfP',
        },
        {
          header: 'Witnet Foundation official blog on Medium >',
          content:
            'Follow Witnet Foundation on Medium to read different articles stating our vision and future roadmap.',
          img: require('@/resources/svg/social/medium.svg'),
          url: 'https://medium.com/witnet',
        },
        {
          header: 'Witnet Foundation contact email >',
          content:
            'You can write us directly for any inquiry not appropriate for any of the other channels.',
          img: require('@/resources/svg/social/email.svg'),
          url: 'mailto:info@witnet.foundation?subject=Witnet project',
        },
        {
          header: 'Witnet Community on Telegram >',
          content:
            'Join other members of the Witnet Community at the official Telegram group.',
          img: require('@/resources/svg/social/telegram.svg'),
          url: 'https://t.me/witnetio',
        },
        {
          header: 'Witnet GitHub repository >',
          content:
            'GitHub is where the Witnet protocol development takes place. Are you a programmer? Your contributions are more than welcome!',
          img: require('@/resources/svg/social/github.svg'),
          url: 'https://github.com/witnet',
        },
        {
          header: 'Witnet Community subreddit >',
          content:
            'The space for linking articles, informal discussion, kitten pictures and occasional memes.',
          img: require('@/resources/svg/social/reddit.svg'),
          url: 'https://reddit.com/r/witnet',
        },
      ],
    }
  },
  methods: {
    openExternalLink: async url => {
      await openInExternalApp(url)
    },
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 650px);
  justify-content: center;

  .card {
    margin: 24px;
  }
}

// stylelint-disable-next-line
a {
  color: $purple-4;
  cursor: pointer;
  text-decoration: none;

  // stylelint-disable-next-line
  &:hover,
  :active {
    color: $purple-4;
  }
}

.icon-social {
  opacity: 0.1;
  width: 100px;
}
</style>
