import Card from "components/Card";
import Address from "components/Address";
import {  useEffect, useState } from "react";
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";
import { ABI, CONTRACT_ADDRESS } from "utils";
import { Global } from "state/global";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ButtonIcon, SymbolIcon } from "@radix-ui/react-icons";
import { useAccount, useContractRead, useContractWrite } from "wagmi";

export default function BuySell() {
  // Global state
  const {user, setUser} = Global.useContainer();

  // Local state
  const [buy, setBuy] = useState<number>(1);
  const [sell, setSell] = useState<number>(1);

  // Wagmi
  const {address, isConnected} = useAccount();
  const {data: ownedAmount}: { data: BigInt | undefined } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "sharesBalance",
    args: [user.address, address],
  });
  const {data: buyPrice}: { data: BigInt | undefined } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "getBuyPriceAfterFee",
    args: [user.address, buy],
  });
  const {data: sellPrice}: { data: BigInt | undefined } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "getSellPriceAfterFee",
    args: [user.address, sell],
  });
  const {write: executeBuy, isLoading: buyLoading} = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "buyShares",
    args: [user.address, buy],
    value: (buyPrice as bigint) ?? undefined,
  });
  const {write: executeSell, isLoading: sellLoading} = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "sellShares",
    args: [user.address, sell],
  });

  // Reset on user change
  useEffect(() => {
    setBuy(1);
    setSell(1);
  }, [user]);

  const handleSearch = (e) => {
    setUser({
      address: e.target.elements.address.value,
      username: "",
      image: ""
    })
  }

  return (
    <>
      <form onSubmit={handleSearch} className="flex max-sm:flex-wrap items-center gap-1 mb-4">
        <Input name="address" defaultValue={user.address} className="text-base h-12"/>
        <Button className="h-12 max-sm:w-full" type="submit">Search</Button>
      </form>

      <Card title="Buy/Sell">
        <div className="h-full p-4">
          <div className="flex flex-col h-full gap-3">
            <div>
              <span className="flex flex-wrap gap-2 break-word text-sm items-center">
                You own {Number(ownedAmount ?? 0)} share(s) of{" "}
                <span>
                  <Address
                    address={user.address}
                    username={user.username}
                    image={user.image}
                  />
                </span>
              </span>
            </div>

            {/* Buy shares */}
            <Card title="Buy shares">
              <div className="p-2">
                <Input value={buy} disabled/>

                <div className="flex [&>button]:flex-1 gap-3 mt-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (buy > 0) setBuy((previous) => previous - 1);
                    }}
                    disabled={buy === 0}
                  >
                    -
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setBuy((previous) => previous + 1)}
                  >
                    +
                  </Button>
                </div>

                <Button
                  className="mt-2 w-full bg-buy hover:bg-buy hover:opacity-70"
                  onClick={() => executeBuy()}
                  disabled={buy === 0 || buyLoading}
                >
                  {buyLoading ? (
                    <div className="flex items-center">
                      <SymbolIcon className="h-4 w-4 animate-spin"/>
                      <span className="pr-2">Executing buy...</span>
                    </div>
                  ) : (
                    <span>
                      Buy {buy} share(s){" "}
                      {buyPrice
                        ? `for ${(Number(buyPrice) / 1e18).toFixed(6)} Ξ`
                        : ""}
                    </span>
                  )}
                </Button>
              </div>
            </Card>

            {/* Sell shares */}
            <Card title="Sell shares">
              <div className="p-2">
                <Input value={sell} disabled/>

                <div className="flex [&>button]:flex-1 gap-3 mt-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (sell > 0) setSell((previous) => previous - 1);
                    }}
                    disabled={sell === 0}
                  >
                    -
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSell((previous) => previous + 1);
                      // if (sell < Number(ownedAmount ?? 0)) {
                      //   setSell((previous) => previous + 1);
                      // }
                    }}
                    // disabled={sell >= Number(ownedAmount ?? 0)}
                  >
                    +
                  </Button>
                </div>

                <Button
                  className="mt-2 w-full bg-sell hover:bg-sell hover:opacity-70"
                  onClick={() => executeSell()}
                  disabled={sell === 0 || sellLoading}
                >
                  {sellLoading ? (
                    <div className="flex items-center">
                      <SymbolIcon className="h-4 w-4 animate-spin"/>
                      <span className="pr-2">Executing sell...</span>
                    </div>
                  ) : (
                    <span>
                      Sell {sell} share(s){" "}
                      {sellPrice
                        ? `
    for ${(Number(sellPrice) / 1e18).toFixed(6)} Ξ`
                        :
                        ""
                      }
  </span>
                  )
                  }
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Card>

      <p className="text-sm text-center mt-4">Crafted by <a className="underline"
                                                            href="https://twitter.com/zharkov_crypto"
                                                            rel="noreferrer"
                                                            target="_blank">@zharkov_crypto</a> for <a
        className="underline"
        href="https://twitter.com/zharkov_crypto"
        rel="noreferrer"
        target="_blank">@alphador_ai</a>.
        <br/>
        Join me on friend.tech
      </p>
      <p className="mt-4 text-xs text-center"><a className="underline"
                                                 href="https://github.com/SZharkov/friend-swap"
                                                 rel="noreferrer"
                                                 target="_blank">Open Source</a></p>
    </>
  )
    ;
}
