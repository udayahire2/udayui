import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UserCardProps {
    name?: string;
    role?: string;
    avatarUrl?: string;
    isOnline?: boolean;
}

export function UserCard({
    name = "John Doe",
    role = "Frontend Developer",
    avatarUrl,
    isOnline = false,
}: UserCardProps) {
    return (
        <Card className="w-[350px] overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="relative">
                    <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-900">
                        <AvatarImage src={avatarUrl} alt={name} />
                        <AvatarFallback>{name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    {isOnline && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-slate-900" />
                    )}
                </div>
                <div className="flex flex-col">
                    <CardTitle className="text-lg">{name}</CardTitle>
                    <span className="text-sm text-muted-foreground">{role}</span>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2 mb-4">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">Next.js</Badge>
                    <Badge variant="secondary">UI/UX</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                    Passionate builder creating digital experiences that matter.
                </div>
            </CardContent>
            <CardFooter className="flex justify-between bg-slate-50 dark:bg-slate-900/50 p-4">
                <Button variant="ghost" size="sm">
                    Message
                </Button>
                <Button size="sm">Follow</Button>
            </CardFooter>
        </Card>
    );
}
