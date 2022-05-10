import Head from "next/head";
import { AppProvider } from "../../data/contexts/AppContext";
import Layout from "./Layout";

interface TemplateProps {
    title: string;
    children?: any;
}

export default function Template(props: TemplateProps) {
    return (<div>
        <Head>
          <title>{props.title} | Mozão</title>
          <meta name="description" content="Mozão" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout title={props.title}>
            {props.children}
        </Layout>
      </div>)
}