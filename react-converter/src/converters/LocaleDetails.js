export default class LocaleDetails {

    constructor(details, defaultLocale="en") {
        this.details = details
        this.defaultLocale = defaultLocale
        this.localeMap = new Map()
    }

    static systemLocale = navigator.language

    get detail() {
        return this.localeDetail(this.systemLocale)
    }

    localeDetail(locale = LocaleDetails.systemLocale) {

        if (this.localeMap.has(locale)) {
            const key = this.localeMap.get(locale)
            return this.details[key]
        }

        let dashIndex = locale.length

        do {
            const key = locale.slice(0, dashIndex)
            const detail = this.details[key]
            if (detail) {
                this.localeMap.set(locale, key)
                return detail
            }
            dashIndex = locale.lastIndexOf('-', dashIndex)
        } while (dashIndex !== -1)

        return this.details[LocaleDetails.defaultLocale]
    }
}