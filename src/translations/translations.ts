import i18next from "i18next";

import enResources from "./en.json"
import nlResources from "./nl.json"
import {initReactI18next} from "react-i18next";

/**
 * Initialize the browser base. This loads translations into the i18next library if it is already
 * in use in the application, or initializes that as well if not.
 *
 * @param language Optional string, only used when initializing in an environment where i18next is
 *                 not used yet.
 */
export function init(language?: string) {

    if (i18next.isInitialized) {
        // Add namespaces for this library
        if (!i18next.hasResourceBundle("en", "browserBase")) {
            i18next.addResourceBundle("en", "browser-base", enResources);
        }
        if (!i18next.hasResourceBundle("nl", "browserBase")) {
            i18next.addResourceBundle("nl", "browser-base", nlResources);
        }
    } else {
        // Initialise i18n in here
        i18next
            .use(initReactI18next)
            .init({
                lng: language,
                ns: ['browser-base'],
                resources: {
                    en: {
                        'browser-base': enResources
                    },
                    nl: {
                        'browser-base': nlResources
                    },
                }
            })
    }
}
