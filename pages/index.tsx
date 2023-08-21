import dynamic from "next/dynamic";
import Layout from "components/Layout";
import { StateUser } from "../state/global";
import { NextPageContext } from "next";
import constants from "../utils/constants";

const BuySell = dynamic(() => import("components/trading/BuySell"), {
  ssr: false,
});

export default function Home({ user }) {
  return (
    <Layout user={user}>
      <div className="max-w-lg mx-auto py-5 px-4">
        <BuySell/>
      </div>
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