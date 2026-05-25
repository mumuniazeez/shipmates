import { Kbd, KbdGroup } from "~/components/ui/kbd";
import type { Route } from "./+types/_landing._index";
import { Button } from "~/components/ui/button";
import HackClubIcon from "@hackclub/icons";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Shipmates | Where hackers meet" },
    {
      name: "description",
      content: "Ctrl+Atl+Meet your next collaborator to work on your project",
    },
  ];
}

export default function Home() {
  return (
    <div>
      <main>
        <section className="pt-40 pb-10 flex flex-col items-center gap-y-5 mx-30">
          <KbdGroup className="text-4xl">
            <Kbd className="text-4xl w-fit h-fit">Ctrl</Kbd>
            <span>+</span>
            <Kbd className="text-4xl w-fit h-fit">Alt</Kbd>
            <span>+</span>
            <Kbd className="text-4xl w-fit h-fit">Meet</Kbd>
          </KbdGroup>
          <h1 className="text-8xl font-bold">Shipmates </h1>
          <p className="text-3xl font-medium">Where Hackers Meet</p>
          <p className="max-w-2xl text-center text-muted-foreground">
            Shipmate is an Hack Club match maker for hackers. Where you get to
            meet people to collaborate on project's with you.
          </p>

          <Button>Sign in with Hack Club</Button>
          <p className="text-sm text-muted-foreground">
            DM @azcodes on Slack for support.
          </p>
        </section>
        <section className="py-10 mx-30 space-y-5">
          <h3 className="text-4xl font-bold text-center">How it works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:gris-cols-3 gap-10">
            <Card className="hover:shadow-md hover:shadow-primary/50 transition-all duration-200 hover:-translate-y-2">
              <CardHeader>
                <CardTitle>
                  <Badge className="text-base">1</Badge> Sign up with your Hack
                  Club account
                </CardTitle>
                <CardDescription>
                  We use Hack Club's OAuth to authenticate users, so you can
                  sign up with your existing Hack Club account. This allows us
                  to connect you with other hackers in the community and find
                  collaborators for your projects.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-md hover:shadow-primary/50 transition-all duration-200 hover:-translate-y-2">
              <CardHeader>
                <CardTitle>
                  <Badge className="text-base">2</Badge> Pitch a Project
                </CardTitle>
                <CardDescription>
                  Once you're signed up, you can pitch a project idea that
                  you're passionate about. This is your chance to share your
                  vision and attract like-minded hackers who want to collaborate
                  with you.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-md hover:shadow-primary/50 transition-all duration-200 hover:-translate-y-2">
              <CardHeader>
                <CardTitle>
                  <Badge className="text-base">3</Badge> Find a collaborator
                </CardTitle>
                <CardDescription>
                  After pitching your project, you'll be matched with other
                  hackers who have similar interests and skills. You can connect
                  with them, discuss your project, and start collaborating to
                  bring your idea to life.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-md hover:shadow-primary/50 transition-all duration-200 hover:-translate-y-2">
              <CardHeader>
                <CardTitle>
                  <Badge className="text-base">4</Badge> Start building
                </CardTitle>
                <CardDescription>
                  Once you've found a collaborator, you can start building your
                  project together. Whether it's a new app, a game, or an
                  open-source library, Shipmate provides the platform for you to
                  connect and create with other hackers in the Hack Club
                  community.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>
      <footer className="px-30 py-10 border-t flex justify-between items-center gap-y-5">
        <div className="flex flex-col gap-y-2">
          <h3 className="text-2xl font-bold">
            Shipmates{" "}
            <span className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()}
            </span>
          </h3>
          <p className="text-muted-foreground">
            Build with <span className="text-primary">{"<3"}</span> by{" "}
            <Link
              to={"https://github.com/mumuniazeez"}
              target="_blank"
              className="text-primary hover:underline"
            >
              teens
            </Link>{" "}
            for{" "}
            <Link
              to={"https://hackclub.com"}
              target="_blank"
              className="text-primary hover:underline"
            >
              teens
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <Link
            to={"https://hackclub.com"}
            target="_blank"
            className="text-primary hover:underline"
          >
            Hack Club
          </Link>
          <Link
            to={"https://hackclub.com/slack"}
            target="_blank"
            className="text-primary hover:underline"
          >
            Hack Club Slack
          </Link>
          <Link
            to={"https://github.com/mumuniazeez/shipmates"}
            target="_blank"
            className="text-primary hover:underline"
          >
            Github
          </Link>
        </div>
      </footer>
    </div>
  );
}
