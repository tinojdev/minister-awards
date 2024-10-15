import { useGetCategoriesQuery } from "@/state/api";
import { List, ListItem } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function CategoryLink() {
  const { data, error, isLoading } = useGetCategoriesQuery();

  useEffect(() => {
    // Optional: Smooth scrolling behavior
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, []);

  return (
    <div>
      <h1 style={{ color: "black" }}>Kategoriat</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <>
          <div>
            <List sx={{ display: "flex" }}>
              {data.map((category) => (
                <ListItem key={category.id}>
                  <a
                    href={`#${category.id}`}
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    {category.name}
                  </a>
                </ListItem>
              ))}
            </List>
          </div>
        </>
      )}
    </div>
  );
}
