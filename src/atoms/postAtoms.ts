import { atom } from "jotai";

interface PostContent {
  textContent: string;
  imageContent?: File;
  videoContent?: File;
}

interface PostInfo {
  title: string;
  category: string;
  madeBy: string;
  contents: PostContent[];
}

interface Post {
  postId: string;
  madeBy: string;
}

type Posts = {
  [key: string]: Post;
};

export const showMainDosAtom = atom<boolean>(true);
export const postInfoAtom = atom<PostInfo>({
  title: "",
  category: "",
  madeBy: "",
  contents: [{ textContent: "" }],
});

export const postsAtom = atom<Posts | null>(null);
