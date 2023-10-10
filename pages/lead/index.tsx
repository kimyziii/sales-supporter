import ListView from "../../components/ui/list-view";
import Wrapper from "@/components/ui/wrapper";
import { useRouter } from "next/router";

function LeadPage() {
  const router = useRouter();
  const pathname = router.pathname;

  console.log(`LeadPage Rendering Completed`);

  return (
    // <div>
    <Wrapper>
      <ListView pathname={pathname} />
    </Wrapper>
    // </div>
  );
}

export default LeadPage;
