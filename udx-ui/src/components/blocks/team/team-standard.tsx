import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter } from "lucide-react";

interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string;
    avatar: string;
    socials: {
        twitter?: string;
        linkedin?: string;
        github?: string;
    };
}

const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: "Alex Johnson",
        role: "Lead Designer",
        bio: "Passionate about creating intuitive and beautiful user experiences.",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
        socials: {
            twitter: "#",
            linkedin: "#",
            github: "#",
        },
    },
    {
        id: 2,
        name: "Sarah Williams",
        role: "Frontend Developer",
        bio: "Specializing in React and modern web technologies.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww",
        socials: {
            twitter: "#",
            linkedin: "#",
            github: "#",
        },
    },
    {
        id: 3,
        name: "Michael Chen",
        role: "Product Manager",
        bio: "Driving product strategy and roadmap execution.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww",
        socials: {
            twitter: "#",
            linkedin: "#",
        },
    },
    {
        id: 4,
        name: "Emily Davis",
        role: "Marketing Specialist",
        bio: "Connecting the product with the right audience.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
        socials: {
            twitter: "#",
            linkedin: "#",
        },
    },
];

const TeamStandard = () => {
    return (
        <section className="py-24 bg-muted/30">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Meet our talented team</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">We are a diverse group of individuals committed to building the best product for you.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member) => (
                        <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <CardHeader className="text-center pb-2">
                                <div className="mx-auto mb-4 relative">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-background shadow-sm mx-auto">
                                        <Avatar className="w-full h-full">
                                            <AvatarImage src={member.avatar} alt={member.name} className="object-cover" />
                                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                </div>
                                <CardTitle className="text-xl">{member.name}</CardTitle>
                                <CardDescription className="font-medium text-primary">{member.role}</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center pb-4">
                                <p className="text-sm text-muted-foreground line-clamp-2">{member.bio}</p>
                            </CardContent>
                            <CardFooter className="flex justify-center gap-2 pb-6 pt-0">
                                {member.socials.twitter && (
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                        <Twitter className="h-4 w-4" />
                                        <span className="sr-only">Twitter</span>
                                    </Button>
                                )}
                                {member.socials.linkedin && (
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                        <Linkedin className="h-4 w-4" />
                                        <span className="sr-only">LinkedIn</span>
                                    </Button>
                                )}
                                {member.socials.github && (
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                        <Github className="h-4 w-4" />
                                        <span className="sr-only">GitHub</span>
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { TeamStandard };
