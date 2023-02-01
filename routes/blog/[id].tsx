import { Handlers, PageProps } from '$fresh/server.ts';
import { loadPost } from '../../utils/posts.ts';

export const handler: Handlers = {
    async GET(_, context) {
        const { id } = context.params;
        const post = await loadPost(id);
        return context.render({post}); 
    }
}

export default function PagePost(props: PageProps) {
    const { post } = props?.data || {};

    return (
        <article class="p-4">
            <h1 class="text-2xl font-bold">Esto es el artículo!</h1>
            <time>{Intl.DateTimeFormat('es').format(post.date)}</time>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi officia quisquam, est eius nam inventore amet dolores molestiae atque neque voluptas similique deleniti reprehenderit praesentium accusantium culpa assumenda qui sed?
            </p>
        </article>
        
    );
}