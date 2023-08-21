import Head from "next/head";
import Header from "components/Header";
import type { ReactElement } from "react";
import { Global, type StateUser } from "state/global";
import Script from "next/script";

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
    url: "https://friend-swap.vercel.app",
    image: "https://friend-swap.vercel.app/meta.png",
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
