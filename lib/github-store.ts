import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { fallbackProducts } from "./products-fallback";
import type { Product } from "./types";

const PRODUCTS_JSON_PATH = "data/products.json";

interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
  branch: string;
}

interface GitHubContentResponse {
  content?: string;
  sha?: string;
  encoding?: string;
}

function getGitHubConfig(): GitHubConfig | null {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH ?? "main";

  if (!token || !owner || !repo) {
    return null;
  }

  return { token, owner, repo, branch };
}

export function isGitHubStoreConfigured(): boolean {
  return getGitHubConfig() !== null;
}

function getLocalProductsPath(): string {
  return path.join(process.cwd(), PRODUCTS_JSON_PATH);
}

function getLocalPublicProductsDir(): string {
  return path.join(process.cwd(), "public", "products");
}

async function readLocalProducts(): Promise<Product[] | null> {
  try {
    const raw = await readFile(getLocalProductsPath(), "utf-8");
    return JSON.parse(raw) as Product[];
  } catch {
    return null;
  }
}

async function writeLocalProducts(products: Product[]): Promise<void> {
  const filePath = getLocalProductsPath();
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(products, null, 2)}\n`, "utf-8");
}

async function getGitHubFile(pathInRepo: string): Promise<GitHubContentResponse | null> {
  const config = getGitHubConfig();
  if (!config) {
    return null;
  }

  const url = new URL(
    `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${pathInRepo}`,
  );
  url.searchParams.set("ref", config.branch);

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${config.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    next: { revalidate: 0 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`GitHub read failed (${response.status})`);
  }

  return (await response.json()) as GitHubContentResponse;
}

async function putGitHubFile(
  pathInRepo: string,
  contentBase64: string,
  message: string,
  sha?: string,
): Promise<void> {
  const config = getGitHubConfig();
  if (!config) {
    throw new Error("GitHub no configurado. Revisá GITHUB_TOKEN, GITHUB_OWNER y GITHUB_REPO.");
  }

  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${pathInRepo}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${config.token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      message,
      content: contentBase64,
      branch: config.branch,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub write failed (${response.status}): ${body}`);
  }
}

async function readProductsFromGitHub(): Promise<Product[] | null> {
  const file = await getGitHubFile(PRODUCTS_JSON_PATH);
  if (!file?.content) {
    return null;
  }

  const decoded = Buffer.from(file.content, "base64").toString("utf-8");
  return JSON.parse(decoded) as Product[];
}

async function writeProductsToGitHub(products: Product[]): Promise<void> {
  const existing = await getGitHubFile(PRODUCTS_JSON_PATH);
  const content = Buffer.from(`${JSON.stringify(products, null, 2)}\n`).toString("base64");

  await putGitHubFile(
    PRODUCTS_JSON_PATH,
    content,
    "Update products catalog",
    existing?.sha,
  );
}

export async function getProductsFromStore(): Promise<Product[]> {
  if (isGitHubStoreConfigured()) {
    try {
      const products = await readProductsFromGitHub();
      if (products?.length) {
        return products;
      }
    } catch {
      // fall through to local/fallback
    }
  }

  const local = await readLocalProducts();
  if (local?.length) {
    return local;
  }

  return fallbackProducts;
}

export async function saveProducts(products: Product[]): Promise<void> {
  if (isGitHubStoreConfigured()) {
    await writeProductsToGitHub(products);
    return;
  }

  await writeLocalProducts(products);
}

export async function uploadProductImage(file: File, productId: string): Promise<string> {
  const extension =
    file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const filename = `${productId}-${Date.now()}.${extension}`;
  const pathInRepo = `public/products/${filename}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const contentBase64 = buffer.toString("base64");

  if (isGitHubStoreConfigured()) {
    const existing = await getGitHubFile(pathInRepo);
    await putGitHubFile(
      pathInRepo,
      contentBase64,
      `Upload product image ${filename}`,
      existing?.sha,
    );
    return `/products/${filename}`;
  }

  const dir = getLocalPublicProductsDir();
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);
  return `/products/${filename}`;
}

export async function getProductFromStore(id: string): Promise<Product | undefined> {
  const products = await getProductsFromStore();
  return products.find((product) => product.id === id);
}
