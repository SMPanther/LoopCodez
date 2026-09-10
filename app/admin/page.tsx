import { AdminConsole } from "@/components/admin/AdminConsole";
import { getAdminSession } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getAdminSession();
  return <AdminConsole initialAuthenticated={Boolean(session)} />;
}
