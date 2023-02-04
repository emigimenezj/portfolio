import { Handlers, PageProps } from '$fresh/server.ts';
import { listPosts } from '../../utils/posts.ts';
import { Post } from '../../types.d.ts';

export const handler: Handlers = {
    async GET(_, context) {
        const posts = await listPosts();
        return context.render({posts, locales: context.state.locales}); 
    }
}

export default function Blog(props: PageProps) {
    const { posts, locales } = props?.data || {};

    return (
        <main class='p-4'>
            <h1 class='text-4xl font-bold'>¡Estos son mis posts!</h1>
            {posts.map((p: Post) => (
                <article class='p-4'>
                    <h2 class='text-2xl font-bold'>
                        <a href={`./blog/${p.id}`} class='hover:text-blue-500'>{p.title}</a>
                    </h2>
                    <time>{Intl.DateTimeFormat(locales, {timeZone: 'UTC', dateStyle: 'long'}).format(p.date)}</time>
                </article>
            ))}
        </main>
    );
}