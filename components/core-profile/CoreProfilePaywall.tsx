import { Paywall } from "@/components/paywall/Paywall";

/** 人格底色付費牆（完整版）。鎖定內容清單來自 data/products.ts。 */
export function CoreProfilePaywall() {
  return <Paywall productId="core_profile_full" />;
}
