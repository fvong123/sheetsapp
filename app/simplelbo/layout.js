import { Suspense } from "react";
import Header from "../../components/LessonHeader";

export default function SimpleLBOLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Suspense><main className="flex-grow">{children}</main>
      </Suspense>
      
      {/* <Footer /> */}
    </div>
  );
}
