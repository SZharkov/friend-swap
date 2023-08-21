import dynamic from "next/dynamic";
import Layout from "components/Layout";
import { WidthProvider, Responsive } from "react-grid-layout";
import { StateUser } from "../state/global";
import { NextPageContext } from "next";
import constants from "../utils/constants";

const ResponsiveGridLayout = WidthProvider(Responsive);
const BuySell = dynamic(() => import("components/trading/BuySell"), {
  ssr: false,
});

export default function Home({user}) {
  // Layout setting
  const layout = {
    md: [
      {i: "buy_sell", x: 3.6, y: 0, w: 24, h: 3},
    ],
    lg: [
      {i: "buy_sell", x: 15, y: 0, w: 8, h: 3},
    ],
  };

  return (
    <Layout user={user}>
      <div className="max-w-lg mx-auto py-5 px-4">
        <BuySell/>
      </div>
      {/*<ResponsiveGridLayout*/}
      {/*  layouts={layout}*/}
      {/*  draggableHandle=".drag-handle"*/}
      {/*  cols={{lg: 36, md: 24, sm: 12, xs: 6, xxs: 3}}*/}
      {/*>*/}
      {/*  /!* Buy + Sell controller *!/*/}
      {/*  <div key="buy_sell">*/}
      {/*    <BuySell/>*/}
      {/*  </div>*/}
      {/*</ResponsiveGridLayout>*/}
    </Layout>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  // Collect query params
  let {address} = ctx.query;
  // If array, select first
  if (Array.isArray(address)) {
    address = address[0];
  }

  let user: StateUser;
  try {
    // If no address throw
    if (!address) throw new Error("No address found");

    // Collect user by address
    user = {
      address,
      username: "",
      image: ""
    };
  } catch {
    // If error, default to Cobie
    user = constants.COBIE;
  }

  return {
    props: {
      user,
    },
  };
}
