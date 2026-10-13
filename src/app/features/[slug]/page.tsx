import { notFound } from "next/navigation";
import { FeaturePage, featureMetadata } from "@/components/FeaturePage";
import { featureDetails, type FeatureKey } from "@/content/features";
const slugs = Object.keys(featureDetails).filter(
  (key) => key !== "overview" && key !== "steps" && key !== "learning-plan",
);
export const dynamicParams = false;
export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}
async function getKey(params: Promise<{ slug: string }>): Promise<FeatureKey> {
  const { slug } = await params;
  if (!slugs.includes(slug)) notFound();
  return slug as FeatureKey;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return featureMetadata(await getKey(params));
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <FeaturePage page={await getKey(params)} />;
}
