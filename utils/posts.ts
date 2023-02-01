import type { Post } from "../types.d.ts";
import { extract } from "https://deno.land/std@0.175.0/encoding/front_matter/any.ts";

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
        body,
        date: new Date(params.date),
        excerpt: params.excerpt,
    }

    return post;
}
