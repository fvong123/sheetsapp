import Header from "../../components/LessonHeader";

export default function SimpleLBOLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
