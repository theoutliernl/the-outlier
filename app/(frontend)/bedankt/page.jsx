import { permanentRedirect } from "next/navigation";

// Legacy Dutch route: plain HTML form posts land on /thank-you now.
export default async function Bedankt({ searchParams }) {
  const params = await searchParams;
  permanentRedirect(params?.type === "newsletter" ? "/thank-you?type=newsletter" : "/thank-you");
}
