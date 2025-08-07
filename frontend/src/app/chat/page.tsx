import ChatComponent from "@/components/chat/ChatComponent"
import { Card, CardContent } from "@/components/ui/card"

export default function Chat() {
    return (
        <Card className="w-auto max-w-2xl">
            <CardContent>
                <ChatComponent />
            </CardContent>
        </Card>
    )
}

