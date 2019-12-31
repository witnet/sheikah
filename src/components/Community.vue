<template>
  <div data-test="community-page" class="container">
    <CommunityCard
      :data-test="social.url"
      class="card"
      v-for="social in socials"
      :key="social.content"
    >
      <template v-slot:header>
        <a @click="() => openExternalLink(social.url)">
          {{ social.header }}
        </a>
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
import CommunityCard from './card/CommunityCard'
import { openInExternalApp } from '@/utils'

export default {
  name: 'Community',
  components: {
    CommunityCard,
  },
  methods: {
    openExternalLink: async url => {
      await openInExternalApp(url)
    },
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
          content: 'Join other members of the Witnet Community at the official Telegram group.',
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
}
</script>
<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 24px;
  .card {
    flex: 0 1 calc(49% - 1em);
    margin: 8px;
  }
}

a {
  text-decoration: none;
  cursor: pointer;
  color: $blue-6;
  &:hover,
  :active {
    color: $blue-6;
  }
}

.icon-social {
  width: 100px;
  opacity: 0.1;
}
</style>
