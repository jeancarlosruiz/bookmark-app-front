import { Button } from "@/components/atoms/button";
import { SidebarProvider, SidebarTrigger } from "@/components/atoms/sidebar";
import { AppSidebar } from "@/components/organisms/app-sidebar";
import Header from "@/components/organisms/header";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        {/* <SidebarTrigger /> */}
        <Header />
        <h1>Aqui empezamos</h1>

        <div className="flex gap-3">
          <h2>Botones</h2>
          <Button size="sm">Primary SM</Button>
          <Button size="md">Primary MD</Button>
          <Button variant="secondary" size="sm">Secondary SM</Button>
          <Button variant="secondary" size="md">Secondary MD</Button>
          <Button variant="destructive" size="md">Error</Button>
          <Button size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="#051513"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
                d="M10 4.167v11.666M4.167 10h11.667"
              />
            </svg>
          </Button>
        </div>
      </main>
    </SidebarProvider>
  );
}
