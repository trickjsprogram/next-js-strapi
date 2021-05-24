import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { API_URL } from "@/config/index";
import styles from "@/styles/News.module.css";

export default function SingleNews({ news }) {
  const router = useRouter();
  console.log("router===>", router);
  return (
    <Layout>
      <div className={styles.news}>
        <span>
          {news.date} {news.time}
        </span>

        <h1>{news.name}</h1>
        {news.image && (
          <div className={styles.image}>
            <Image src={news.image} width={900} height={600} />
          </div>
        )}
        <p>{news.detail}</p>
        <Link href="/news">
          <a className={styles.back}>Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/news`);
  const news = await res.json();
  const paths = news.map((item) => ({
    params: { slug: item.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/news/${slug}`);
  const singleNews = await res.json();
  return {
    props: {
      news: singleNews[0],
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/news/${slug}`);
//   const singleNews = await res.json();
//   return {
//     props: {
//       news: singleNews[0],
//     },
//   };
// }
