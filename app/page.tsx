import { SidebarProvider } from "@/components/atoms/sidebar";
import { AppSidebar } from "@/components/organisms/app-sidebar";
import Header from "@/components/organisms/header";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        {/* <SidebarTrigger /> */}
        <Header />
        <h1>Aqui empezamos</h1>
      </main>
    </SidebarProvider>
  );
}
