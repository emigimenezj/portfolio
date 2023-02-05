import { MiddlewareHandlerContext } from '$fresh/server.ts';
import { getCookies } from '$std/http/cookie.ts'
import { parse } from 'npm:accept-language-parser@1.5.0';
import { ContextState } from '../types.d.ts';

export const handler = [
    function checkLanguagePreference(req: Request, context: MiddlewareHandlerContext<ContextState>) {
        const preferredUserLanguage = parse(req.headers.get('accept-language'));
        const supportedLanguages = ['en', 'es'];

        context.state.locales = [];
        const locales = context.state.locales;

        const { locale } = getCookies(req.headers);
        if (locale) locales.push(locale);
        
        for (const {code, region} of preferredUserLanguage) {
            if (supportedLanguages.includes(code)) {
                const newLocaleLanguage = `${code}${region ? '-'+region : ''}`
                locales.push(newLocaleLanguage);
            }
        }

        if (locales.length === 0) locales.push(...supportedLanguages);

        return context.next();
    }
]