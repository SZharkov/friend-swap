import type { AppProps } from "next/app";

// CSS imports
import "global.css";
import "react-resizable/css/styles.css";
import "react-grid-layout/css/styles.css";
import "@rainbow-me/rainbowkit/styles.css";

// RainbowKit
import { base } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  lightTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import Script from "next/script";

// Setup provider
const {chains, publicClient} = configureChains([base], [publicProvider()]);

// Setup connector
const {connectors} = getDefaultWallets({
  appName: "FriendSwap",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "",
  chains,
});

// Setup Wagmi config
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function FriendSwap({Component, pageProps}: AppProps) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} theme={lightTheme()}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
      {process.env.NODE_ENV === "production" ? (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      ) : null}
      {process.env.NODE_ENV === "production" ? (
        <Script
          id="analytics"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        />
      ) : null}
    </>
  );
}
