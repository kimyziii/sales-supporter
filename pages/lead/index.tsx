import ListView from "../../components/ui/list-view";
import { useRouter } from "next/router";
import Wrapper from "@/components/ui/wrapper";

function LeadPage() {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <Wrapper>
      <ListView pathname={pathname} />
    </Wrapper>
  );
}

export default LeadPage;
