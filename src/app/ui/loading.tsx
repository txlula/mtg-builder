import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function Loading() {
    return <SkeletonTheme baseColor="#d92323" highlightColor="#444" borderRadius={"4em"}>
    <p>
      <Skeleton count={3} />
    </p>
  </SkeletonTheme>
}