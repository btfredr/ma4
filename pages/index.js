import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import Link from "next/link";
import Heading from "../components/Heading";

export default function Home() {
  return (
    <Layout>
      <Head title="Home" />
      <div className="container">
        <Heading title="Home" />
        <Link href="/results">View Breaking Bad Characters</Link>
      </div>
    </Layout>
  );
}
