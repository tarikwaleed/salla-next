import { LandingPage } from "@/components/landing-page";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <UserButton />
      <LandingPage></LandingPage>
    </>
  );
}
