var art = new Artplayer({
    container: '.artplayer-app',
    url: 'magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d&dn=sintel.mp4&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel-1024-surround.mp4',
    type: 'torrent',
    customType: {
        torrent: function (video, url, art) {
            var client = new WebTorrent();
            art.loading.show();
            client.add(url, function (torrent) {
                var file = torrent.files[0];
                file.renderTo(video, {
                    autoplay: true
                })
            })
        },
    },
});