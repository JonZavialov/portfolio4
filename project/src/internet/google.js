function luckyButton(){
    const WEBSITELIST = ['https://api.jonzav.me', 'http://greece.jonzav.me'];
    const randomWebsite = WEBSITELIST[Math.floor(Math.random() * WEBSITELIST.length)];
    window.location.replace(randomWebsite);
}