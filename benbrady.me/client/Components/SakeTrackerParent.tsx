import SakeNavbar from "./SakeNavbar";

export default function SakeTrackerParent({ children }: any): JSX.Element {
  return (
    <>
      <SakeNavbar />
      {children}
    </>
  );
}
