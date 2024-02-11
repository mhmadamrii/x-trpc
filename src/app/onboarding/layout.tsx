export default function LayoutOnboarding({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <h1>Hello</h1>
      {modal}
      {children}
    </>
  );
}
