/**
 * author: Michael McKenzie
 */

import { BlogPost } from "./types";
import { atom, selector, useRecoilCallback } from "recoil";
import { deleteBlogPostByID, fetchBlogData } from "./data";

export const postsAtom = atom({
  key: "posts",
  default: fetchBlogData(),
});

function dateSortComparator(
  { timestamp: a }: BlogPost,
  { timestamp: b }: BlogPost
): number {
  // casting to a number is the same as b.getTime();
  return Number(b) - Number(a);
}

export const postsByDateSelector = selector({
  key: "postsByDate",
  get: ({ get }) => {
    const posts = get(postsAtom);
    return [...posts].sort(dateSortComparator);
  },
});

export function useDeleteBlogPostCallback(id: number) {
  return useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        const posts = [...(await snapshot.getPromise(postsAtom))];
        await deleteBlogPostByID(id);
        // debugger;
        const deletedPostIndex = posts.findIndex((post) => post.id === id);

        if (deletedPostIndex !== -1) {
          posts.splice(deletedPostIndex, 1);
        }

        set(postsAtom, posts);
      },
    [id]
  );
}

const testData = [
  {
    id: 15006,
    title: "Darth Vader Asks Mom for Allowance Raise",
    text: "In yet another move bound to mark the demise of the Galactic Empire, the once powerful\n Jedi-gone-rogue has begun taking drastic measures to continue funding the second Death\n Star. Already months late, the latest enterprise of Darth Sidious's right hand is in\n danger of being sold at an upcoming scrap metal auction on Tataouine later this year.\n When asked for comment, Mr. Skywalker seemed to be short of breath...",
    timestamp: "2021-12-11T00:28:44.789Z",
  },
  {
    id: 15007,
    title: "Tom Hanks & Tom Cruise Confuse Names, Movies, Cars",
    text: "Tom Hanks and Tom Cruise recently met for tea in Los Angeles to discover that for the\n duration of their acting careers, they had been receiving mail for the 'wrong' Tom.\n Mission Impossible, Top Gun, and many roles were intended for Tom Hanks while Tom Cruise\n was to be the voice of Woody on Toy Story, make Wilson his best friend, and star in the\n AOL feature film \"You've Got Mail\". Needless to say, both Toms were speechless and\n decided to begin fixing the issue at hand by switching cars before they adjurned for croquet.",
    timestamp: "2021-12-11T00:28:44.797Z",
  },
  {
    id: 15008,
    title: "Kitten Teases Puppy; Bites Own Tail",
    text: 'Yet another shot has been fired in the ever-waging puppy/kitten battle by the ferocious\nfelines. At 2:03pm PST, Fred the Kitten approached Sam the Puppy, announced his intentions\nto bite his own tail. Sam, having tried this many times before, assured Fred that such a\nfeat was impossible and that teasing him like that was cause for him to taddle to The Master.\nNot concerned with the repricussions of the potential intervention of The Human, Fred\nproceeded to grab the very tip of his tail with his paws and then put it in his mouth.\n"Take that, silly dog!" yelled Fred between mouths full of fur as Sam ran to find The\nMaster.',
    timestamp: "2021-12-11T00:28:44.800Z",
  },
].map(({ timestamp, ...post }) => ({
  ...post,
  timestamp: new Date(timestamp),
}));
