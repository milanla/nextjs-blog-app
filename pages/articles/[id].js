import { getFileIds, getFileData } from "../../lib/posts-md";
import Layout from "../../components/layout";
import Head from "next/head";

// post directory
const postsDir = "articles";
// dynamic route IDs
export async function getStaticPaths() {
  const paths = (await getFileIds(postsDir)).map(id => ({ params: { id } }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      postData: await getFileData(postsDir, params.id),
    },
  };
}

export default function Article({ postData }) {
  // generate HTML from markdown content
  const html = `
    <h1>${postData.title}</h1>
    <p class="time"><time datetime="${postData.dateYMD}">${postData.dateFriendly}</time></p>
    <p class="words">${postData.wordcount}</p>
    ${postData.html}
  `;
  return (
    <Layout hero="phone.jpg">
      <Head>
        <title>{postData.title}</title>
        <meta name="description" content={postData.description} />
      </Head>
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
}
