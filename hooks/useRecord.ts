import { TypeBorrowes } from "@/app/admin/types/recordType";
import { useEffect, useState } from "react";
import { AllBorrowed, ApiProfile } from "@/services/api";
export default function useRecord() {
  const [profile, setProfile] = useState({ full_name: "", email: "" });
  const [loading, setIsLoading] = useState<boolean>(true);
  const [borrowed, setIsBorrowed] = useState<TypeBorrowes[]>([]);
  useEffect(() => {
    async function fetchData() {
      const [profileRes, allBorrowed] = await Promise.all([
        ApiProfile(),
        AllBorrowed(),
      ]);
      setProfile(profileRes.data);
      setIsBorrowed(allBorrowed.data.data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return { profile, loading, borrowed };
}
