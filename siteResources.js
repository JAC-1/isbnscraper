export const urls = [
    {
        name: 'Booklog',
        url: (isbn) => `https://booklog.jp/search?service_id=1&index=Books&keyword=${isbn}`,
        // url: (isbn) => `https://booklog.jp/item/1/${isbn}`,
        waitSelector: '.item-info-author',
        fields: {
            title: '[itemprop=name]',
            author: '[itemprop=author]',
            publisher: '[itemprop=publisher]',
            about: '[itemprop=description]',
            pages: '.info-area > ul > li',
        },
    },
    {
        name: 'Bookfinder',
        url: (isbn) => `https://www.bookfinder.com/search/?isbn=${isbn}&mode=isbn&st=sr&ac=qr`,
        waitSelector: '.attributes',
        fields: {
            title: '#describe-isbn-title',
            author: '[itemprop=author]',
            publisher: '[itemprop=publisher]',
            about: '[itemprop=description]',
        },
    }
]

