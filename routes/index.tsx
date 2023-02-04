import { Handlers, PageProps } from '$fresh/server.ts'
import { setCookie } from '$std/http/cookie.ts'

export const handler: Handlers = {

  GET(_, context) {
    return context.render(context.state);
  },

  async POST(req) {
    const form = await req.formData();
    const locale = form.get('locale');
    const headers = new Headers({
      Location: '/'
    });

    if (typeof locale === 'string') {
      setCookie(headers, {
        name: 'locale',
        value: locale,
        maxAge: 60 * 60 * 24 * 365
      });
    }
    return new Response("", {
      status: 303,
      headers
    })
  }
}

export default function Home(props: PageProps) {
  const [activeLanguage] = props.data.locales;
  console.log(activeLanguage);
  return (
    <main class="p-4">
      <p>Your current locale is <b>{activeLanguage}</b></p>
      <form method="post">
        <label htmlFor="locale">Language:</label>
        <select name="locale" id="locale">
          <option value="en">Inglés</option>
          <option value="es">Español</option>
        </select>
        <button type="submit" class="px-2 py-2 bg-blue(500 hover:700 disabled:200) text-white">GO</button>
      </form>
      <h1 class="text-2xl">¡Esto es el home!</h1>
      <a class="underline hover:text-blue-500" href="./blog">
        BLOG
      </a>
      <br/>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero sint eaque eligendi qui iusto quasi enim facilis consectetur magni id repellendus cum ab adipisci, voluptatem earum quae. Doloribus, adipisci possimus.
      </p>
    </main>
  );
}
