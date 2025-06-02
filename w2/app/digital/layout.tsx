import { AiChatPopover } from "@/components/AiChatPopover/AiChatPopover";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <AiChatPopover />
        </>
    );
}