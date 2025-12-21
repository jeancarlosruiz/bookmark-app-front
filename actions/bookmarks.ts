"use server";

export const getBookmarksAction = async () => {
  // Corregir esto
  try {
    const response = await fetch(
      `${process.env.API_URL}/bookmark/user/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(
        `Failed to fetch bookmarks: ${response.status} - ${errorText}`,
      );
    }

    return response.json();
  } catch (error) {
    console.log({ error });
  }
};
