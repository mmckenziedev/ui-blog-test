import { BlogPost, BlogPostData } from "./types";

const BASE_URL = new URL(
  "https://restedblog.herokuapp.com/michaelmckenzie/api"
);

export async function getResponseData<T>(response: Response): Promise<T> {
  try {
    return await response.json();
  } catch (e) {
    // log parse error
    // maybe throw different exception type?
    console.error(
      "error converting response data to JSON:",
      e instanceof Error ? e.message : e
    );

    throw e;
  }
}

async function _fetch(url: URL, init?: RequestInit): Promise<Response> {
  try {
    return await fetch(String(url), init);
  } catch (e) {
    // log fetch error
    // raise error in the application
    // maybe throw different exception type?
    console.error("error fetching data", e instanceof Error ? e.message : e);
    throw e;
  }
}

export async function fetchFromAPI<T>(init?: RequestInit): Promise<T> {
  const response = await _fetch(BASE_URL, init);
  return await getResponseData<T>(response);
}

export async function fetchFromAPIByID<T>(
  id: number,
  init?: RequestInit
): Promise<T> {
  const url = new URL(`${BASE_URL.pathname}/${id}`, BASE_URL);
  const response = await _fetch(url, init);
  return await getResponseData<T>(response);
}

export async function fetchBlogData(): Promise<BlogPost[]> {
  const data = await fetchFromAPI<BlogPostData[]>();

  return data.map(({ timestamp, ...post }) => ({
    ...post,
    timestamp: new Date(timestamp),
  }));
}

export async function getBlogPost(id: number): Promise<BlogPost> {
  return await fetchFromAPIByID<BlogPost>(id);
}

export async function createBlogPost(
  title: string,
  text: string
): Promise<BlogPost> {
  const body = new FormData();
  body.set("text", text);
  body.set("title", title);

  return await fetchFromAPI<BlogPost>({ body, method: "POST" });
}

export async function updateBlogPost(
  id: number,
  title: string,
  text: string
): Promise<BlogPost> {
  const body = new FormData();
  body.set("text", text);
  body.set("title", title);

  return await fetchFromAPIByID<BlogPost>(id, { body, method: "POST" });
}

export async function deleteAllBlogPosts(
  title: string,
  text: string
): Promise<void> {
  await _fetch(BASE_URL, { method: "DELETE" });
}

export async function deleteBlogPostByID(id: number): Promise<void> {
  const url = new URL(`${BASE_URL.pathname}/${id}`, BASE_URL);
  await _fetch(url, { method: "DELETE" });
}
