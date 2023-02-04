import type { Post } from '../types.d.ts';
import { extract } from '$std/encoding/front_matter/any.ts';
import { render as toHtml } from 'https://deno.land/x/gfm@0.1.30/mod.ts';

export async function loadPost(id: string): Promise<Post | null> {
    const raw = await Deno
        .readTextFile(`./content/posts/${id}.md`)
        .catch(() => null)

    if (!raw) return null

    const { attrs, body } = extract(raw);
    const params = attrs as Record<string, string>;

    const post: Post = {
        id,
        title: params.title,
        body: toHtml(body),
        date: new Date(params.date), // TODO fix date not working properly
        excerpt: params.excerpt,
    }

    return post;
}

export async function listPosts(): Promise<Post[]> {
    const promises = [];

    for await (const entry of Deno.readDir('./content/posts')) {
        const [id] = entry.name.split('.');
        promises.push(loadPost(id));
    }

    const posts = await Promise.all(promises) as Post[];

    posts.sort((a, b) => b.date.getTime() - a.date.getTime());

    return posts;
}