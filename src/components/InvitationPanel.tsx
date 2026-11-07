import { instagramUrl } from "../lib/links";
import { Button, Container, SectionLabel, TextLink } from "./ui";

/** "Bring your curiosity." call-to-action panel shared by Landing and About. */
export function InvitationPanel() {
  return (
    <section>
      <Container className="py-16">
        <div className="flex flex-col items-start gap-8 rounded-[32px] bg-tint-blue p-8 md:p-12 lg:flex-row lg:items-center lg:gap-12">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <SectionLabel>Your next chapter</SectionLabel>
            <h2 className="text-t44 font-bold text-ink">
              Bring your curiosity.
              <br />
              We’ll build from there.
            </h2>
            <p className="text-[18px] leading-[1.55] text-muted">
              Find a learning track, meet a collaborator, or start a conversation.
            </p>
          </div>
          <div className="flex w-full shrink-0 flex-col items-start gap-4 lg:w-[260px]">
            <Button to="/#tracks">Explore the overview</Button>
            <TextLink href={instagramUrl()}>Talk to the community</TextLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
