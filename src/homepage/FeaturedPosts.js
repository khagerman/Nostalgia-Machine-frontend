import React from "react";
import NostalgiaApi from "../api";
export function FeaturedPosts() {
  const [newest, setNewest] = useState(null);
  useEffect(() => {
    async function getPosts() {
      await NostalgiaApi.get()
    }
    getPosts();
  }, []);

  return <div></div>;
}
