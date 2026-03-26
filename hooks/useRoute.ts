import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { logoutAccount } from "@/services/api";
export function useAuth() {
  const route = useRouter();

  const logout = async () => {
    const token = Cookies.get("token");

    await logoutAccount(token!);
    Cookies.remove("token");

    route.push("/auth/login");
  };
  return { logout };
}
