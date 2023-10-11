import ListView from "@/components/ui/list-view";
import Wrapper from "@/components/ui/wrapper";
import { useRouter } from "next/router";

function ContactPage() {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <div>
      <Wrapper>
        <ListView pathname={pathname} />
      </Wrapper>
    </div>
  );
}

export default ContactPage;
