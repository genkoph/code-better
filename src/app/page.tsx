import Chat from "@/components/chat";
import { generateUUID } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function Page() {
  const id = generateUUID();

  return <Chat key={id} id={id} />;
}
