import Cookies from "js-cookie";

const getToken = () => Cookies.get("token");
export async function ApiProfile() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    credentials: "include",
  });
  return res.json();
}

export async function getHelms() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/helments?per_page=100`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
    },
  );
  return res.json();
}

export async function getBorrowed() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/borroed?per_page=100`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
    },
  );
  return res.json();
}

export async function DataStats() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borroed/stats`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    credentials: "include",
  });
  return res.json();
}

export async function logoutAccount(token: string) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
}
