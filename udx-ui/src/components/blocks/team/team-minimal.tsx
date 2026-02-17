import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface TeamMember {
    id: number;
    name: string;
    role: string;
    avatar: string;
}

const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: "Alex Johnson",
        role: "Lead Designer",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        id: 2,
        name: "Sarah Williams",
        role: "Frontend Developer",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww",
    },
    {
        id: 3,
        name: "Michael Chen",
        role: "Product Manager",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww",
    },
    {
        id: 4,
        name: "Emily Davis",
        role: "Marketing Specialist",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
    },
];

const TeamMinimal = () => {
    return (
        <section className="py-24 bg-background">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Team</h2>
                    <p className="mt-4 text-lg text-muted-foreground">The people behind the product.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {teamMembers.map((member) => (
                        <div key={member.id} className="flex flex-col items-center text-center space-y-4">
                            <Avatar className="w-24 h-24 border-2 border-border">
                                <AvatarImage src={member.avatar} alt={member.name} className="object-cover" />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                                <p className="text-sm text-muted-foreground">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { TeamMinimal };
