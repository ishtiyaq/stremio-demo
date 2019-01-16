const addonSDK = require('stremio-addon-sdk')

const addon = new addonSDK({
    id: 'org.myexampleaddon',
    version: '1.0.0',

    name: 'simple example',

    // Properties that determine when Stremio picks this add-on
    // this means your add-on will be used for streams of the type movie
    resources: ['stream'],
    types: ['movie'],
    idPrefixes: ['tt']
})

// takes function(args, cb)
addon.defineStreamHandler(function(args, cb) {
    if (args.type === 'movie' && args.id === 'tt1254207') {
        // serve one stream to big buck bunny
        // return addonSDK.Stream({ url: '...' })
        const stream = { url: 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4' }
        cb(null, { streams: [stream] })
    } else {
        // otherwise return no streams
        cb(null, { streams: [] })
    }
})

addon.runHTTPWithOptions({ port: 7000 })
//addon.publishToCenter("https://your-domain/manifest.json") // <- invoke this if you want to publish your add-on and it's accessible publically on "your-domain"
