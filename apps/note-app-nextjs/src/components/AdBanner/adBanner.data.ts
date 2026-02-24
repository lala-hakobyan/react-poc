export const AdBannerConstants = Object.freeze({
  testAccessToken: process.env.NEXT_PUBLIC_TEST_ACCESS_TOKEN,
  bannerApiUrl:  `${process.env.NEXT_PUBLIC_APP_URL}/api/banners/ad`,
  bannerLink: 'https://github.com/lala-hakobyan/front-end-debugging-handbook',
  bannerImageTitle: 'Front-end Debugging Handbook Ad Banner',
  loadErrorMessage: 'Failed to load banner:'
});
