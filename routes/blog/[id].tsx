import { Handlers, PageProps } from '$fresh/server.ts';
import { loadPost } from '../../utils/posts.ts';
import { CSS } from "https://deno.land/x/gfm@0.1.30/mod.ts";

export const handler: Handlers = {
    async GET(_, context) {
        const { id } = context.params;
        const post = await loadPost(id);
        return context.render({post, locales: context.state.locales}); 
    }
}

export default function PagePost(props: PageProps) {
    const { post, locales } = props?.data || {};

    return (
        <article class="p-4">
            <h1 class="text-2xl font-bold">{post.title}</h1>
            <time>{Intl.DateTimeFormat(locales, {timeZone: 'UTC', dateStyle: 'long'}).format(post.date)}</time>
            <br/>
            <style dangerouslySetInnerHTML={{ __html: CSS }} />
            <div class='markdown-body' dangerouslySetInnerHTML={{ __html: post.body }} />
        </article>
    );
}