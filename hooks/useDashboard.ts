import { useEffect, useState } from "react";
import { ApiProfile, getHelms, DataStats, getBorrowed } from "@/services/api";
import { TypeBorrowes, StatsBorrowed } from "@/app/admin/types/dashboard";

export function useDashboard() {
  const [profile, setProfile] = useState({ full_name: "", email: "" });
  const [helms, setHelms] = useState([]);
  const [borrowed, setBorrowed] = useState<TypeBorrowes[]>([]);
  const [statsBorrowed, SetStatsBorrowed] = useState<StatsBorrowed>({
    return_stats: 0,
    latenned_stats: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [profileRes, helmsRes, borrowedRes, statsRes] = await Promise.all([
        ApiProfile(),
        getHelms(),
        DataStats(),
        getBorrowed(),
      ]);

      setProfile(profileRes.data);
      console.log(profileRes.data.data);
      setHelms(helmsRes.data.data);
      setBorrowed(borrowedRes.data?.data);

      SetStatsBorrowed(statsRes.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return { profile, helms, borrowed, statsBorrowed, loading };
}
