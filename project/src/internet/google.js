function luckyButton() {
  const WEBSITELIST = ['https://api.jonzav.me'] // needs more websites
  const randomWebsite =
    WEBSITELIST[Math.floor(Math.random() * WEBSITELIST.length)];
  window.location.replace(randomWebsite);
}
