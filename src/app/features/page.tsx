import { FeaturePage, featureMetadata } from "@/components/FeaturePage";
export const metadata = featureMetadata("overview");
export default function Page() {
  return <FeaturePage page="overview" />;
}
