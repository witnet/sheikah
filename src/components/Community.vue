<template>
  <div data-test="community-page" class="container">
    <CommunityCard
      v-for="social in socials"
      :key="social.content"
      :data-test="social.url"
      :url="social.url"
    >
      <template #header>
        {{ social.header }}
      </template>
      <template #content>
        {{ social.content }}
      </template>
      <template #icon-social>
        <CustomIcon :name="social.img" class-name="icon-social" />
        <!-- <img class="icon-social" :src="social.img" alt="github icon" /> -->
      </template>
    </CommunityCard>
  </div>
</template>

<script>
import CommunityCard from '@/components/card/CommunityCard.vue'

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
          img: 'Twitter',
          url: 'https://twitter.com/witnet_io',
        },
        {
          header: this.$t('discord_header'),
          content: this.$t('discord_content'),
          img: 'Discord',
          url: 'https://discord.gg/X4uurfP',
        },
        {
          header: this.$t('blog_header'),
          content: this.$t('blog_content'),
          img: 'Medium',
          url: 'https://medium.com/witnet',
        },
        {
          header: this.$t('email_header'),
          content: this.$t('email_content'),
          img: 'Email',
          url: 'mailto:info@witnet.foundation?subject=Witnet project',
        },
        {
          header: this.$t('telegram_header'),
          content: this.$t('telegram_content'),
          img: 'Telegram',
          url: 'https://t.me/witnetio',
        },
        {
          header: this.$t('github_header'),
          content: this.$t('github_content'),
          img: 'Github',
          url: 'https://github.com/witnet',
        },
        {
          header: this.$t('reddit_header'),
          content: this.$t('reddit_content'),
          img: 'Reddit',
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
  fill: var(--community-card-title);

  cursor: pointer;
  margin-bottom: 24px;
  text-decoration: none;

  &:hover,
  :active {
    fill: var(--community-card-title);
  }
}

.icon-social {
  opacity: 0.1;
  width: 100px;
  height: 100px;
}
</style>
