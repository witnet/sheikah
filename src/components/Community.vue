<template>
  <div data-test="community-page" class="container">
    <CommunityCard
      v-for="social in socials"
      :key="social.content"
      :data-test="social.url"
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
          header: this.$t('twitter_header'),
          content: this.$t('twitter_content'),
          img: require('@/resources/svg/social/twitter.svg'),
          url: 'https://twitter.com/witnet_io',
        },
        {
          header: this.$t('discord_header'),
          content: this.$t('discord_content'),
          img: require('@/resources/svg/social/discord.svg'),
          url: 'https://discord.gg/X4uurfP',
        },
        {
          header: this.$t('blog_header'),
          content: this.$t('blog_content'),
          img: require('@/resources/svg/social/medium.svg'),
          url: 'https://medium.com/witnet',
        },
        {
          header: this.$t('email_header'),
          content: this.$t('email_content'),
          img: require('@/resources/svg/social/email.svg'),
          url: 'mailto:info@witnet.foundation?subject=Witnet project',
        },
        {
          header: this.$t('telegram_header'),
          content: this.$t('telegram_content'),
          img: require('@/resources/svg/social/telegram.svg'),
          url: 'https://t.me/witnetio',
        },
        {
          header: this.$t('github_header'),
          content: this.$t('github_content'),
          img: require('@/resources/svg/social/github.svg'),
          url: 'https://github.com/witnet',
        },
        {
          header: this.$t('reddit_header'),
          content: this.$t('reddit_content'),
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

.community-link {
  color: var(--community-card-title);
  cursor: pointer;
  margin-bottom: 24px;
  text-decoration: none;

  &:hover,
  :active {
    color: var(--community-card-title);
  }
}

.icon-social {
  opacity: 0.1;
  width: 100px;
}
</style>
