import Head from "next/head";
import Header from "components/Header";
import type { ReactElement } from "react";
import { Global, type StateUser } from "state/global";

export default function Layout({
                                 user,
                                 children,
                               }: {
  user: StateUser;
  children: ReactElement | ReactElement[];
}) {
  return (
    // Wrap in global state provider (at layout level)
    <Global.Provider initialState={user}>
      <div>
        {/* Meta tags */}
        <Meta/>

        {/* Header */}
        <Header/>

        <div>{children}</div>
      </div>
    </Global.Provider>
  );
}

function Meta() {
  const meta = {
    url: "https://friendswap.alphador.ai",
    image: "https://friendswap.alphador.ai/meta.png",
    title: "FriendSwap | Quickly swap shares on friend.tech",
    description:
      "FriendSwap is a platform for buying and selling shares on friend.tech. Created by Alphador.",
  };

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{meta.title}</title>
      <meta name="title" content={meta.title}/>
      <meta name="description" content={meta.description}/>

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#2b5797" />
      <meta
        name="msapplication-config"
        content="/favicon/browserconfig.xml"
      />
      <meta name="theme-color" content="#ffffff" />

      {/* OG + Facebook */}
      <meta property="og:type" content="website"/>
      <meta property="og:url" content={meta.url}/>
      <meta property="og:title" content={meta.title}/>
      <meta property="og:description" content={meta.description}/>
      <meta property="og:image" content={meta.image}/>

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image"/>
      <meta property="twitter:url" content={meta.url}/>
      <meta property="twitter:title" content={meta.title}/>
      <meta property="twitter:description" content={meta.description}/>
      <meta property="twitter:image" content={meta.image}/>
    </Head>
  );
}
